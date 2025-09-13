!(function (e) {
  e.fn.glitch = function (t) {
    return this.each(function (a, s) {
      let r = e.extend(
        {
          chars: "!<>-_\\/[]{}—=+*^?#________",
          charTime: 10,
          finalText: void 0,
        },
        t,
      );
      e.Deferred(), (s = e(s)).text();
      let n = new ((function () {
        let t = {};
        function a(e, a) {
          void 0 === a && (t.chars = r.chars),
            (t.element = e),
            (t.originalText = r.finalText || e.text()),
            (t.scrambledText = (function e() {
              let a = [];
              for (var s = 0; s < t.originalText.length; s++) a.push(n());
              return a;
            })());
        }
        function n() {
          return t.chars[Math.floor(Math.random() * t.chars.length)];
        }
        function o(e, t, a) {
          return t > e.length - 1 ? e : e.substr(0, t) + a + e.substr(t + 1);
        }
        function l(a) {
          let s = e.Deferred(),
            l = Math.floor(2 * Math.random()) + r.charTime,
            i = setInterval(
              function () {
                0 === l
                  ? (clearInterval(i),
                    s.resolve(),
                    t.element.text(
                      o(t.element.text(), a, t.originalText.charAt(a)),
                    ))
                  : (t.element.text(o(t.element.text(), a, n())), l--);
              },
              Math.floor(40 * Math.random()) + 10,
            );
          return s.promise();
        }
        return (
          (a.prototype.getScrambledText = function () {
            return t.scrambledText.join("");
          }),
          (a.prototype.animate = function () {
            let t = e.Deferred(),
              a = [];
            for (var r = 0; r < s.text().length; r++) a.push(l(r));
            return (
              Promise.all(a).then(function () {
                t.resolve();
              }),
              t.promise()
            );
          }),
          a
        );
      })())(s);
      s.text(n.getScrambledText()),
        n.animate();
    });
  };
})(jQuery);
$(document).ready(function () {
  $("#header").glitch({
    chars: "!@#<>$%^&*()-_=+[]{}|;:,.<>?`~",
    charTime: 50,
    finalText: "Delirius Information",
  });
});
