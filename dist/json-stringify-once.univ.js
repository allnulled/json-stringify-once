(function(e, n) {
    if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
        module.exports = n;
    } else if (typeof define === "function" && typeof define.amd !== "undefined") {
        define([], () => n);
    } else {
        window[e] = n;
    }
})("JSONStringifyOnce", function() {
    JSON.stringifyOnce = function(e, n, t) {
        var o = [];
        var r = [];
        function f(t, f) {
            if (typeof f === "function") {
                return f + "";
            }
            if (o.length > 2e3) {
                return "object too long";
            }
            var i = false;
            o.forEach(function(e, n) {
                if (e === f) {
                    i = n;
                }
            });
            if (t == "") {
                o.push(e);
                r.push("root");
                return f;
            } else if (i + "" != "false" && typeof f == "object") {
                if (r[i] == "root") {
                    return "(pointer to root)";
                } else {
                    return "(see " + (!!f && !!f.constructor ? f.constructor.name.toLowerCase() : typeof f) + " with key " + r[i] + ")";
                }
            } else {
                var u = t || "(empty key)";
                o.push(f);
                r.push(u);
                if (n) {
                    return n(t, f);
                } else {
                    return f;
                }
            }
        }
        return JSON.stringify(e, f, t);
    };
    return JSON.stringifyOnce;
}());