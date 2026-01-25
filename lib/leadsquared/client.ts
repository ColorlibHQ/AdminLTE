/**
 * LeadSquared API Client
 *
 * Documentation: https://apidocs.leadsquared.com/
 */

interface LeadSquaredConfig {
  host: string
  accessKey: string
  secretKey: string
}

interface SearchParameter {
  Parameter: string
  Condition: 'eq' | 'gt' | 'lt' | 'ge' | 'le' | 'ne' | 'ct' | 'sw' | 'ew'
  Value: string
}

interface LeadSearchRequest {
  Parameter?: {
    LookupName: string
    LookupValue: string
    SqlOperator: string
  }
  Columns: {
    Include_CSV: string
  }
  Sorting?: {
    ColumnName: string
    Direction: '0' | '1' // 0 = ASC, 1 = DESC
  }
  Paging: {
    PageIndex: number
    PageSize: number
  }
}

interface LeadField {
  Attribute: string
  Value: string | number | boolean | null
}

export interface LeadSquaredLead {
  ProspectID: string
  FirstName?: string
  LastName?: string
  EmailAddress?: string
  Phone?: string
  mx_Campus?: string
  mx_Program?: string
  Source?: string
  SourceMedium?: string
  SourceCampaign?: string
  ProspectStage?: string
  LeadStatus?: string
  CreatedOn?: string
  ModifiedOn?: string
  [key: string]: unknown
}

export class LeadSquaredClient {
  private config: LeadSquaredConfig

  constructor(config?: Partial<LeadSquaredConfig>) {
    this.config = {
      host: config?.host || process.env.LEADSQUARED_HOST || '',
      accessKey: config?.accessKey || process.env.LEADSQUARED_ACCESS_KEY || '',
      secretKey: config?.secretKey || process.env.LEADSQUARED_SECRET_KEY || '',
    }

    if (!this.config.host || !this.config.accessKey || !this.config.secretKey) {
      throw new Error('LeadSquared API credentials not configured')
    }
  }

  private getAuthParams(): string {
    return `accessKey=${this.config.accessKey}&secretKey=${this.config.secretKey}`
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.config.host}${endpoint}${endpoint.includes('?') ? '&' : '?'}${this.getAuthParams()}`

    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`LeadSquared API error: ${response.status} - ${error}`)
    }

    return response.json()
  }

  /**
   * Get lead metadata (field definitions)
   */
  async getLeadMetadata(): Promise<unknown> {
    return this.request('/v2/LeadManagement.svc/LeadsMetaData.Get')
  }

  /**
   * Get a single lead by ID
   */
  async getLeadById(leadId: string): Promise<LeadField[]> {
    return this.request(`/v2/LeadManagement.svc/Leads.GetById?id=${leadId}`)
  }

  /**
   * Search leads by criteria with pagination
   */
  async searchLeads(
    fromDate: string,
    toDate: string,
    columns: string[],
    pageIndex: number = 1,
    pageSize: number = 100
  ): Promise<LeadSquaredLead[]> {
    const body: LeadSearchRequest = {
      Parameter: {
        LookupName: 'CreatedOn',
        LookupValue: fromDate,
        SqlOperator: '>=',
      },
      Columns: {
        Include_CSV: columns.join(','),
      },
      Sorting: {
        ColumnName: 'CreatedOn',
        Direction: '0',
      },
      Paging: {
        PageIndex: pageIndex,
        PageSize: pageSize,
      },
    }

    return this.request<LeadSquaredLead[]>(
      '/v2/LeadManagement.svc/Leads.RetrieveBySearchCriteria',
      {
        method: 'POST',
        body: JSON.stringify(body),
      }
    )
  }

  /**
   * Get leads modified after a specific date (for incremental sync)
   */
  async getLeadsModifiedAfter(
    modifiedAfter: string,
    columns: string[],
    pageIndex: number = 1,
    pageSize: number = 100
  ): Promise<LeadSquaredLead[]> {
    const body = {
      Parameter: {
        LookupName: 'ModifiedOn',
        LookupValue: modifiedAfter,
        SqlOperator: '>',
      },
      Columns: {
        Include_CSV: columns.join(','),
      },
      Sorting: {
        ColumnName: 'ModifiedOn',
        Direction: '0',
      },
      Paging: {
        PageIndex: pageIndex,
        PageSize: pageSize,
      },
    }

    return this.request<LeadSquaredLead[]>(
      '/v2/LeadManagement.svc/Leads.RetrieveBySearchCriteria',
      {
        method: 'POST',
        body: JSON.stringify(body),
      }
    )
  }

  /**
   * Get all leads in a list
   */
  async getLeadsInList(
    listId: string,
    columns: string[],
    pageIndex: number = 1,
    pageSize: number = 100
  ): Promise<LeadSquaredLead[]> {
    const body = {
      SearchParameters: {
        ListId: listId,
        RetrieveBehaviour: '0',
      },
      Columns: {
        Include_CSV: columns.join(','),
      },
      Paging: {
        PageIndex: pageIndex,
        PageSize: pageSize,
      },
    }

    return this.request<LeadSquaredLead[]>(
      '/v2/LeadManagement.svc/Leads/Retrieve/BySearchParameter',
      {
        method: 'POST',
        body: JSON.stringify(body),
      }
    )
  }

  /**
   * Get all lists
   */
  async getAllLists(): Promise<unknown> {
    return this.request('/v2/LeadManagement.svc/Lists.Get')
  }

  /**
   * Fetch all leads with pagination (iterates through all pages)
   */
  async fetchAllLeads(
    fromDate: string,
    toDate: string,
    columns: string[],
    onProgress?: (fetched: number, total: number) => void
  ): Promise<LeadSquaredLead[]> {
    const allLeads: LeadSquaredLead[] = []
    let pageIndex = 1
    const pageSize = 500
    let hasMore = true

    while (hasMore) {
      const leads = await this.searchLeads(
        fromDate,
        toDate,
        columns,
        pageIndex,
        pageSize
      )

      if (leads.length === 0) {
        hasMore = false
      } else {
        allLeads.push(...leads)
        pageIndex++

        if (onProgress) {
          onProgress(allLeads.length, -1) // -1 means unknown total
        }

        // Safety limit to prevent infinite loops
        if (pageIndex > 1000) {
          console.warn('Reached page limit, stopping fetch')
          hasMore = false
        }

        // Rate limiting - wait 100ms between requests
        await new Promise((resolve) => setTimeout(resolve, 100))
      }
    }

    return allLeads
  }
}

// Default columns to fetch from LeadSquared
export const DEFAULT_LEAD_COLUMNS = [
  'ProspectID',
  'FirstName',
  'LastName',
  'EmailAddress',
  'Phone',
  'mx_Campus',
  'mx_Program',
  'Source',
  'SourceMedium',
  'SourceCampaign',
  'ProspectStage',
  'LeadStatus',
  'CreatedOn',
  'ModifiedOn',
  'mx_Enrollment_Date',
  'mx_Revenue',
]
