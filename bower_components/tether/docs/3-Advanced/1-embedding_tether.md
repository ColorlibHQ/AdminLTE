## Embedding Tether

Tether is designed to be embeddable in other libraries.

There is one thing you should think about doing to create an embedded Tether:

- Set the `classPrefix` of the tethers you create.  That prefix will replace `'tether'` in
all of the classes.  You can also disable classes you don't intend on using with the `classes`
option.
