(function(){
    //we want this at global scope so outside callers can find it. In a more realistic implementation we
    //should probably put it in a namespace.
    window.getCoverageByLine = function(silent) {
        var key = null;
        var lines = null;
        var source = null;
        //look for code coverage data
        if (typeof window._$jscoverage === 'object') {
            for (key in _$jscoverage) {}
            lines = _$jscoverage[key];
        }

        if (!lines && !silent) {
           console.log('code coverage data is NOT available');
        }

        return { 'key': key, 'lines': lines };
    };

    QUnit.done = function(t) {
        var cvgInfo = getCoverageByLine(true);
        if (!!cvgInfo.key) {
            var testableLines = 0;
            var testedLines = 0;
            var untestableLines = 0;
            for (lineIdx in cvgInfo.lines) {
                var cvg = cvgInfo.lines[lineIdx];
                if (typeof cvg === 'number') {
                    testableLines += 1;
                    if (cvg > 0) {
                        testedLines += 1;
                    }
                } else {
                    untestableLines += 1;
                }
            }
            var coverage = '' + Math.floor(100 * testedLines / testableLines) + '%';

            var result = document.getElementById('qunit-testresult');
            if (result != null) {
                result.innerHTML = result.innerHTML + ' ' + coverage + ' test coverage of ' + cvgInfo.key;
            } else {
                console.log('can\'t find test-result element to update');
            }
        }
    };
}());