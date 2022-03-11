"use strict";
(self.webpackChunkfrontend = self.webpackChunkfrontend || []).push([
  [179],
  {
    687: () => {
      function ce(t) {
        return "function" == typeof t;
      }
      function Gi(t) {
        const n = t((r) => {
          Error.call(r), (r.stack = new Error().stack);
        });
        return (
          (n.prototype = Object.create(Error.prototype)),
          (n.prototype.constructor = n),
          n
        );
      }
      const ho = Gi(
        (t) =>
          function (n) {
            t(this),
              (this.message = n
                ? `${n.length} errors occurred during unsubscription:\n${n
                    .map((r, i) => `${i + 1}) ${r.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = n);
          }
      );
      function qi(t, e) {
        if (t) {
          const n = t.indexOf(e);
          0 <= n && t.splice(n, 1);
        }
      }
      class Mt {
        constructor(e) {
          (this.initialTeardown = e),
            (this.closed = !1),
            (this._parentage = null),
            (this._teardowns = null);
        }
        unsubscribe() {
          let e;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: n } = this;
            if (n)
              if (((this._parentage = null), Array.isArray(n)))
                for (const s of n) s.remove(this);
              else n.remove(this);
            const { initialTeardown: r } = this;
            if (ce(r))
              try {
                r();
              } catch (s) {
                e = s instanceof ho ? s.errors : [s];
              }
            const { _teardowns: i } = this;
            if (i) {
              this._teardowns = null;
              for (const s of i)
                try {
                  hh(s);
                } catch (o) {
                  (e = null != e ? e : []),
                    o instanceof ho ? (e = [...e, ...o.errors]) : e.push(o);
                }
            }
            if (e) throw new ho(e);
          }
        }
        add(e) {
          var n;
          if (e && e !== this)
            if (this.closed) hh(e);
            else {
              if (e instanceof Mt) {
                if (e.closed || e._hasParent(this)) return;
                e._addParent(this);
              }
              (this._teardowns =
                null !== (n = this._teardowns) && void 0 !== n ? n : []).push(
                e
              );
            }
        }
        _hasParent(e) {
          const { _parentage: n } = this;
          return n === e || (Array.isArray(n) && n.includes(e));
        }
        _addParent(e) {
          const { _parentage: n } = this;
          this._parentage = Array.isArray(n) ? (n.push(e), n) : n ? [n, e] : e;
        }
        _removeParent(e) {
          const { _parentage: n } = this;
          n === e ? (this._parentage = null) : Array.isArray(n) && qi(n, e);
        }
        remove(e) {
          const { _teardowns: n } = this;
          n && qi(n, e), e instanceof Mt && e._removeParent(this);
        }
      }
      Mt.EMPTY = (() => {
        const t = new Mt();
        return (t.closed = !0), t;
      })();
      const dh = Mt.EMPTY;
      function fh(t) {
        return (
          t instanceof Mt ||
          (t && "closed" in t && ce(t.remove) && ce(t.add) && ce(t.unsubscribe))
        );
      }
      function hh(t) {
        ce(t) ? t() : t.unsubscribe();
      }
      const cr = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        po = {
          setTimeout(...t) {
            const { delegate: e } = po;
            return ((null == e ? void 0 : e.setTimeout) || setTimeout)(...t);
          },
          clearTimeout(t) {
            const { delegate: e } = po;
            return ((null == e ? void 0 : e.clearTimeout) || clearTimeout)(t);
          },
          delegate: void 0,
        };
      function ph(t) {
        po.setTimeout(() => {
          const { onUnhandledError: e } = cr;
          if (!e) throw t;
          e(t);
        });
      }
      function gh() {}
      const JE = Ol("C", void 0, void 0);
      function Ol(t, e, n) {
        return { kind: t, value: e, error: n };
      }
      let dr = null;
      function go(t) {
        if (cr.useDeprecatedSynchronousErrorHandling) {
          const e = !dr;
          if ((e && (dr = { errorThrown: !1, error: null }), t(), e)) {
            const { errorThrown: n, error: r } = dr;
            if (((dr = null), n)) throw r;
          }
        } else t();
      }
      class kl extends Mt {
        constructor(e) {
          super(),
            (this.isStopped = !1),
            e
              ? ((this.destination = e), fh(e) && e.add(this))
              : (this.destination = sw);
        }
        static create(e, n, r) {
          return new mo(e, n, r);
        }
        next(e) {
          this.isStopped
            ? Ll(
                (function ew(t) {
                  return Ol("N", t, void 0);
                })(e),
                this
              )
            : this._next(e);
        }
        error(e) {
          this.isStopped
            ? Ll(
                (function XE(t) {
                  return Ol("E", void 0, t);
                })(e),
                this
              )
            : ((this.isStopped = !0), this._error(e));
        }
        complete() {
          this.isStopped
            ? Ll(JE, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(e) {
          this.destination.next(e);
        }
        _error(e) {
          try {
            this.destination.error(e);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const nw = Function.prototype.bind;
      function Vl(t, e) {
        return nw.call(t, e);
      }
      class rw {
        constructor(e) {
          this.partialObserver = e;
        }
        next(e) {
          const { partialObserver: n } = this;
          if (n.next)
            try {
              n.next(e);
            } catch (r) {
              yo(r);
            }
        }
        error(e) {
          const { partialObserver: n } = this;
          if (n.error)
            try {
              n.error(e);
            } catch (r) {
              yo(r);
            }
          else yo(e);
        }
        complete() {
          const { partialObserver: e } = this;
          if (e.complete)
            try {
              e.complete();
            } catch (n) {
              yo(n);
            }
        }
      }
      class mo extends kl {
        constructor(e, n, r) {
          let i;
          if ((super(), ce(e) || !e))
            i = {
              next: null != e ? e : void 0,
              error: null != n ? n : void 0,
              complete: null != r ? r : void 0,
            };
          else {
            let s;
            this && cr.useDeprecatedNextContext
              ? ((s = Object.create(e)),
                (s.unsubscribe = () => this.unsubscribe()),
                (i = {
                  next: e.next && Vl(e.next, s),
                  error: e.error && Vl(e.error, s),
                  complete: e.complete && Vl(e.complete, s),
                }))
              : (i = e);
          }
          this.destination = new rw(i);
        }
      }
      function yo(t) {
        cr.useDeprecatedSynchronousErrorHandling
          ? (function tw(t) {
              cr.useDeprecatedSynchronousErrorHandling &&
                dr &&
                ((dr.errorThrown = !0), (dr.error = t));
            })(t)
          : ph(t);
      }
      function Ll(t, e) {
        const { onStoppedNotification: n } = cr;
        n && po.setTimeout(() => n(t, e));
      }
      const sw = {
          closed: !0,
          next: gh,
          error: function iw(t) {
            throw t;
          },
          complete: gh,
        },
        Bl =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function fr(t) {
        return t;
      }
      let ge = (() => {
        class t {
          constructor(n) {
            n && (this._subscribe = n);
          }
          lift(n) {
            const r = new t();
            return (r.source = this), (r.operator = n), r;
          }
          subscribe(n, r, i) {
            const s = (function aw(t) {
              return (
                (t && t instanceof kl) ||
                ((function ow(t) {
                  return t && ce(t.next) && ce(t.error) && ce(t.complete);
                })(t) &&
                  fh(t))
              );
            })(n)
              ? n
              : new mo(n, r, i);
            return (
              go(() => {
                const { operator: o, source: a } = this;
                s.add(
                  o
                    ? o.call(s, a)
                    : a
                    ? this._subscribe(s)
                    : this._trySubscribe(s)
                );
              }),
              s
            );
          }
          _trySubscribe(n) {
            try {
              return this._subscribe(n);
            } catch (r) {
              n.error(r);
            }
          }
          forEach(n, r) {
            return new (r = yh(r))((i, s) => {
              const o = new mo({
                next: (a) => {
                  try {
                    n(a);
                  } catch (l) {
                    s(l), o.unsubscribe();
                  }
                },
                error: s,
                complete: i,
              });
              this.subscribe(o);
            });
          }
          _subscribe(n) {
            var r;
            return null === (r = this.source) || void 0 === r
              ? void 0
              : r.subscribe(n);
          }
          [Bl]() {
            return this;
          }
          pipe(...n) {
            return (function mh(t) {
              return 0 === t.length
                ? fr
                : 1 === t.length
                ? t[0]
                : function (n) {
                    return t.reduce((r, i) => i(r), n);
                  };
            })(n)(this);
          }
          toPromise(n) {
            return new (n = yh(n))((r, i) => {
              let s;
              this.subscribe(
                (o) => (s = o),
                (o) => i(o),
                () => r(s)
              );
            });
          }
        }
        return (t.create = (e) => new t(e)), t;
      })();
      function yh(t) {
        var e;
        return null !== (e = null != t ? t : cr.Promise) && void 0 !== e
          ? e
          : Promise;
      }
      const lw = Gi(
        (t) =>
          function () {
            t(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          }
      );
      let on = (() => {
        class t extends ge {
          constructor() {
            super(),
              (this.closed = !1),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(n) {
            const r = new _h(this, this);
            return (r.operator = n), r;
          }
          _throwIfClosed() {
            if (this.closed) throw new lw();
          }
          next(n) {
            go(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                const r = this.observers.slice();
                for (const i of r) i.next(n);
              }
            });
          }
          error(n) {
            go(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = n);
                const { observers: r } = this;
                for (; r.length; ) r.shift().error(n);
              }
            });
          }
          complete() {
            go(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: n } = this;
                for (; n.length; ) n.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0), (this.observers = null);
          }
          get observed() {
            var n;
            return (
              (null === (n = this.observers) || void 0 === n
                ? void 0
                : n.length) > 0
            );
          }
          _trySubscribe(n) {
            return this._throwIfClosed(), super._trySubscribe(n);
          }
          _subscribe(n) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(n),
              this._innerSubscribe(n)
            );
          }
          _innerSubscribe(n) {
            const { hasError: r, isStopped: i, observers: s } = this;
            return r || i ? dh : (s.push(n), new Mt(() => qi(s, n)));
          }
          _checkFinalizedStatuses(n) {
            const { hasError: r, thrownError: i, isStopped: s } = this;
            r ? n.error(i) : s && n.complete();
          }
          asObservable() {
            const n = new ge();
            return (n.source = this), n;
          }
        }
        return (t.create = (e, n) => new _h(e, n)), t;
      })();
      class _h extends on {
        constructor(e, n) {
          super(), (this.destination = e), (this.source = n);
        }
        next(e) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.next) ||
            void 0 === r ||
            r.call(n, e);
        }
        error(e) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.error) ||
            void 0 === r ||
            r.call(n, e);
        }
        complete() {
          var e, n;
          null ===
            (n =
              null === (e = this.destination) || void 0 === e
                ? void 0
                : e.complete) ||
            void 0 === n ||
            n.call(e);
        }
        _subscribe(e) {
          var n, r;
          return null !==
            (r =
              null === (n = this.source) || void 0 === n
                ? void 0
                : n.subscribe(e)) && void 0 !== r
            ? r
            : dh;
        }
      }
      function vh(t) {
        return ce(null == t ? void 0 : t.lift);
      }
      function He(t) {
        return (e) => {
          if (vh(e))
            return e.lift(function (n) {
              try {
                return t(n, this);
              } catch (r) {
                this.error(r);
              }
            });
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
      function Ve(t, e, n, r, i) {
        return new uw(t, e, n, r, i);
      }
      class uw extends kl {
        constructor(e, n, r, i, s, o) {
          super(e),
            (this.onFinalize = s),
            (this.shouldUnsubscribe = o),
            (this._next = n
              ? function (a) {
                  try {
                    n(a);
                  } catch (l) {
                    e.error(l);
                  }
                }
              : super._next),
            (this._error = i
              ? function (a) {
                  try {
                    i(a);
                  } catch (l) {
                    e.error(l);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = r
              ? function () {
                  try {
                    r();
                  } catch (a) {
                    e.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var e;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: n } = this;
            super.unsubscribe(),
              !n &&
                (null === (e = this.onFinalize) ||
                  void 0 === e ||
                  e.call(this));
          }
        }
      }
      function oe(t, e) {
        return He((n, r) => {
          let i = 0;
          n.subscribe(
            Ve(r, (s) => {
              r.next(t.call(e, s, i++));
            })
          );
        });
      }
      function hr(t) {
        return this instanceof hr ? ((this.v = t), this) : new hr(t);
      }
      function fw(t, e, n) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var i,
          r = n.apply(t, e || []),
          s = [];
        return (
          (i = {}),
          o("next"),
          o("throw"),
          o("return"),
          (i[Symbol.asyncIterator] = function () {
            return this;
          }),
          i
        );
        function o(f) {
          r[f] &&
            (i[f] = function (h) {
              return new Promise(function (p, g) {
                s.push([f, h, p, g]) > 1 || a(f, h);
              });
            });
        }
        function a(f, h) {
          try {
            !(function l(f) {
              f.value instanceof hr
                ? Promise.resolve(f.value.v).then(u, c)
                : d(s[0][2], f);
            })(r[f](h));
          } catch (p) {
            d(s[0][3], p);
          }
        }
        function u(f) {
          a("next", f);
        }
        function c(f) {
          a("throw", f);
        }
        function d(f, h) {
          f(h), s.shift(), s.length && a(s[0][0], s[0][1]);
        }
      }
      function hw(t) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var n,
          e = t[Symbol.asyncIterator];
        return e
          ? e.call(t)
          : ((t = (function Eh(t) {
              var e = "function" == typeof Symbol && Symbol.iterator,
                n = e && t[e],
                r = 0;
              if (n) return n.call(t);
              if (t && "number" == typeof t.length)
                return {
                  next: function () {
                    return (
                      t && r >= t.length && (t = void 0),
                      { value: t && t[r++], done: !t }
                    );
                  },
                };
              throw new TypeError(
                e
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            })(t)),
            (n = {}),
            r("next"),
            r("throw"),
            r("return"),
            (n[Symbol.asyncIterator] = function () {
              return this;
            }),
            n);
        function r(s) {
          n[s] =
            t[s] &&
            function (o) {
              return new Promise(function (a, l) {
                !(function i(s, o, a, l) {
                  Promise.resolve(l).then(function (u) {
                    s({ value: u, done: a });
                  }, o);
                })(a, l, (o = t[s](o)).done, o.value);
              });
            };
        }
      }
      const wh = (t) =>
        t && "number" == typeof t.length && "function" != typeof t;
      function bh(t) {
        return ce(null == t ? void 0 : t.then);
      }
      function Sh(t) {
        return ce(t[Bl]);
      }
      function Ah(t) {
        return (
          Symbol.asyncIterator &&
          ce(null == t ? void 0 : t[Symbol.asyncIterator])
        );
      }
      function Mh(t) {
        return new TypeError(
          `You provided ${
            null !== t && "object" == typeof t ? "an invalid object" : `'${t}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const Th = (function gw() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      })();
      function Ih(t) {
        return ce(null == t ? void 0 : t[Th]);
      }
      function Nh(t) {
        return fw(this, arguments, function* () {
          const n = t.getReader();
          try {
            for (;;) {
              const { value: r, done: i } = yield hr(n.read());
              if (i) return yield hr(void 0);
              yield yield hr(r);
            }
          } finally {
            n.releaseLock();
          }
        });
      }
      function xh(t) {
        return ce(null == t ? void 0 : t.getReader);
      }
      function an(t) {
        if (t instanceof ge) return t;
        if (null != t) {
          if (Sh(t))
            return (function mw(t) {
              return new ge((e) => {
                const n = t[Bl]();
                if (ce(n.subscribe)) return n.subscribe(e);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              });
            })(t);
          if (wh(t))
            return (function yw(t) {
              return new ge((e) => {
                for (let n = 0; n < t.length && !e.closed; n++) e.next(t[n]);
                e.complete();
              });
            })(t);
          if (bh(t))
            return (function _w(t) {
              return new ge((e) => {
                t.then(
                  (n) => {
                    e.closed || (e.next(n), e.complete());
                  },
                  (n) => e.error(n)
                ).then(null, ph);
              });
            })(t);
          if (Ah(t)) return Fh(t);
          if (Ih(t))
            return (function vw(t) {
              return new ge((e) => {
                for (const n of t) if ((e.next(n), e.closed)) return;
                e.complete();
              });
            })(t);
          if (xh(t))
            return (function Dw(t) {
              return Fh(Nh(t));
            })(t);
        }
        throw Mh(t);
      }
      function Fh(t) {
        return new ge((e) => {
          (function Cw(t, e) {
            var n, r, i, s;
            return (function cw(t, e, n, r) {
              return new (n || (n = Promise))(function (s, o) {
                function a(c) {
                  try {
                    u(r.next(c));
                  } catch (d) {
                    o(d);
                  }
                }
                function l(c) {
                  try {
                    u(r.throw(c));
                  } catch (d) {
                    o(d);
                  }
                }
                function u(c) {
                  c.done
                    ? s(c.value)
                    : (function i(s) {
                        return s instanceof n
                          ? s
                          : new n(function (o) {
                              o(s);
                            });
                      })(c.value).then(a, l);
                }
                u((r = r.apply(t, e || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (n = hw(t); !(r = yield n.next()).done; )
                  if ((e.next(r.value), e.closed)) return;
              } catch (o) {
                i = { error: o };
              } finally {
                try {
                  r && !r.done && (s = n.return) && (yield s.call(n));
                } finally {
                  if (i) throw i.error;
                }
              }
              e.complete();
            });
          })(t, e).catch((n) => e.error(n));
        });
      }
      function Sn(t, e, n, r = 0, i = !1) {
        const s = e.schedule(function () {
          n(), i ? t.add(this.schedule(null, r)) : this.unsubscribe();
        }, r);
        if ((t.add(s), !i)) return s;
      }
      function Le(t, e, n = 1 / 0) {
        return ce(e)
          ? Le((r, i) => oe((s, o) => e(r, s, i, o))(an(t(r, i))), n)
          : ("number" == typeof e && (n = e),
            He((r, i) =>
              (function Ew(t, e, n, r, i, s, o, a) {
                const l = [];
                let u = 0,
                  c = 0,
                  d = !1;
                const f = () => {
                    d && !l.length && !u && e.complete();
                  },
                  h = (g) => (u < r ? p(g) : l.push(g)),
                  p = (g) => {
                    s && e.next(g), u++;
                    let y = !1;
                    an(n(g, c++)).subscribe(
                      Ve(
                        e,
                        (_) => {
                          null == i || i(_), s ? h(_) : e.next(_);
                        },
                        () => {
                          y = !0;
                        },
                        void 0,
                        () => {
                          if (y)
                            try {
                              for (u--; l.length && u < r; ) {
                                const _ = l.shift();
                                o ? Sn(e, o, () => p(_)) : p(_);
                              }
                              f();
                            } catch (_) {
                              e.error(_);
                            }
                        }
                      )
                    );
                  };
                return (
                  t.subscribe(
                    Ve(e, h, () => {
                      (d = !0), f();
                    })
                  ),
                  () => {
                    null == a || a();
                  }
                );
              })(r, i, t, n)
            ));
      }
      function zi(t = 1 / 0) {
        return Le(fr, t);
      }
      const An = new ge((t) => t.complete());
      function Ul(t) {
        return t[t.length - 1];
      }
      function Ph(t) {
        return ce(Ul(t)) ? t.pop() : void 0;
      }
      function Wi(t) {
        return (function bw(t) {
          return t && ce(t.schedule);
        })(Ul(t))
          ? t.pop()
          : void 0;
      }
      function Rh(t, e = 0) {
        return He((n, r) => {
          n.subscribe(
            Ve(
              r,
              (i) => Sn(r, t, () => r.next(i), e),
              () => Sn(r, t, () => r.complete(), e),
              (i) => Sn(r, t, () => r.error(i), e)
            )
          );
        });
      }
      function Oh(t, e = 0) {
        return He((n, r) => {
          r.add(t.schedule(() => n.subscribe(r), e));
        });
      }
      function kh(t, e) {
        if (!t) throw new Error("Iterable cannot be null");
        return new ge((n) => {
          Sn(n, e, () => {
            const r = t[Symbol.asyncIterator]();
            Sn(
              n,
              e,
              () => {
                r.next().then((i) => {
                  i.done ? n.complete() : n.next(i.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function Be(t, e) {
        return e
          ? (function xw(t, e) {
              if (null != t) {
                if (Sh(t))
                  return (function Aw(t, e) {
                    return an(t).pipe(Oh(e), Rh(e));
                  })(t, e);
                if (wh(t))
                  return (function Tw(t, e) {
                    return new ge((n) => {
                      let r = 0;
                      return e.schedule(function () {
                        r === t.length
                          ? n.complete()
                          : (n.next(t[r++]), n.closed || this.schedule());
                      });
                    });
                  })(t, e);
                if (bh(t))
                  return (function Mw(t, e) {
                    return an(t).pipe(Oh(e), Rh(e));
                  })(t, e);
                if (Ah(t)) return kh(t, e);
                if (Ih(t))
                  return (function Iw(t, e) {
                    return new ge((n) => {
                      let r;
                      return (
                        Sn(n, e, () => {
                          (r = t[Th]()),
                            Sn(
                              n,
                              e,
                              () => {
                                let i, s;
                                try {
                                  ({ value: i, done: s } = r.next());
                                } catch (o) {
                                  return void n.error(o);
                                }
                                s ? n.complete() : n.next(i);
                              },
                              0,
                              !0
                            );
                        }),
                        () => ce(null == r ? void 0 : r.return) && r.return()
                      );
                    });
                  })(t, e);
                if (xh(t))
                  return (function Nw(t, e) {
                    return kh(Nh(t), e);
                  })(t, e);
              }
              throw Mh(t);
            })(t, e)
          : an(t);
      }
      function _o(t) {
        return t <= 0
          ? () => An
          : He((e, n) => {
              let r = 0;
              e.subscribe(
                Ve(n, (i) => {
                  ++r <= t && (n.next(i), t <= r && n.complete());
                })
              );
            });
      }
      function Hl(t, e, ...n) {
        return !0 === e
          ? (t(), null)
          : !1 === e
          ? null
          : e(...n)
              .pipe(_o(1))
              .subscribe(() => t());
      }
      function ie(t) {
        for (let e in t) if (t[e] === ie) return e;
        throw Error("Could not find renamed property on target object.");
      }
      function $l(t, e) {
        for (const n in e)
          e.hasOwnProperty(n) && !t.hasOwnProperty(n) && (t[n] = e[n]);
      }
      function te(t) {
        if ("string" == typeof t) return t;
        if (Array.isArray(t)) return "[" + t.map(te).join(", ") + "]";
        if (null == t) return "" + t;
        if (t.overriddenName) return `${t.overriddenName}`;
        if (t.name) return `${t.name}`;
        const e = t.toString();
        if (null == e) return "" + e;
        const n = e.indexOf("\n");
        return -1 === n ? e : e.substring(0, n);
      }
      function Gl(t, e) {
        return null == t || "" === t
          ? null === e
            ? ""
            : e
          : null == e || "" === e
          ? t
          : t + " " + e;
      }
      const Rw = ie({ __forward_ref__: ie });
      function ae(t) {
        return (
          (t.__forward_ref__ = ae),
          (t.toString = function () {
            return te(this());
          }),
          t
        );
      }
      function j(t) {
        return Vh(t) ? t() : t;
      }
      function Vh(t) {
        return (
          "function" == typeof t &&
          t.hasOwnProperty(Rw) &&
          t.__forward_ref__ === ae
        );
      }
      class b extends Error {
        constructor(e, n) {
          super(
            (function ql(t, e) {
              return `NG0${Math.abs(t)}${e ? ": " + e : ""}`;
            })(e, n)
          ),
            (this.code = e);
        }
      }
      function k(t) {
        return "string" == typeof t ? t : null == t ? "" : String(t);
      }
      function Ye(t) {
        return "function" == typeof t
          ? t.name || t.toString()
          : "object" == typeof t && null != t && "function" == typeof t.type
          ? t.type.name || t.type.toString()
          : k(t);
      }
      function vo(t, e) {
        const n = e ? ` in ${e}` : "";
        throw new b(-201, `No provider for ${Ye(t)} found${n}`);
      }
      function dt(t, e) {
        null == t &&
          (function de(t, e, n, r) {
            throw new Error(
              `ASSERTION ERROR: ${t}` +
                (null == r ? "" : ` [Expected=> ${n} ${r} ${e} <=Actual]`)
            );
          })(e, t, null, "!=");
      }
      function G(t) {
        return {
          token: t.token,
          providedIn: t.providedIn || null,
          factory: t.factory,
          value: void 0,
        };
      }
      function Tt(t) {
        return { providers: t.providers || [], imports: t.imports || [] };
      }
      function zl(t) {
        return Lh(t, Do) || Lh(t, jh);
      }
      function Lh(t, e) {
        return t.hasOwnProperty(e) ? t[e] : null;
      }
      function Bh(t) {
        return t && (t.hasOwnProperty(Wl) || t.hasOwnProperty(Uw))
          ? t[Wl]
          : null;
      }
      const Do = ie({ ɵprov: ie }),
        Wl = ie({ ɵinj: ie }),
        jh = ie({ ngInjectableDef: ie }),
        Uw = ie({ ngInjectorDef: ie });
      var L = (() => (
        ((L = L || {})[(L.Default = 0)] = "Default"),
        (L[(L.Host = 1)] = "Host"),
        (L[(L.Self = 2)] = "Self"),
        (L[(L.SkipSelf = 4)] = "SkipSelf"),
        (L[(L.Optional = 8)] = "Optional"),
        L
      ))();
      let Ql;
      function Gn(t) {
        const e = Ql;
        return (Ql = t), e;
      }
      function Uh(t, e, n) {
        const r = zl(t);
        return r && "root" == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & L.Optional
          ? null
          : void 0 !== e
          ? e
          : void vo(te(t), "Injector");
      }
      function qn(t) {
        return { toString: t }.toString();
      }
      var Ht = (() => (
          ((Ht = Ht || {})[(Ht.OnPush = 0)] = "OnPush"),
          (Ht[(Ht.Default = 1)] = "Default"),
          Ht
        ))(),
        $t = (() => {
          return (
            ((t = $t || ($t = {}))[(t.Emulated = 0)] = "Emulated"),
            (t[(t.None = 2)] = "None"),
            (t[(t.ShadowDom = 3)] = "ShadowDom"),
            $t
          );
          var t;
        })();
      const $w = "undefined" != typeof globalThis && globalThis,
        Gw = "undefined" != typeof window && window,
        qw =
          "undefined" != typeof self &&
          "undefined" != typeof WorkerGlobalScope &&
          self instanceof WorkerGlobalScope &&
          self,
        re = $w || ("undefined" != typeof global && global) || Gw || qw,
        jr = {},
        se = [],
        Co = ie({ ɵcmp: ie }),
        Kl = ie({ ɵdir: ie }),
        Zl = ie({ ɵpipe: ie }),
        Hh = ie({ ɵmod: ie }),
        Tn = ie({ ɵfac: ie }),
        Qi = ie({ __NG_ELEMENT_ID__: ie });
      let zw = 0;
      function It(t) {
        return qn(() => {
          const n = {},
            r = {
              type: t.type,
              providersResolver: null,
              decls: t.decls,
              vars: t.vars,
              factory: null,
              template: t.template || null,
              consts: t.consts || null,
              ngContentSelectors: t.ngContentSelectors,
              hostBindings: t.hostBindings || null,
              hostVars: t.hostVars || 0,
              hostAttrs: t.hostAttrs || null,
              contentQueries: t.contentQueries || null,
              declaredInputs: n,
              inputs: null,
              outputs: null,
              exportAs: t.exportAs || null,
              onPush: t.changeDetection === Ht.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              selectors: t.selectors || se,
              viewQuery: t.viewQuery || null,
              features: t.features || null,
              data: t.data || {},
              encapsulation: t.encapsulation || $t.Emulated,
              id: "c",
              styles: t.styles || se,
              _: null,
              setInput: null,
              schemas: t.schemas || null,
              tView: null,
            },
            i = t.directives,
            s = t.features,
            o = t.pipes;
          return (
            (r.id += zw++),
            (r.inputs = zh(t.inputs, n)),
            (r.outputs = zh(t.outputs)),
            s && s.forEach((a) => a(r)),
            (r.directiveDefs = i
              ? () => ("function" == typeof i ? i() : i).map($h)
              : null),
            (r.pipeDefs = o
              ? () => ("function" == typeof o ? o() : o).map(Gh)
              : null),
            r
          );
        });
      }
      function $h(t) {
        return (
          Ge(t) ||
          (function zn(t) {
            return t[Kl] || null;
          })(t)
        );
      }
      function Gh(t) {
        return (function pr(t) {
          return t[Zl] || null;
        })(t);
      }
      const qh = {};
      function Gt(t) {
        return qn(() => {
          const e = {
            type: t.type,
            bootstrap: t.bootstrap || se,
            declarations: t.declarations || se,
            imports: t.imports || se,
            exports: t.exports || se,
            transitiveCompileScopes: null,
            schemas: t.schemas || null,
            id: t.id || null,
          };
          return null != t.id && (qh[t.id] = t.type), e;
        });
      }
      function zh(t, e) {
        if (null == t) return jr;
        const n = {};
        for (const r in t)
          if (t.hasOwnProperty(r)) {
            let i = t[r],
              s = i;
            Array.isArray(i) && ((s = i[1]), (i = i[0])),
              (n[i] = r),
              e && (e[i] = s);
          }
        return n;
      }
      const P = It;
      function st(t) {
        return {
          type: t.type,
          name: t.name,
          factory: null,
          pure: !1 !== t.pure,
          onDestroy: t.type.prototype.ngOnDestroy || null,
        };
      }
      function Ge(t) {
        return t[Co] || null;
      }
      function Nt(t, e) {
        const n = t[Hh] || null;
        if (!n && !0 === e)
          throw new Error(`Type ${te(t)} does not have '\u0275mod' property.`);
        return n;
      }
      const U = 11;
      function ln(t) {
        return Array.isArray(t) && "object" == typeof t[1];
      }
      function zt(t) {
        return Array.isArray(t) && !0 === t[1];
      }
      function Xl(t) {
        return 0 != (8 & t.flags);
      }
      function So(t) {
        return 2 == (2 & t.flags);
      }
      function Ao(t) {
        return 1 == (1 & t.flags);
      }
      function Wt(t) {
        return null !== t.template;
      }
      function Jw(t) {
        return 0 != (512 & t[2]);
      }
      function _r(t, e) {
        return t.hasOwnProperty(Tn) ? t[Tn] : null;
      }
      class tb {
        constructor(e, n, r) {
          (this.previousValue = e),
            (this.currentValue = n),
            (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function Ft() {
        return Qh;
      }
      function Qh(t) {
        return t.type.prototype.ngOnChanges && (t.setInput = rb), nb;
      }
      function nb() {
        const t = Zh(this),
          e = null == t ? void 0 : t.current;
        if (e) {
          const n = t.previous;
          if (n === jr) t.previous = e;
          else for (let r in e) n[r] = e[r];
          (t.current = null), this.ngOnChanges(e);
        }
      }
      function rb(t, e, n, r) {
        const i =
            Zh(t) ||
            (function ib(t, e) {
              return (t[Kh] = e);
            })(t, { previous: jr, current: null }),
          s = i.current || (i.current = {}),
          o = i.previous,
          a = this.declaredInputs[n],
          l = o[a];
        (s[a] = new tb(l && l.currentValue, e, o === jr)), (t[r] = e);
      }
      Ft.ngInherit = !0;
      const Kh = "__ngSimpleChanges__";
      function Zh(t) {
        return t[Kh] || null;
      }
      let iu;
      function ve(t) {
        return !!t.listen;
      }
      const Yh = {
        createRenderer: (t, e) =>
          (function su() {
            return void 0 !== iu
              ? iu
              : "undefined" != typeof document
              ? document
              : void 0;
          })(),
      };
      function Te(t) {
        for (; Array.isArray(t); ) t = t[0];
        return t;
      }
      function Mo(t, e) {
        return Te(e[t]);
      }
      function Rt(t, e) {
        return Te(e[t.index]);
      }
      function ou(t, e) {
        return t.data[e];
      }
      function qr(t, e) {
        return t[e];
      }
      function ht(t, e) {
        const n = e[t];
        return ln(n) ? n : n[0];
      }
      function au(t) {
        return 128 == (128 & t[2]);
      }
      function Wn(t, e) {
        return null == e ? null : t[e];
      }
      function Xh(t) {
        t[18] = 0;
      }
      function lu(t, e) {
        t[5] += e;
        let n = t,
          r = t[3];
        for (
          ;
          null !== r && ((1 === e && 1 === n[5]) || (-1 === e && 0 === n[5]));

        )
          (r[5] += e), (n = r), (r = r[3]);
      }
      const O = {
        lFrame: ap(null),
        bindingsEnabled: !0,
        isInCheckNoChangesMode: !1,
      };
      function ep() {
        return O.bindingsEnabled;
      }
      function v() {
        return O.lFrame.lView;
      }
      function J() {
        return O.lFrame.tView;
      }
      function In(t) {
        return (O.lFrame.contextLView = t), t[8];
      }
      function Pe() {
        let t = tp();
        for (; null !== t && 64 === t.type; ) t = t.parent;
        return t;
      }
      function tp() {
        return O.lFrame.currentTNode;
      }
      function un(t, e) {
        const n = O.lFrame;
        (n.currentTNode = t), (n.isParent = e);
      }
      function uu() {
        return O.lFrame.isParent;
      }
      function To() {
        return O.isInCheckNoChangesMode;
      }
      function Io(t) {
        O.isInCheckNoChangesMode = t;
      }
      function Je() {
        const t = O.lFrame;
        let e = t.bindingRootIndex;
        return (
          -1 === e && (e = t.bindingRootIndex = t.tView.bindingStartIndex), e
        );
      }
      function zr() {
        return O.lFrame.bindingIndex++;
      }
      function xn(t) {
        const e = O.lFrame,
          n = e.bindingIndex;
        return (e.bindingIndex = e.bindingIndex + t), n;
      }
      function Cb(t, e) {
        const n = O.lFrame;
        (n.bindingIndex = n.bindingRootIndex = t), du(e);
      }
      function du(t) {
        O.lFrame.currentDirectiveIndex = t;
      }
      function hu(t) {
        O.lFrame.currentQueryIndex = t;
      }
      function wb(t) {
        const e = t[1];
        return 2 === e.type ? e.declTNode : 1 === e.type ? t[6] : null;
      }
      function sp(t, e, n) {
        if (n & L.SkipSelf) {
          let i = e,
            s = t;
          for (
            ;
            !((i = i.parent),
            null !== i ||
              n & L.Host ||
              ((i = wb(s)), null === i || ((s = s[15]), 10 & i.type)));

          );
          if (null === i) return !1;
          (e = i), (t = s);
        }
        const r = (O.lFrame = op());
        return (r.currentTNode = e), (r.lView = t), !0;
      }
      function No(t) {
        const e = op(),
          n = t[1];
        (O.lFrame = e),
          (e.currentTNode = n.firstChild),
          (e.lView = t),
          (e.tView = n),
          (e.contextLView = t),
          (e.bindingIndex = n.bindingStartIndex),
          (e.inI18n = !1);
      }
      function op() {
        const t = O.lFrame,
          e = null === t ? null : t.child;
        return null === e ? ap(t) : e;
      }
      function ap(t) {
        const e = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: t,
          child: null,
          inI18n: !1,
        };
        return null !== t && (t.child = e), e;
      }
      function lp() {
        const t = O.lFrame;
        return (
          (O.lFrame = t.parent), (t.currentTNode = null), (t.lView = null), t
        );
      }
      const up = lp;
      function xo() {
        const t = lp();
        (t.isParent = !0),
          (t.tView = null),
          (t.selectedIndex = -1),
          (t.contextLView = null),
          (t.elementDepthCount = 0),
          (t.currentDirectiveIndex = -1),
          (t.currentNamespace = null),
          (t.bindingRootIndex = -1),
          (t.bindingIndex = -1),
          (t.currentQueryIndex = 0);
      }
      function Xe() {
        return O.lFrame.selectedIndex;
      }
      function Qn(t) {
        O.lFrame.selectedIndex = t;
      }
      function De() {
        const t = O.lFrame;
        return ou(t.tView, t.selectedIndex);
      }
      function Fo(t, e) {
        for (let n = e.directiveStart, r = e.directiveEnd; n < r; n++) {
          const s = t.data[n].type.prototype,
            {
              ngAfterContentInit: o,
              ngAfterContentChecked: a,
              ngAfterViewInit: l,
              ngAfterViewChecked: u,
              ngOnDestroy: c,
            } = s;
          o && (t.contentHooks || (t.contentHooks = [])).push(-n, o),
            a &&
              ((t.contentHooks || (t.contentHooks = [])).push(n, a),
              (t.contentCheckHooks || (t.contentCheckHooks = [])).push(n, a)),
            l && (t.viewHooks || (t.viewHooks = [])).push(-n, l),
            u &&
              ((t.viewHooks || (t.viewHooks = [])).push(n, u),
              (t.viewCheckHooks || (t.viewCheckHooks = [])).push(n, u)),
            null != c && (t.destroyHooks || (t.destroyHooks = [])).push(n, c);
        }
      }
      function Po(t, e, n) {
        cp(t, e, 3, n);
      }
      function Ro(t, e, n, r) {
        (3 & t[2]) === n && cp(t, e, n, r);
      }
      function pu(t, e) {
        let n = t[2];
        (3 & n) === e && ((n &= 2047), (n += 1), (t[2] = n));
      }
      function cp(t, e, n, r) {
        const s = null != r ? r : -1,
          o = e.length - 1;
        let a = 0;
        for (let l = void 0 !== r ? 65535 & t[18] : 0; l < o; l++)
          if ("number" == typeof e[l + 1]) {
            if (((a = e[l]), null != r && a >= r)) break;
          } else
            e[l] < 0 && (t[18] += 65536),
              (a < s || -1 == s) &&
                (Fb(t, n, e, l), (t[18] = (4294901760 & t[18]) + l + 2)),
              l++;
      }
      function Fb(t, e, n, r) {
        const i = n[r] < 0,
          s = n[r + 1],
          a = t[i ? -n[r] : n[r]];
        if (i) {
          if (t[2] >> 11 < t[18] >> 16 && (3 & t[2]) === e) {
            t[2] += 2048;
            try {
              s.call(a);
            } finally {
            }
          }
        } else
          try {
            s.call(a);
          } finally {
          }
      }
      class Xi {
        constructor(e, n, r) {
          (this.factory = e),
            (this.resolving = !1),
            (this.canSeeViewProviders = n),
            (this.injectImpl = r);
        }
      }
      function Oo(t, e, n) {
        const r = ve(t);
        let i = 0;
        for (; i < n.length; ) {
          const s = n[i];
          if ("number" == typeof s) {
            if (0 !== s) break;
            i++;
            const o = n[i++],
              a = n[i++],
              l = n[i++];
            r ? t.setAttribute(e, a, l, o) : e.setAttributeNS(o, a, l);
          } else {
            const o = s,
              a = n[++i];
            mu(o)
              ? r && t.setProperty(e, o, a)
              : r
              ? t.setAttribute(e, o, a)
              : e.setAttribute(o, a),
              i++;
          }
        }
        return i;
      }
      function dp(t) {
        return 3 === t || 4 === t || 6 === t;
      }
      function mu(t) {
        return 64 === t.charCodeAt(0);
      }
      function ko(t, e) {
        if (null !== e && 0 !== e.length)
          if (null === t || 0 === t.length) t = e.slice();
          else {
            let n = -1;
            for (let r = 0; r < e.length; r++) {
              const i = e[r];
              "number" == typeof i
                ? (n = i)
                : 0 === n ||
                  fp(t, n, i, null, -1 === n || 2 === n ? e[++r] : null);
            }
          }
        return t;
      }
      function fp(t, e, n, r, i) {
        let s = 0,
          o = t.length;
        if (-1 === e) o = -1;
        else
          for (; s < t.length; ) {
            const a = t[s++];
            if ("number" == typeof a) {
              if (a === e) {
                o = -1;
                break;
              }
              if (a > e) {
                o = s - 1;
                break;
              }
            }
          }
        for (; s < t.length; ) {
          const a = t[s];
          if ("number" == typeof a) break;
          if (a === n) {
            if (null === r) return void (null !== i && (t[s + 1] = i));
            if (r === t[s + 1]) return void (t[s + 2] = i);
          }
          s++, null !== r && s++, null !== i && s++;
        }
        -1 !== o && (t.splice(o, 0, e), (s = o + 1)),
          t.splice(s++, 0, n),
          null !== r && t.splice(s++, 0, r),
          null !== i && t.splice(s++, 0, i);
      }
      function hp(t) {
        return -1 !== t;
      }
      function Wr(t) {
        return 32767 & t;
      }
      function Qr(t, e) {
        let n = (function Vb(t) {
            return t >> 16;
          })(t),
          r = e;
        for (; n > 0; ) (r = r[15]), n--;
        return r;
      }
      let yu = !0;
      function Vo(t) {
        const e = yu;
        return (yu = t), e;
      }
      let Lb = 0;
      function ts(t, e) {
        const n = vu(t, e);
        if (-1 !== n) return n;
        const r = e[1];
        r.firstCreatePass &&
          ((t.injectorIndex = e.length),
          _u(r.data, t),
          _u(e, null),
          _u(r.blueprint, null));
        const i = Lo(t, e),
          s = t.injectorIndex;
        if (hp(i)) {
          const o = Wr(i),
            a = Qr(i, e),
            l = a[1].data;
          for (let u = 0; u < 8; u++) e[s + u] = a[o + u] | l[o + u];
        }
        return (e[s + 8] = i), s;
      }
      function _u(t, e) {
        t.push(0, 0, 0, 0, 0, 0, 0, 0, e);
      }
      function vu(t, e) {
        return -1 === t.injectorIndex ||
          (t.parent && t.parent.injectorIndex === t.injectorIndex) ||
          null === e[t.injectorIndex + 8]
          ? -1
          : t.injectorIndex;
      }
      function Lo(t, e) {
        if (t.parent && -1 !== t.parent.injectorIndex)
          return t.parent.injectorIndex;
        let n = 0,
          r = null,
          i = e;
        for (; null !== i; ) {
          const s = i[1],
            o = s.type;
          if (((r = 2 === o ? s.declTNode : 1 === o ? i[6] : null), null === r))
            return -1;
          if ((n++, (i = i[15]), -1 !== r.injectorIndex))
            return r.injectorIndex | (n << 16);
        }
        return -1;
      }
      function Bo(t, e, n) {
        !(function Bb(t, e, n) {
          let r;
          "string" == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(Qi) && (r = n[Qi]),
            null == r && (r = n[Qi] = Lb++);
          const i = 255 & r;
          e.data[t + (i >> 5)] |= 1 << i;
        })(t, e, n);
      }
      function mp(t, e, n) {
        if (n & L.Optional) return t;
        vo(e, "NodeInjector");
      }
      function yp(t, e, n, r) {
        if (
          (n & L.Optional && void 0 === r && (r = null),
          0 == (n & (L.Self | L.Host)))
        ) {
          const i = t[9],
            s = Gn(void 0);
          try {
            return i ? i.get(e, r, n & L.Optional) : Uh(e, r, n & L.Optional);
          } finally {
            Gn(s);
          }
        }
        return mp(r, e, n);
      }
      function _p(t, e, n, r = L.Default, i) {
        if (null !== t) {
          const s = (function $b(t) {
            if ("string" == typeof t) return t.charCodeAt(0) || 0;
            const e = t.hasOwnProperty(Qi) ? t[Qi] : void 0;
            return "number" == typeof e ? (e >= 0 ? 255 & e : Ub) : e;
          })(n);
          if ("function" == typeof s) {
            if (!sp(e, t, r)) return r & L.Host ? mp(i, n, r) : yp(e, n, r, i);
            try {
              const o = s(r);
              if (null != o || r & L.Optional) return o;
              vo(n);
            } finally {
              up();
            }
          } else if ("number" == typeof s) {
            let o = null,
              a = vu(t, e),
              l = -1,
              u = r & L.Host ? e[16][6] : null;
            for (
              (-1 === a || r & L.SkipSelf) &&
              ((l = -1 === a ? Lo(t, e) : e[a + 8]),
              -1 !== l && Cp(r, !1)
                ? ((o = e[1]), (a = Wr(l)), (e = Qr(l, e)))
                : (a = -1));
              -1 !== a;

            ) {
              const c = e[1];
              if (Dp(s, a, c.data)) {
                const d = Hb(a, e, n, o, r, u);
                if (d !== vp) return d;
              }
              (l = e[a + 8]),
                -1 !== l && Cp(r, e[1].data[a + 8] === u) && Dp(s, a, e)
                  ? ((o = c), (a = Wr(l)), (e = Qr(l, e)))
                  : (a = -1);
            }
          }
        }
        return yp(e, n, r, i);
      }
      const vp = {};
      function Ub() {
        return new Kr(Pe(), v());
      }
      function Hb(t, e, n, r, i, s) {
        const o = e[1],
          a = o.data[t + 8],
          c = (function jo(t, e, n, r, i) {
            const s = t.providerIndexes,
              o = e.data,
              a = 1048575 & s,
              l = t.directiveStart,
              c = s >> 20,
              f = i ? a + c : t.directiveEnd;
            for (let h = r ? a : a + c; h < f; h++) {
              const p = o[h];
              if ((h < l && n === p) || (h >= l && p.type === n)) return h;
            }
            if (i) {
              const h = o[l];
              if (h && Wt(h) && h.type === n) return l;
            }
            return null;
          })(
            a,
            o,
            n,
            null == r ? So(a) && yu : r != o && 0 != (3 & a.type),
            i & L.Host && s === a
          );
        return null !== c ? ns(e, o, c, a) : vp;
      }
      function ns(t, e, n, r) {
        let i = t[n];
        const s = e.data;
        if (
          (function Pb(t) {
            return t instanceof Xi;
          })(i)
        ) {
          const o = i;
          o.resolving &&
            (function Ow(t, e) {
              const n = e ? `. Dependency path: ${e.join(" > ")} > ${t}` : "";
              throw new b(
                -200,
                `Circular dependency in DI detected for ${t}${n}`
              );
            })(Ye(s[n]));
          const a = Vo(o.canSeeViewProviders);
          o.resolving = !0;
          const l = o.injectImpl ? Gn(o.injectImpl) : null;
          sp(t, r, L.Default);
          try {
            (i = t[n] = o.factory(void 0, s, t, r)),
              e.firstCreatePass &&
                n >= r.directiveStart &&
                (function xb(t, e, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: i,
                    ngDoCheck: s,
                  } = e.type.prototype;
                  if (r) {
                    const o = Qh(e);
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(t, o),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(t, o);
                  }
                  i &&
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - t, i),
                    s &&
                      ((n.preOrderHooks || (n.preOrderHooks = [])).push(t, s),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(t, s));
                })(n, s[n], e);
          } finally {
            null !== l && Gn(l), Vo(a), (o.resolving = !1), up();
          }
        }
        return i;
      }
      function Dp(t, e, n) {
        return !!(n[e + (t >> 5)] & (1 << t));
      }
      function Cp(t, e) {
        return !(t & L.Self || (t & L.Host && e));
      }
      class Kr {
        constructor(e, n) {
          (this._tNode = e), (this._lView = n);
        }
        get(e, n, r) {
          return _p(this._tNode, this._lView, e, r, n);
        }
      }
      function Du(t) {
        return Vh(t)
          ? () => {
              const e = Du(j(t));
              return e && e();
            }
          : _r(t);
      }
      const Yr = "__parameters__";
      function Xr(t, e, n) {
        return qn(() => {
          const r = (function Cu(t) {
            return function (...n) {
              if (t) {
                const r = t(...n);
                for (const i in r) this[i] = r[i];
              }
            };
          })(e);
          function i(...s) {
            if (this instanceof i) return r.apply(this, s), this;
            const o = new i(...s);
            return (a.annotation = o), a;
            function a(l, u, c) {
              const d = l.hasOwnProperty(Yr)
                ? l[Yr]
                : Object.defineProperty(l, Yr, { value: [] })[Yr];
              for (; d.length <= c; ) d.push(null);
              return (d[c] = d[c] || []).push(o), l;
            }
          }
          return (
            n && (i.prototype = Object.create(n.prototype)),
            (i.prototype.ngMetadataName = t),
            (i.annotationCls = i),
            i
          );
        });
      }
      class q {
        constructor(e, n) {
          (this._desc = e),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof n
              ? (this.__NG_ELEMENT_ID__ = n)
              : void 0 !== n &&
                (this.ɵprov = G({
                  token: this,
                  providedIn: n.providedIn || "root",
                  factory: n.factory,
                }));
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      const qb = new q("AnalyzeForEntryComponents");
      function cn(t, e) {
        t.forEach((n) => (Array.isArray(n) ? cn(n, e) : e(n)));
      }
      function wp(t, e, n) {
        e >= t.length ? t.push(n) : t.splice(e, 0, n);
      }
      function Uo(t, e) {
        return e >= t.length - 1 ? t.pop() : t.splice(e, 1)[0];
      }
      function pt(t, e, n) {
        let r = ei(t, e);
        return (
          r >= 0
            ? (t[1 | r] = n)
            : ((r = ~r),
              (function Qb(t, e, n, r) {
                let i = t.length;
                if (i == e) t.push(n, r);
                else if (1 === i) t.push(r, t[0]), (t[0] = n);
                else {
                  for (i--, t.push(t[i - 1], t[i]); i > e; )
                    (t[i] = t[i - 2]), i--;
                  (t[e] = n), (t[e + 1] = r);
                }
              })(t, r, e, n)),
          r
        );
      }
      function wu(t, e) {
        const n = ei(t, e);
        if (n >= 0) return t[1 | n];
      }
      function ei(t, e) {
        return (function Ap(t, e, n) {
          let r = 0,
            i = t.length >> n;
          for (; i !== r; ) {
            const s = r + ((i - r) >> 1),
              o = t[s << n];
            if (e === o) return s << n;
            o > e ? (i = s) : (r = s + 1);
          }
          return ~(i << n);
        })(t, e, 1);
      }
      const as = {},
        Su = "__NG_DI_FLAG__",
        $o = "ngTempTokenPath",
        t0 = /\n/gm,
        Tp = "__source",
        r0 = ie({ provide: String, useValue: ie });
      let ls;
      function Ip(t) {
        const e = ls;
        return (ls = t), e;
      }
      function s0(t, e = L.Default) {
        if (void 0 === ls) throw new b(203, "");
        return null === ls
          ? Uh(t, void 0, e)
          : ls.get(t, e & L.Optional ? null : void 0, e);
      }
      function T(t, e = L.Default) {
        return (
          (function Hw() {
            return Ql;
          })() || s0
        )(j(t), e);
      }
      function Au(t) {
        const e = [];
        for (let n = 0; n < t.length; n++) {
          const r = j(t[n]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new b(900, "");
            let i,
              s = L.Default;
            for (let o = 0; o < r.length; o++) {
              const a = r[o],
                l = o0(a);
              "number" == typeof l
                ? -1 === l
                  ? (i = a.token)
                  : (s |= l)
                : (i = a);
            }
            e.push(T(i, s));
          } else e.push(T(r));
        }
        return e;
      }
      function us(t, e) {
        return (t[Su] = e), (t.prototype[Su] = e), t;
      }
      function o0(t) {
        return t[Su];
      }
      const cs = us(
          Xr("Inject", (t) => ({ token: t })),
          -1
        ),
        dn = us(Xr("Optional"), 8),
        ti = us(Xr("SkipSelf"), 4);
      class Lp {
        constructor(e) {
          this.changingThisBreaksApplicationSecurity = e;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`;
        }
      }
      function Zn(t) {
        return t instanceof Lp ? t.changingThisBreaksApplicationSecurity : t;
      }
      const T0 =
          /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi,
        I0 =
          /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
      var Ie = (() => (
        ((Ie = Ie || {})[(Ie.NONE = 0)] = "NONE"),
        (Ie[(Ie.HTML = 1)] = "HTML"),
        (Ie[(Ie.STYLE = 2)] = "STYLE"),
        (Ie[(Ie.SCRIPT = 3)] = "SCRIPT"),
        (Ie[(Ie.URL = 4)] = "URL"),
        (Ie[(Ie.RESOURCE_URL = 5)] = "RESOURCE_URL"),
        Ie
      ))();
      function Ru(t) {
        const e = (function ps() {
          const t = v();
          return t && t[12];
        })();
        return e
          ? e.sanitize(Ie.URL, t) || ""
          : (function fs(t, e) {
              const n = (function b0(t) {
                return (t instanceof Lp && t.getTypeName()) || null;
              })(t);
              if (null != n && n !== e) {
                if ("ResourceURL" === n && "URL" === e) return !0;
                throw new Error(
                  `Required a safe ${e}, got a ${n} (see https://g.co/ng/security#xss)`
                );
              }
              return n === e;
            })(t, "URL")
          ? Zn(t)
          : (function Wo(t) {
              return (t = String(t)).match(T0) || t.match(I0)
                ? t
                : "unsafe:" + t;
            })(k(t));
      }
      const Qp = "__ngContext__";
      function We(t, e) {
        t[Qp] = e;
      }
      function ku(t) {
        const e = (function gs(t) {
          return t[Qp] || null;
        })(t);
        return e ? (Array.isArray(e) ? e : e.lView) : null;
      }
      function Lu(t) {
        return t.ngOriginalError;
      }
      function J0(t, ...e) {
        t.error(...e);
      }
      class ii {
        constructor() {
          this._console = console;
        }
        handleError(e) {
          const n = this._findOriginalError(e),
            r = (function Y0(t) {
              return (t && t.ngErrorLogger) || J0;
            })(e);
          r(this._console, "ERROR", e),
            n && r(this._console, "ORIGINAL ERROR", n);
        }
        _findOriginalError(e) {
          let n = e && Lu(e);
          for (; n && Lu(n); ) n = Lu(n);
          return n || null;
        }
      }
      const Xp = (() =>
        (
          ("undefined" != typeof requestAnimationFrame &&
            requestAnimationFrame) ||
          setTimeout
        ).bind(re))();
      function hn(t) {
        return t instanceof Function ? t() : t;
      }
      var gt = (() => (
        ((gt = gt || {})[(gt.Important = 1)] = "Important"),
        (gt[(gt.DashCase = 2)] = "DashCase"),
        gt
      ))();
      function ju(t, e) {
        return undefined(t, e);
      }
      function ms(t) {
        const e = t[3];
        return zt(e) ? e[3] : e;
      }
      function Uu(t) {
        return ig(t[13]);
      }
      function Hu(t) {
        return ig(t[4]);
      }
      function ig(t) {
        for (; null !== t && !zt(t); ) t = t[4];
        return t;
      }
      function oi(t, e, n, r, i) {
        if (null != r) {
          let s,
            o = !1;
          zt(r) ? (s = r) : ln(r) && ((o = !0), (r = r[0]));
          const a = Te(r);
          0 === t && null !== n
            ? null == i
              ? cg(e, n, a)
              : vr(e, n, a, i || null, !0)
            : 1 === t && null !== n
            ? vr(e, n, a, i || null, !0)
            : 2 === t
            ? (function yg(t, e, n) {
                const r = Ko(t, e);
                r &&
                  (function CS(t, e, n, r) {
                    ve(t) ? t.removeChild(e, n, r) : e.removeChild(n);
                  })(t, r, e, n);
              })(e, a, o)
            : 3 === t && e.destroyNode(a),
            null != s &&
              (function bS(t, e, n, r, i) {
                const s = n[7];
                s !== Te(n) && oi(e, t, r, s, i);
                for (let a = 10; a < n.length; a++) {
                  const l = n[a];
                  ys(l[1], l, t, e, r, s);
                }
              })(e, t, s, n, i);
        }
      }
      function Gu(t, e, n) {
        if (ve(t)) return t.createElement(e, n);
        {
          const r =
            null !== n
              ? (function lb(t) {
                  const e = t.toLowerCase();
                  return "svg" === e
                    ? "http://www.w3.org/2000/svg"
                    : "math" === e
                    ? "http://www.w3.org/1998/MathML/"
                    : null;
                })(n)
              : null;
          return null === r ? t.createElement(e) : t.createElementNS(r, e);
        }
      }
      function og(t, e) {
        const n = t[9],
          r = n.indexOf(e),
          i = e[3];
        1024 & e[2] && ((e[2] &= -1025), lu(i, -1)), n.splice(r, 1);
      }
      function qu(t, e) {
        if (t.length <= 10) return;
        const n = 10 + e,
          r = t[n];
        if (r) {
          const i = r[17];
          null !== i && i !== t && og(i, r), e > 0 && (t[n - 1][4] = r[4]);
          const s = Uo(t, 10 + e);
          !(function hS(t, e) {
            ys(t, e, e[U], 2, null, null), (e[0] = null), (e[6] = null);
          })(r[1], r);
          const o = s[19];
          null !== o && o.detachView(s[1]),
            (r[3] = null),
            (r[4] = null),
            (r[2] &= -129);
        }
        return r;
      }
      function ag(t, e) {
        if (!(256 & e[2])) {
          const n = e[U];
          ve(n) && n.destroyNode && ys(t, e, n, 3, null, null),
            (function mS(t) {
              let e = t[13];
              if (!e) return zu(t[1], t);
              for (; e; ) {
                let n = null;
                if (ln(e)) n = e[13];
                else {
                  const r = e[10];
                  r && (n = r);
                }
                if (!n) {
                  for (; e && !e[4] && e !== t; )
                    ln(e) && zu(e[1], e), (e = e[3]);
                  null === e && (e = t), ln(e) && zu(e[1], e), (n = e && e[4]);
                }
                e = n;
              }
            })(e);
        }
      }
      function zu(t, e) {
        if (!(256 & e[2])) {
          (e[2] &= -129),
            (e[2] |= 256),
            (function DS(t, e) {
              let n;
              if (null != t && null != (n = t.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const i = e[n[r]];
                  if (!(i instanceof Xi)) {
                    const s = n[r + 1];
                    if (Array.isArray(s))
                      for (let o = 0; o < s.length; o += 2) {
                        const a = i[s[o]],
                          l = s[o + 1];
                        try {
                          l.call(a);
                        } finally {
                        }
                      }
                    else
                      try {
                        s.call(i);
                      } finally {
                      }
                  }
                }
            })(t, e),
            (function vS(t, e) {
              const n = t.cleanup,
                r = e[7];
              let i = -1;
              if (null !== n)
                for (let s = 0; s < n.length - 1; s += 2)
                  if ("string" == typeof n[s]) {
                    const o = n[s + 1],
                      a = "function" == typeof o ? o(e) : Te(e[o]),
                      l = r[(i = n[s + 2])],
                      u = n[s + 3];
                    "boolean" == typeof u
                      ? a.removeEventListener(n[s], l, u)
                      : u >= 0
                      ? r[(i = u)]()
                      : r[(i = -u)].unsubscribe(),
                      (s += 2);
                  } else {
                    const o = r[(i = n[s + 1])];
                    n[s].call(o);
                  }
              if (null !== r) {
                for (let s = i + 1; s < r.length; s++) r[s]();
                e[7] = null;
              }
            })(t, e),
            1 === e[1].type && ve(e[U]) && e[U].destroy();
          const n = e[17];
          if (null !== n && zt(e[3])) {
            n !== e[3] && og(n, e);
            const r = e[19];
            null !== r && r.detachView(t);
          }
        }
      }
      function lg(t, e, n) {
        return (function ug(t, e, n) {
          let r = e;
          for (; null !== r && 40 & r.type; ) r = (e = r).parent;
          if (null === r) return n[0];
          if (2 & r.flags) {
            const i = t.data[r.directiveStart].encapsulation;
            if (i === $t.None || i === $t.Emulated) return null;
          }
          return Rt(r, n);
        })(t, e.parent, n);
      }
      function vr(t, e, n, r, i) {
        ve(t) ? t.insertBefore(e, n, r, i) : e.insertBefore(n, r, i);
      }
      function cg(t, e, n) {
        ve(t) ? t.appendChild(e, n) : e.appendChild(n);
      }
      function dg(t, e, n, r, i) {
        null !== r ? vr(t, e, n, r, i) : cg(t, e, n);
      }
      function Ko(t, e) {
        return ve(t) ? t.parentNode(e) : e.parentNode;
      }
      let pg = function hg(t, e, n) {
        return 40 & t.type ? Rt(t, n) : null;
      };
      function Zo(t, e, n, r) {
        const i = lg(t, r, e),
          s = e[U],
          a = (function fg(t, e, n) {
            return pg(t, e, n);
          })(r.parent || e[6], r, e);
        if (null != i)
          if (Array.isArray(n))
            for (let l = 0; l < n.length; l++) dg(s, i, n[l], a, !1);
          else dg(s, i, n, a, !1);
      }
      function Yo(t, e) {
        if (null !== e) {
          const n = e.type;
          if (3 & n) return Rt(e, t);
          if (4 & n) return Qu(-1, t[e.index]);
          if (8 & n) {
            const r = e.child;
            if (null !== r) return Yo(t, r);
            {
              const i = t[e.index];
              return zt(i) ? Qu(-1, i) : Te(i);
            }
          }
          if (32 & n) return ju(e, t)() || Te(t[e.index]);
          {
            const r = mg(t, e);
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : Yo(ms(t[16]), r)
              : Yo(t, e.next);
          }
        }
        return null;
      }
      function mg(t, e) {
        return null !== e ? t[16][6].projection[e.projection] : null;
      }
      function Qu(t, e) {
        const n = 10 + t + 1;
        if (n < e.length) {
          const r = e[n],
            i = r[1].firstChild;
          if (null !== i) return Yo(r, i);
        }
        return e[7];
      }
      function Ku(t, e, n, r, i, s, o) {
        for (; null != n; ) {
          const a = r[n.index],
            l = n.type;
          if (
            (o && 0 === e && (a && We(Te(a), r), (n.flags |= 4)),
            64 != (64 & n.flags))
          )
            if (8 & l) Ku(t, e, n.child, r, i, s, !1), oi(e, t, i, a, s);
            else if (32 & l) {
              const u = ju(n, r);
              let c;
              for (; (c = u()); ) oi(e, t, i, c, s);
              oi(e, t, i, a, s);
            } else 16 & l ? _g(t, e, r, n, i, s) : oi(e, t, i, a, s);
          n = o ? n.projectionNext : n.next;
        }
      }
      function ys(t, e, n, r, i, s) {
        Ku(n, r, t.firstChild, e, i, s, !1);
      }
      function _g(t, e, n, r, i, s) {
        const o = n[16],
          l = o[6].projection[r.projection];
        if (Array.isArray(l))
          for (let u = 0; u < l.length; u++) oi(e, t, i, l[u], s);
        else Ku(t, e, l, o[3], i, s, !0);
      }
      function vg(t, e, n) {
        ve(t) ? t.setAttribute(e, "style", n) : (e.style.cssText = n);
      }
      function Zu(t, e, n) {
        ve(t)
          ? "" === n
            ? t.removeAttribute(e, "class")
            : t.setAttribute(e, "class", n)
          : (e.className = n);
      }
      function Dg(t, e, n) {
        let r = t.length;
        for (;;) {
          const i = t.indexOf(e, n);
          if (-1 === i) return i;
          if (0 === i || t.charCodeAt(i - 1) <= 32) {
            const s = e.length;
            if (i + s === r || t.charCodeAt(i + s) <= 32) return i;
          }
          n = i + 1;
        }
      }
      const Cg = "ng-template";
      function AS(t, e, n) {
        let r = 0;
        for (; r < t.length; ) {
          let i = t[r++];
          if (n && "class" === i) {
            if (((i = t[r]), -1 !== Dg(i.toLowerCase(), e, 0))) return !0;
          } else if (1 === i) {
            for (; r < t.length && "string" == typeof (i = t[r++]); )
              if (i.toLowerCase() === e) return !0;
            return !1;
          }
        }
        return !1;
      }
      function Eg(t) {
        return 4 === t.type && t.value !== Cg;
      }
      function MS(t, e, n) {
        return e === (4 !== t.type || n ? t.value : Cg);
      }
      function TS(t, e, n) {
        let r = 4;
        const i = t.attrs || [],
          s = (function xS(t) {
            for (let e = 0; e < t.length; e++) if (dp(t[e])) return e;
            return t.length;
          })(i);
        let o = !1;
        for (let a = 0; a < e.length; a++) {
          const l = e[a];
          if ("number" != typeof l) {
            if (!o)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== l && !MS(t, l, n)) || ("" === l && 1 === e.length))
                ) {
                  if (Qt(r)) return !1;
                  o = !0;
                }
              } else {
                const u = 8 & r ? l : e[++a];
                if (8 & r && null !== t.attrs) {
                  if (!AS(t.attrs, u, n)) {
                    if (Qt(r)) return !1;
                    o = !0;
                  }
                  continue;
                }
                const d = IS(8 & r ? "class" : l, i, Eg(t), n);
                if (-1 === d) {
                  if (Qt(r)) return !1;
                  o = !0;
                  continue;
                }
                if ("" !== u) {
                  let f;
                  f = d > s ? "" : i[d + 1].toLowerCase();
                  const h = 8 & r ? f : null;
                  if ((h && -1 !== Dg(h, u, 0)) || (2 & r && u !== f)) {
                    if (Qt(r)) return !1;
                    o = !0;
                  }
                }
              }
          } else {
            if (!o && !Qt(r) && !Qt(l)) return !1;
            if (o && Qt(l)) continue;
            (o = !1), (r = l | (1 & r));
          }
        }
        return Qt(r) || o;
      }
      function Qt(t) {
        return 0 == (1 & t);
      }
      function IS(t, e, n, r) {
        if (null === e) return -1;
        let i = 0;
        if (r || !n) {
          let s = !1;
          for (; i < e.length; ) {
            const o = e[i];
            if (o === t) return i;
            if (3 === o || 6 === o) s = !0;
            else {
              if (1 === o || 2 === o) {
                let a = e[++i];
                for (; "string" == typeof a; ) a = e[++i];
                continue;
              }
              if (4 === o) break;
              if (0 === o) {
                i += 4;
                continue;
              }
            }
            i += s ? 1 : 2;
          }
          return -1;
        }
        return (function FS(t, e) {
          let n = t.indexOf(4);
          if (n > -1)
            for (n++; n < t.length; ) {
              const r = t[n];
              if ("number" == typeof r) return -1;
              if (r === e) return n;
              n++;
            }
          return -1;
        })(e, t);
      }
      function wg(t, e, n = !1) {
        for (let r = 0; r < e.length; r++) if (TS(t, e[r], n)) return !0;
        return !1;
      }
      function bg(t, e) {
        return t ? ":not(" + e.trim() + ")" : e;
      }
      function RS(t) {
        let e = t[0],
          n = 1,
          r = 2,
          i = "",
          s = !1;
        for (; n < t.length; ) {
          let o = t[n];
          if ("string" == typeof o)
            if (2 & r) {
              const a = t[++n];
              i += "[" + o + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & r ? (i += "." + o) : 4 & r && (i += " " + o);
          else
            "" !== i && !Qt(o) && ((e += bg(s, i)), (i = "")),
              (r = o),
              (s = s || !Qt(r));
          n++;
        }
        return "" !== i && (e += bg(s, i)), e;
      }
      const V = {};
      function ee(t) {
        Sg(J(), v(), Xe() + t, To());
      }
      function Sg(t, e, n, r) {
        if (!r)
          if (3 == (3 & e[2])) {
            const s = t.preOrderCheckHooks;
            null !== s && Po(e, s, n);
          } else {
            const s = t.preOrderHooks;
            null !== s && Ro(e, s, 0, n);
          }
        Qn(n);
      }
      function Jo(t, e) {
        return (t << 17) | (e << 2);
      }
      function Kt(t) {
        return (t >> 17) & 32767;
      }
      function Yu(t) {
        return 2 | t;
      }
      function Fn(t) {
        return (131068 & t) >> 2;
      }
      function Ju(t, e) {
        return (-131069 & t) | (e << 2);
      }
      function Xu(t) {
        return 1 | t;
      }
      function kg(t, e) {
        const n = t.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const i = n[r],
              s = n[r + 1];
            if (-1 !== s) {
              const o = t.data[s];
              hu(i), o.contentQueries(2, e[s], s);
            }
          }
      }
      function _s(t, e, n, r, i, s, o, a, l, u) {
        const c = e.blueprint.slice();
        return (
          (c[0] = i),
          (c[2] = 140 | r),
          Xh(c),
          (c[3] = c[15] = t),
          (c[8] = n),
          (c[10] = o || (t && t[10])),
          (c[U] = a || (t && t[U])),
          (c[12] = l || (t && t[12]) || null),
          (c[9] = u || (t && t[9]) || null),
          (c[6] = s),
          (c[16] = 2 == e.type ? t[16] : c),
          c
        );
      }
      function ai(t, e, n, r, i) {
        let s = t.data[e];
        if (null === s)
          (s = (function lc(t, e, n, r, i) {
            const s = tp(),
              o = uu(),
              l = (t.data[e] = (function JS(t, e, n, r, i, s) {
                return {
                  type: n,
                  index: r,
                  insertBeforeIndex: null,
                  injectorIndex: e ? e.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: i,
                  attrs: s,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tViews: null,
                  next: null,
                  projectionNext: null,
                  child: null,
                  parent: e,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0,
                };
              })(0, o ? s : s && s.parent, n, e, r, i));
            return (
              null === t.firstChild && (t.firstChild = l),
              null !== s &&
                (o
                  ? null == s.child && null !== l.parent && (s.child = l)
                  : null === s.next && (s.next = l)),
              l
            );
          })(t, e, n, r, i)),
            (function Db() {
              return O.lFrame.inI18n;
            })() && (s.flags |= 64);
        else if (64 & s.type) {
          (s.type = n), (s.value = r), (s.attrs = i);
          const o = (function Ji() {
            const t = O.lFrame,
              e = t.currentTNode;
            return t.isParent ? e : e.parent;
          })();
          s.injectorIndex = null === o ? -1 : o.injectorIndex;
        }
        return un(s, !0), s;
      }
      function li(t, e, n, r) {
        if (0 === n) return -1;
        const i = e.length;
        for (let s = 0; s < n; s++)
          e.push(r), t.blueprint.push(r), t.data.push(null);
        return i;
      }
      function vs(t, e, n) {
        No(e);
        try {
          const r = t.viewQuery;
          null !== r && yc(1, r, n);
          const i = t.template;
          null !== i && Vg(t, e, i, 1, n),
            t.firstCreatePass && (t.firstCreatePass = !1),
            t.staticContentQueries && kg(t, e),
            t.staticViewQueries && yc(2, t.viewQuery, n);
          const s = t.components;
          null !== s &&
            (function KS(t, e) {
              for (let n = 0; n < e.length; n++) mA(t, e[n]);
            })(e, s);
        } catch (r) {
          throw (
            (t.firstCreatePass &&
              ((t.incompleteFirstPass = !0), (t.firstCreatePass = !1)),
            r)
          );
        } finally {
          (e[2] &= -5), xo();
        }
      }
      function ui(t, e, n, r) {
        const i = e[2];
        if (256 == (256 & i)) return;
        No(e);
        const s = To();
        try {
          Xh(e),
            (function np(t) {
              return (O.lFrame.bindingIndex = t);
            })(t.bindingStartIndex),
            null !== n && Vg(t, e, n, 2, r);
          const o = 3 == (3 & i);
          if (!s)
            if (o) {
              const u = t.preOrderCheckHooks;
              null !== u && Po(e, u, null);
            } else {
              const u = t.preOrderHooks;
              null !== u && Ro(e, u, 0, null), pu(e, 0);
            }
          if (
            ((function pA(t) {
              for (let e = Uu(t); null !== e; e = Hu(e)) {
                if (!e[2]) continue;
                const n = e[9];
                for (let r = 0; r < n.length; r++) {
                  const i = n[r],
                    s = i[3];
                  0 == (1024 & i[2]) && lu(s, 1), (i[2] |= 1024);
                }
              }
            })(e),
            (function hA(t) {
              for (let e = Uu(t); null !== e; e = Hu(e))
                for (let n = 10; n < e.length; n++) {
                  const r = e[n],
                    i = r[1];
                  au(r) && ui(i, r, i.template, r[8]);
                }
            })(e),
            null !== t.contentQueries && kg(t, e),
            !s)
          )
            if (o) {
              const u = t.contentCheckHooks;
              null !== u && Po(e, u);
            } else {
              const u = t.contentHooks;
              null !== u && Ro(e, u, 1), pu(e, 1);
            }
          !(function WS(t, e) {
            const n = t.hostBindingOpCodes;
            if (null !== n)
              try {
                for (let r = 0; r < n.length; r++) {
                  const i = n[r];
                  if (i < 0) Qn(~i);
                  else {
                    const s = i,
                      o = n[++r],
                      a = n[++r];
                    Cb(o, s), a(2, e[s]);
                  }
                }
              } finally {
                Qn(-1);
              }
          })(t, e);
          const a = t.components;
          null !== a &&
            (function QS(t, e) {
              for (let n = 0; n < e.length; n++) gA(t, e[n]);
            })(e, a);
          const l = t.viewQuery;
          if ((null !== l && yc(2, l, r), !s))
            if (o) {
              const u = t.viewCheckHooks;
              null !== u && Po(e, u);
            } else {
              const u = t.viewHooks;
              null !== u && Ro(e, u, 2), pu(e, 2);
            }
          !0 === t.firstUpdatePass && (t.firstUpdatePass = !1),
            s || (e[2] &= -73),
            1024 & e[2] && ((e[2] &= -1025), lu(e[3], -1));
        } finally {
          xo();
        }
      }
      function ZS(t, e, n, r) {
        const i = e[10],
          s = !To(),
          o = (function Jh(t) {
            return 4 == (4 & t[2]);
          })(e);
        try {
          s && !o && i.begin && i.begin(), o && vs(t, e, r), ui(t, e, n, r);
        } finally {
          s && !o && i.end && i.end();
        }
      }
      function Vg(t, e, n, r, i) {
        const s = Xe(),
          o = 2 & r;
        try {
          Qn(-1), o && e.length > 20 && Sg(t, e, 20, To()), n(r, i);
        } finally {
          Qn(s);
        }
      }
      function uc(t, e, n) {
        !ep() ||
          ((function sA(t, e, n, r) {
            const i = n.directiveStart,
              s = n.directiveEnd;
            t.firstCreatePass || ts(n, e), We(r, e);
            const o = n.initialInputs;
            for (let a = i; a < s; a++) {
              const l = t.data[a],
                u = Wt(l);
              u && cA(e, n, l);
              const c = ns(e, t, a, n);
              We(c, e),
                null !== o && dA(0, a - i, c, l, 0, o),
                u && (ht(n.index, e)[8] = c);
            }
          })(t, e, n, Rt(n, e)),
          128 == (128 & n.flags) &&
            (function oA(t, e, n) {
              const r = n.directiveStart,
                i = n.directiveEnd,
                o = n.index,
                a = (function Eb() {
                  return O.lFrame.currentDirectiveIndex;
                })();
              try {
                Qn(o);
                for (let l = r; l < i; l++) {
                  const u = t.data[l],
                    c = e[l];
                  du(l),
                    (null !== u.hostBindings ||
                      0 !== u.hostVars ||
                      null !== u.hostAttrs) &&
                      zg(u, c);
                }
              } finally {
                Qn(-1), du(a);
              }
            })(t, e, n));
      }
      function cc(t, e, n = Rt) {
        const r = e.localNames;
        if (null !== r) {
          let i = e.index + 1;
          for (let s = 0; s < r.length; s += 2) {
            const o = r[s + 1],
              a = -1 === o ? n(e, t) : t[o];
            t[i++] = a;
          }
        }
      }
      function Bg(t) {
        const e = t.tView;
        return null === e || e.incompleteFirstPass
          ? (t.tView = ta(
              1,
              null,
              t.template,
              t.decls,
              t.vars,
              t.directiveDefs,
              t.pipeDefs,
              t.viewQuery,
              t.schemas,
              t.consts
            ))
          : e;
      }
      function ta(t, e, n, r, i, s, o, a, l, u) {
        const c = 20 + r,
          d = c + i,
          f = (function YS(t, e) {
            const n = [];
            for (let r = 0; r < e; r++) n.push(r < t ? null : V);
            return n;
          })(c, d),
          h = "function" == typeof u ? u() : u;
        return (f[1] = {
          type: t,
          blueprint: f,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: e,
          data: f.slice().fill(null, c),
          bindingStartIndex: c,
          expandoStartIndex: d,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof s ? s() : s,
          pipeRegistry: "function" == typeof o ? o() : o,
          firstChild: null,
          schemas: l,
          consts: h,
          incompleteFirstPass: !1,
        });
      }
      function $g(t, e, n) {
        for (let r in t)
          if (t.hasOwnProperty(r)) {
            const i = t[r];
            (n = null === n ? {} : n).hasOwnProperty(r)
              ? n[r].push(e, i)
              : (n[r] = [e, i]);
          }
        return n;
      }
      function mt(t, e, n, r, i, s, o, a) {
        const l = Rt(e, n);
        let c,
          u = e.inputs;
        !a && null != u && (c = u[r])
          ? (nm(t, n, c, r, i),
            So(e) &&
              (function tA(t, e) {
                const n = ht(e, t);
                16 & n[2] || (n[2] |= 64);
              })(n, e.index))
          : 3 & e.type &&
            ((r = (function eA(t) {
              return "class" === t
                ? "className"
                : "for" === t
                ? "htmlFor"
                : "formaction" === t
                ? "formAction"
                : "innerHtml" === t
                ? "innerHTML"
                : "readonly" === t
                ? "readOnly"
                : "tabindex" === t
                ? "tabIndex"
                : t;
            })(r)),
            (i = null != o ? o(i, e.value || "", r) : i),
            ve(s)
              ? s.setProperty(l, r, i)
              : mu(r) || (l.setProperty ? l.setProperty(r, i) : (l[r] = i)));
      }
      function dc(t, e, n, r) {
        let i = !1;
        if (ep()) {
          const s = (function aA(t, e, n) {
              const r = t.directiveRegistry;
              let i = null;
              if (r)
                for (let s = 0; s < r.length; s++) {
                  const o = r[s];
                  wg(n, o.selectors, !1) &&
                    (i || (i = []),
                    Bo(ts(n, e), t, o.type),
                    Wt(o) ? (Wg(t, n), i.unshift(o)) : i.push(o));
                }
              return i;
            })(t, e, n),
            o = null === r ? null : { "": -1 };
          if (null !== s) {
            (i = !0), Qg(n, t.data.length, s.length);
            for (let c = 0; c < s.length; c++) {
              const d = s[c];
              d.providersResolver && d.providersResolver(d);
            }
            let a = !1,
              l = !1,
              u = li(t, e, s.length, null);
            for (let c = 0; c < s.length; c++) {
              const d = s[c];
              (n.mergedAttrs = ko(n.mergedAttrs, d.hostAttrs)),
                Kg(t, n, e, u, d),
                uA(u, d, o),
                null !== d.contentQueries && (n.flags |= 8),
                (null !== d.hostBindings ||
                  null !== d.hostAttrs ||
                  0 !== d.hostVars) &&
                  (n.flags |= 128);
              const f = d.type.prototype;
              !a &&
                (f.ngOnChanges || f.ngOnInit || f.ngDoCheck) &&
                ((t.preOrderHooks || (t.preOrderHooks = [])).push(n.index),
                (a = !0)),
                !l &&
                  (f.ngOnChanges || f.ngDoCheck) &&
                  ((t.preOrderCheckHooks || (t.preOrderCheckHooks = [])).push(
                    n.index
                  ),
                  (l = !0)),
                u++;
            }
            !(function XS(t, e) {
              const r = e.directiveEnd,
                i = t.data,
                s = e.attrs,
                o = [];
              let a = null,
                l = null;
              for (let u = e.directiveStart; u < r; u++) {
                const c = i[u],
                  d = c.inputs,
                  f = null === s || Eg(e) ? null : fA(d, s);
                o.push(f), (a = $g(d, u, a)), (l = $g(c.outputs, u, l));
              }
              null !== a &&
                (a.hasOwnProperty("class") && (e.flags |= 16),
                a.hasOwnProperty("style") && (e.flags |= 32)),
                (e.initialInputs = o),
                (e.inputs = a),
                (e.outputs = l);
            })(t, n);
          }
          o &&
            (function lA(t, e, n) {
              if (e) {
                const r = (t.localNames = []);
                for (let i = 0; i < e.length; i += 2) {
                  const s = n[e[i + 1]];
                  if (null == s) throw new b(-301, !1);
                  r.push(e[i], s);
                }
              }
            })(n, r, o);
        }
        return (n.mergedAttrs = ko(n.mergedAttrs, n.attrs)), i;
      }
      function qg(t, e, n, r, i, s) {
        const o = s.hostBindings;
        if (o) {
          let a = t.hostBindingOpCodes;
          null === a && (a = t.hostBindingOpCodes = []);
          const l = ~e.index;
          (function iA(t) {
            let e = t.length;
            for (; e > 0; ) {
              const n = t[--e];
              if ("number" == typeof n && n < 0) return n;
            }
            return 0;
          })(a) != l && a.push(l),
            a.push(r, i, o);
        }
      }
      function zg(t, e) {
        null !== t.hostBindings && t.hostBindings(1, e);
      }
      function Wg(t, e) {
        (e.flags |= 2), (t.components || (t.components = [])).push(e.index);
      }
      function uA(t, e, n) {
        if (n) {
          if (e.exportAs)
            for (let r = 0; r < e.exportAs.length; r++) n[e.exportAs[r]] = t;
          Wt(e) && (n[""] = t);
        }
      }
      function Qg(t, e, n) {
        (t.flags |= 1),
          (t.directiveStart = e),
          (t.directiveEnd = e + n),
          (t.providerIndexes = e);
      }
      function Kg(t, e, n, r, i) {
        t.data[r] = i;
        const s = i.factory || (i.factory = _r(i.type)),
          o = new Xi(s, Wt(i), null);
        (t.blueprint[r] = o),
          (n[r] = o),
          qg(t, e, 0, r, li(t, n, i.hostVars, V), i);
      }
      function cA(t, e, n) {
        const r = Rt(e, t),
          i = Bg(n),
          s = t[10],
          o = na(
            t,
            _s(
              t,
              i,
              null,
              n.onPush ? 64 : 16,
              r,
              e,
              s,
              s.createRenderer(r, n),
              null,
              null
            )
          );
        t[e.index] = o;
      }
      function pn(t, e, n, r, i, s) {
        const o = Rt(t, e);
        !(function fc(t, e, n, r, i, s, o) {
          if (null == s)
            ve(t) ? t.removeAttribute(e, i, n) : e.removeAttribute(i);
          else {
            const a = null == o ? k(s) : o(s, r || "", i);
            ve(t)
              ? t.setAttribute(e, i, a, n)
              : n
              ? e.setAttributeNS(n, i, a)
              : e.setAttribute(i, a);
          }
        })(e[U], o, s, t.value, n, r, i);
      }
      function dA(t, e, n, r, i, s) {
        const o = s[e];
        if (null !== o) {
          const a = r.setInput;
          for (let l = 0; l < o.length; ) {
            const u = o[l++],
              c = o[l++],
              d = o[l++];
            null !== a ? r.setInput(n, d, u, c) : (n[c] = d);
          }
        }
      }
      function fA(t, e) {
        let n = null,
          r = 0;
        for (; r < e.length; ) {
          const i = e[r];
          if (0 !== i)
            if (5 !== i) {
              if ("number" == typeof i) break;
              t.hasOwnProperty(i) &&
                (null === n && (n = []), n.push(i, t[i], e[r + 1])),
                (r += 2);
            } else r += 2;
          else r += 4;
        }
        return n;
      }
      function Zg(t, e, n, r) {
        return new Array(t, !0, !1, e, null, 0, r, n, null, null);
      }
      function gA(t, e) {
        const n = ht(e, t);
        if (au(n)) {
          const r = n[1];
          80 & n[2] ? ui(r, n, r.template, n[8]) : n[5] > 0 && hc(n);
        }
      }
      function hc(t) {
        for (let r = Uu(t); null !== r; r = Hu(r))
          for (let i = 10; i < r.length; i++) {
            const s = r[i];
            if (1024 & s[2]) {
              const o = s[1];
              ui(o, s, o.template, s[8]);
            } else s[5] > 0 && hc(s);
          }
        const n = t[1].components;
        if (null !== n)
          for (let r = 0; r < n.length; r++) {
            const i = ht(n[r], t);
            au(i) && i[5] > 0 && hc(i);
          }
      }
      function mA(t, e) {
        const n = ht(e, t),
          r = n[1];
        (function yA(t, e) {
          for (let n = e.length; n < t.blueprint.length; n++)
            e.push(t.blueprint[n]);
        })(r, n),
          vs(r, n, n[8]);
      }
      function na(t, e) {
        return t[13] ? (t[14][4] = e) : (t[13] = e), (t[14] = e), e;
      }
      function pc(t) {
        for (; t; ) {
          t[2] |= 64;
          const e = ms(t);
          if (Jw(t) && !e) return t;
          t = e;
        }
        return null;
      }
      function mc(t, e, n) {
        const r = e[10];
        r.begin && r.begin();
        try {
          ui(t, e, t.template, n);
        } catch (i) {
          throw (tm(e, i), i);
        } finally {
          r.end && r.end();
        }
      }
      function Yg(t) {
        !(function gc(t) {
          for (let e = 0; e < t.components.length; e++) {
            const n = t.components[e],
              r = ku(n),
              i = r[1];
            ZS(i, r, i.template, n);
          }
        })(t[8]);
      }
      function yc(t, e, n) {
        hu(0), e(t, n);
      }
      const CA = (() => Promise.resolve(null))();
      function Jg(t) {
        return t[7] || (t[7] = []);
      }
      function Xg(t) {
        return t.cleanup || (t.cleanup = []);
      }
      function tm(t, e) {
        const n = t[9],
          r = n ? n.get(ii, null) : null;
        r && r.handleError(e);
      }
      function nm(t, e, n, r, i) {
        for (let s = 0; s < n.length; ) {
          const o = n[s++],
            a = n[s++],
            l = e[o],
            u = t.data[o];
          null !== u.setInput ? u.setInput(l, i, r, a) : (l[a] = i);
        }
      }
      function Pn(t, e, n) {
        const r = Mo(e, t);
        !(function sg(t, e, n) {
          ve(t) ? t.setValue(e, n) : (e.textContent = n);
        })(t[U], r, n);
      }
      function ra(t, e, n) {
        let r = n ? t.styles : null,
          i = n ? t.classes : null,
          s = 0;
        if (null !== e)
          for (let o = 0; o < e.length; o++) {
            const a = e[o];
            "number" == typeof a
              ? (s = a)
              : 1 == s
              ? (i = Gl(i, a))
              : 2 == s && (r = Gl(r, a + ": " + e[++o] + ";"));
          }
        n ? (t.styles = r) : (t.stylesWithoutHost = r),
          n ? (t.classes = i) : (t.classesWithoutHost = i);
      }
      const _c = new q("INJECTOR", -1);
      class rm {
        get(e, n = as) {
          if (n === as) {
            const r = new Error(`NullInjectorError: No provider for ${te(e)}!`);
            throw ((r.name = "NullInjectorError"), r);
          }
          return n;
        }
      }
      const vc = new q("Set Injector scope."),
        Ds = {},
        bA = {};
      let Dc;
      function im() {
        return void 0 === Dc && (Dc = new rm()), Dc;
      }
      function sm(t, e = null, n = null, r) {
        const i = om(t, e, n, r);
        return i._resolveInjectorDefTypes(), i;
      }
      function om(t, e = null, n = null, r) {
        return new SA(t, n, e || im(), r);
      }
      class SA {
        constructor(e, n, r, i = null) {
          (this.parent = r),
            (this.records = new Map()),
            (this.injectorDefTypes = new Set()),
            (this.onDestroy = new Set()),
            (this._destroyed = !1);
          const s = [];
          n && cn(n, (a) => this.processProvider(a, e, n)),
            cn([e], (a) => this.processInjectorType(a, [], s)),
            this.records.set(_c, ci(void 0, this));
          const o = this.records.get(vc);
          (this.scope = null != o ? o.value : null),
            (this.source = i || ("object" == typeof e ? null : te(e)));
        }
        get destroyed() {
          return this._destroyed;
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            this.onDestroy.forEach((e) => e.ngOnDestroy());
          } finally {
            this.records.clear(),
              this.onDestroy.clear(),
              this.injectorDefTypes.clear();
          }
        }
        get(e, n = as, r = L.Default) {
          this.assertNotDestroyed();
          const i = Ip(this),
            s = Gn(void 0);
          try {
            if (!(r & L.SkipSelf)) {
              let a = this.records.get(e);
              if (void 0 === a) {
                const l =
                  (function PA(t) {
                    return (
                      "function" == typeof t ||
                      ("object" == typeof t && t instanceof q)
                    );
                  })(e) && zl(e);
                (a = l && this.injectableDefInScope(l) ? ci(Cc(e), Ds) : null),
                  this.records.set(e, a);
              }
              if (null != a) return this.hydrate(e, a);
            }
            return (r & L.Self ? im() : this.parent).get(
              e,
              (n = r & L.Optional && n === as ? null : n)
            );
          } catch (o) {
            if ("NullInjectorError" === o.name) {
              if (((o[$o] = o[$o] || []).unshift(te(e)), i)) throw o;
              return (function a0(t, e, n, r) {
                const i = t[$o];
                throw (
                  (e[Tp] && i.unshift(e[Tp]),
                  (t.message = (function l0(t, e, n, r = null) {
                    t =
                      t && "\n" === t.charAt(0) && "\u0275" == t.charAt(1)
                        ? t.substr(2)
                        : t;
                    let i = te(e);
                    if (Array.isArray(e)) i = e.map(te).join(" -> ");
                    else if ("object" == typeof e) {
                      let s = [];
                      for (let o in e)
                        if (e.hasOwnProperty(o)) {
                          let a = e[o];
                          s.push(
                            o +
                              ":" +
                              ("string" == typeof a ? JSON.stringify(a) : te(a))
                          );
                        }
                      i = `{${s.join(", ")}}`;
                    }
                    return `${n}${r ? "(" + r + ")" : ""}[${i}]: ${t.replace(
                      t0,
                      "\n  "
                    )}`;
                  })("\n" + t.message, i, n, r)),
                  (t.ngTokenPath = i),
                  (t[$o] = null),
                  t)
                );
              })(o, e, "R3InjectorError", this.source);
            }
            throw o;
          } finally {
            Gn(s), Ip(i);
          }
        }
        _resolveInjectorDefTypes() {
          this.injectorDefTypes.forEach((e) => this.get(e));
        }
        toString() {
          const e = [];
          return (
            this.records.forEach((r, i) => e.push(te(i))),
            `R3Injector[${e.join(", ")}]`
          );
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new b(205, !1);
        }
        processInjectorType(e, n, r) {
          if (!(e = j(e))) return !1;
          let i = Bh(e);
          const s = (null == i && e.ngModule) || void 0,
            o = void 0 === s ? e : s,
            a = -1 !== r.indexOf(o);
          if ((void 0 !== s && (i = Bh(s)), null == i)) return !1;
          if (null != i.imports && !a) {
            let c;
            r.push(o);
            try {
              cn(i.imports, (d) => {
                this.processInjectorType(d, n, r) &&
                  (void 0 === c && (c = []), c.push(d));
              });
            } finally {
            }
            if (void 0 !== c)
              for (let d = 0; d < c.length; d++) {
                const { ngModule: f, providers: h } = c[d];
                cn(h, (p) => this.processProvider(p, f, h || se));
              }
          }
          this.injectorDefTypes.add(o);
          const l = _r(o) || (() => new o());
          this.records.set(o, ci(l, Ds));
          const u = i.providers;
          if (null != u && !a) {
            const c = e;
            cn(u, (d) => this.processProvider(d, c, u));
          }
          return void 0 !== s && void 0 !== e.providers;
        }
        processProvider(e, n, r) {
          let i = di((e = j(e))) ? e : j(e && e.provide);
          const s = (function MA(t, e, n) {
            return lm(t) ? ci(void 0, t.useValue) : ci(am(t), Ds);
          })(e);
          if (di(e) || !0 !== e.multi) this.records.get(i);
          else {
            let o = this.records.get(i);
            o ||
              ((o = ci(void 0, Ds, !0)),
              (o.factory = () => Au(o.multi)),
              this.records.set(i, o)),
              (i = e),
              o.multi.push(e);
          }
          this.records.set(i, s);
        }
        hydrate(e, n) {
          return (
            n.value === Ds && ((n.value = bA), (n.value = n.factory())),
            "object" == typeof n.value &&
              n.value &&
              (function FA(t) {
                return (
                  null !== t &&
                  "object" == typeof t &&
                  "function" == typeof t.ngOnDestroy
                );
              })(n.value) &&
              this.onDestroy.add(n.value),
            n.value
          );
        }
        injectableDefInScope(e) {
          if (!e.providedIn) return !1;
          const n = j(e.providedIn);
          return "string" == typeof n
            ? "any" === n || n === this.scope
            : this.injectorDefTypes.has(n);
        }
      }
      function Cc(t) {
        const e = zl(t),
          n = null !== e ? e.factory : _r(t);
        if (null !== n) return n;
        if (t instanceof q) throw new b(204, !1);
        if (t instanceof Function)
          return (function AA(t) {
            const e = t.length;
            if (e > 0)
              throw (
                ((function os(t, e) {
                  const n = [];
                  for (let r = 0; r < t; r++) n.push(e);
                  return n;
                })(e, "?"),
                new b(204, !1))
              );
            const n = (function Bw(t) {
              const e = t && (t[Do] || t[jh]);
              if (e) {
                const n = (function jw(t) {
                  if (t.hasOwnProperty("name")) return t.name;
                  const e = ("" + t).match(/^function\s*([^\s(]+)/);
                  return null === e ? "" : e[1];
                })(t);
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`
                  ),
                  e
                );
              }
              return null;
            })(t);
            return null !== n ? () => n.factory(t) : () => new t();
          })(t);
        throw new b(204, !1);
      }
      function am(t, e, n) {
        let r;
        if (di(t)) {
          const i = j(t);
          return _r(i) || Cc(i);
        }
        if (lm(t)) r = () => j(t.useValue);
        else if (
          (function IA(t) {
            return !(!t || !t.useFactory);
          })(t)
        )
          r = () => t.useFactory(...Au(t.deps || []));
        else if (
          (function TA(t) {
            return !(!t || !t.useExisting);
          })(t)
        )
          r = () => T(j(t.useExisting));
        else {
          const i = j(t && (t.useClass || t.provide));
          if (
            !(function xA(t) {
              return !!t.deps;
            })(t)
          )
            return _r(i) || Cc(i);
          r = () => new i(...Au(t.deps));
        }
        return r;
      }
      function ci(t, e, n = !1) {
        return { factory: t, value: e, multi: n ? [] : void 0 };
      }
      function lm(t) {
        return null !== t && "object" == typeof t && r0 in t;
      }
      function di(t) {
        return "function" == typeof t;
      }
      let Qe = (() => {
        class t {
          static create(n, r) {
            var i;
            if (Array.isArray(n)) return sm({ name: "" }, r, n, "");
            {
              const s = null !== (i = n.name) && void 0 !== i ? i : "";
              return sm({ name: s }, n.parent, n.providers, s);
            }
          }
        }
        return (
          (t.THROW_IF_NOT_FOUND = as),
          (t.NULL = new rm()),
          (t.ɵprov = G({ token: t, providedIn: "any", factory: () => T(_c) })),
          (t.__NG_ELEMENT_ID__ = -1),
          t
        );
      })();
      function UA(t, e) {
        Fo(ku(t)[1], Pe());
      }
      function ne(t) {
        let e = (function Dm(t) {
            return Object.getPrototypeOf(t.prototype).constructor;
          })(t.type),
          n = !0;
        const r = [t];
        for (; e; ) {
          let i;
          if (Wt(t)) i = e.ɵcmp || e.ɵdir;
          else {
            if (e.ɵcmp) throw new b(903, "");
            i = e.ɵdir;
          }
          if (i) {
            if (n) {
              r.push(i);
              const o = t;
              (o.inputs = bc(t.inputs)),
                (o.declaredInputs = bc(t.declaredInputs)),
                (o.outputs = bc(t.outputs));
              const a = i.hostBindings;
              a && qA(t, a);
              const l = i.viewQuery,
                u = i.contentQueries;
              if (
                (l && $A(t, l),
                u && GA(t, u),
                $l(t.inputs, i.inputs),
                $l(t.declaredInputs, i.declaredInputs),
                $l(t.outputs, i.outputs),
                Wt(i) && i.data.animation)
              ) {
                const c = t.data;
                c.animation = (c.animation || []).concat(i.data.animation);
              }
            }
            const s = i.features;
            if (s)
              for (let o = 0; o < s.length; o++) {
                const a = s[o];
                a && a.ngInherit && a(t), a === ne && (n = !1);
              }
          }
          e = Object.getPrototypeOf(e);
        }
        !(function HA(t) {
          let e = 0,
            n = null;
          for (let r = t.length - 1; r >= 0; r--) {
            const i = t[r];
            (i.hostVars = e += i.hostVars),
              (i.hostAttrs = ko(i.hostAttrs, (n = ko(n, i.hostAttrs))));
          }
        })(r);
      }
      function bc(t) {
        return t === jr ? {} : t === se ? [] : t;
      }
      function $A(t, e) {
        const n = t.viewQuery;
        t.viewQuery = n
          ? (r, i) => {
              e(r, i), n(r, i);
            }
          : e;
      }
      function GA(t, e) {
        const n = t.contentQueries;
        t.contentQueries = n
          ? (r, i, s) => {
              e(r, i, s), n(r, i, s);
            }
          : e;
      }
      function qA(t, e) {
        const n = t.hostBindings;
        t.hostBindings = n
          ? (r, i) => {
              e(r, i), n(r, i);
            }
          : e;
      }
      let ia = null;
      function fi() {
        if (!ia) {
          const t = re.Symbol;
          if (t && t.iterator) ia = t.iterator;
          else {
            const e = Object.getOwnPropertyNames(Map.prototype);
            for (let n = 0; n < e.length; ++n) {
              const r = e[n];
              "entries" !== r &&
                "size" !== r &&
                Map.prototype[r] === Map.prototype.entries &&
                (ia = r);
            }
          }
        }
        return ia;
      }
      function Cs(t) {
        return (
          !!Sc(t) && (Array.isArray(t) || (!(t instanceof Map) && fi() in t))
        );
      }
      function Sc(t) {
        return null !== t && ("function" == typeof t || "object" == typeof t);
      }
      function gn(t, e, n) {
        return (t[e] = n);
      }
      function Ke(t, e, n) {
        return !Object.is(t[e], n) && ((t[e] = n), !0);
      }
      function mn(t, e, n, r) {
        const i = v();
        return Ke(i, zr(), e) && (J(), pn(De(), i, t, e, n, r)), mn;
      }
      function pi(t, e, n, r) {
        return Ke(t, zr(), n) ? e + k(n) + r : V;
      }
      function Rn(t, e, n, r, i, s, o, a) {
        const l = v(),
          u = J(),
          c = t + 20,
          d = u.firstCreatePass
            ? (function JA(t, e, n, r, i, s, o, a, l) {
                const u = e.consts,
                  c = ai(e, t, 4, o || null, Wn(u, a));
                dc(e, n, c, Wn(u, l)), Fo(e, c);
                const d = (c.tViews = ta(
                  2,
                  c,
                  r,
                  i,
                  s,
                  e.directiveRegistry,
                  e.pipeRegistry,
                  null,
                  e.schemas,
                  u
                ));
                return (
                  null !== e.queries &&
                    (e.queries.template(e, c),
                    (d.queries = e.queries.embeddedTView(c))),
                  c
                );
              })(c, u, l, e, n, r, i, s, o)
            : u.data[c];
        un(d, !1);
        const f = l[U].createComment("");
        Zo(u, l, f, d),
          We(f, l),
          na(l, (l[c] = Zg(f, l, f, d))),
          Ao(d) && uc(u, l, d),
          null != o && cc(l, d, a);
      }
      function oa(t) {
        return qr(
          (function vb() {
            return O.lFrame.contextLView;
          })(),
          20 + t
        );
      }
      function D(t, e = L.Default) {
        const n = v();
        return null === n ? T(t, e) : _p(Pe(), n, j(t), e);
      }
      function Nc() {
        throw new Error("invalid");
      }
      function Ne(t, e, n) {
        const r = v();
        return Ke(r, zr(), e) && mt(J(), De(), r, t, e, r[U], n, !1), Ne;
      }
      function xc(t, e, n, r, i) {
        const o = i ? "class" : "style";
        nm(t, n, e.inputs[o], o, r);
      }
      function I(t, e, n, r) {
        const i = v(),
          s = J(),
          o = 20 + t,
          a = i[U],
          l = (i[o] = Gu(
            a,
            e,
            (function Nb() {
              return O.lFrame.currentNamespace;
            })()
          )),
          u = s.firstCreatePass
            ? (function vM(t, e, n, r, i, s, o) {
                const a = e.consts,
                  u = ai(e, t, 2, i, Wn(a, s));
                return (
                  dc(e, n, u, Wn(a, o)),
                  null !== u.attrs && ra(u, u.attrs, !1),
                  null !== u.mergedAttrs && ra(u, u.mergedAttrs, !0),
                  null !== e.queries && e.queries.elementStart(e, u),
                  u
                );
              })(o, s, i, 0, e, n, r)
            : s.data[o];
        un(u, !0);
        const c = u.mergedAttrs;
        null !== c && Oo(a, l, c);
        const d = u.classes;
        null !== d && Zu(a, l, d);
        const f = u.styles;
        return (
          null !== f && vg(a, l, f),
          64 != (64 & u.flags) && Zo(s, i, l, u),
          0 ===
            (function pb() {
              return O.lFrame.elementDepthCount;
            })() && We(l, i),
          (function gb() {
            O.lFrame.elementDepthCount++;
          })(),
          Ao(u) &&
            (uc(s, i, u),
            (function Lg(t, e, n) {
              if (Xl(e)) {
                const i = e.directiveEnd;
                for (let s = e.directiveStart; s < i; s++) {
                  const o = t.data[s];
                  o.contentQueries && o.contentQueries(1, n[s], s);
                }
              }
            })(s, u, i)),
          null !== r && cc(i, u),
          I
        );
      }
      function M() {
        let t = Pe();
        uu()
          ? (function cu() {
              O.lFrame.isParent = !1;
            })()
          : ((t = t.parent), un(t, !1));
        const e = t;
        !(function mb() {
          O.lFrame.elementDepthCount--;
        })();
        const n = J();
        return (
          n.firstCreatePass && (Fo(n, t), Xl(t) && n.queries.elementEnd(t)),
          null != e.classesWithoutHost &&
            (function Ob(t) {
              return 0 != (16 & t.flags);
            })(e) &&
            xc(n, e, v(), e.classesWithoutHost, !0),
          null != e.stylesWithoutHost &&
            (function kb(t) {
              return 0 != (32 & t.flags);
            })(e) &&
            xc(n, e, v(), e.stylesWithoutHost, !1),
          M
        );
      }
      function Ce(t, e, n, r) {
        return I(t, e, n, r), M(), Ce;
      }
      function Cr() {
        return v();
      }
      function ws(t) {
        return !!t && "function" == typeof t.then;
      }
      const Rc = function Um(t) {
        return !!t && "function" == typeof t.subscribe;
      };
      function Ee(t, e, n, r) {
        const i = v(),
          s = J(),
          o = Pe();
        return (
          (function $m(t, e, n, r, i, s, o, a) {
            const l = Ao(r),
              c = t.firstCreatePass && Xg(t),
              d = e[8],
              f = Jg(e);
            let h = !0;
            if (3 & r.type || a) {
              const y = Rt(r, e),
                _ = a ? a(y) : y,
                m = f.length,
                C = a ? (S) => a(Te(S[r.index])) : r.index;
              if (ve(n)) {
                let S = null;
                if (
                  (!a &&
                    l &&
                    (S = (function CM(t, e, n, r) {
                      const i = t.cleanup;
                      if (null != i)
                        for (let s = 0; s < i.length - 1; s += 2) {
                          const o = i[s];
                          if (o === n && i[s + 1] === r) {
                            const a = e[7],
                              l = i[s + 2];
                            return a.length > l ? a[l] : null;
                          }
                          "string" == typeof o && (s += 2);
                        }
                      return null;
                    })(t, e, i, r.index)),
                  null !== S)
                )
                  ((S.__ngLastListenerFn__ || S).__ngNextListenerFn__ = s),
                    (S.__ngLastListenerFn__ = s),
                    (h = !1);
                else {
                  s = Oc(r, e, d, s, !1);
                  const B = n.listen(_, i, s);
                  f.push(s, B), c && c.push(i, C, m, m + 1);
                }
              } else
                (s = Oc(r, e, d, s, !0)),
                  _.addEventListener(i, s, o),
                  f.push(s),
                  c && c.push(i, C, m, o);
            } else s = Oc(r, e, d, s, !1);
            const p = r.outputs;
            let g;
            if (h && null !== p && (g = p[i])) {
              const y = g.length;
              if (y)
                for (let _ = 0; _ < y; _ += 2) {
                  const pe = e[g[_]][g[_ + 1]].subscribe(s),
                    ye = f.length;
                  f.push(s, pe), c && c.push(i, r.index, ye, -(ye + 1));
                }
            }
          })(s, i, i[U], o, t, e, !!n, r),
          Ee
        );
      }
      function Gm(t, e, n, r) {
        try {
          return !1 !== n(r);
        } catch (i) {
          return tm(t, i), !1;
        }
      }
      function Oc(t, e, n, r, i) {
        return function s(o) {
          if (o === Function) return r;
          const a = 2 & t.flags ? ht(t.index, e) : e;
          0 == (32 & e[2]) && pc(a);
          let l = Gm(e, 0, r, o),
            u = s.__ngNextListenerFn__;
          for (; u; ) (l = Gm(e, 0, u, o) && l), (u = u.__ngNextListenerFn__);
          return i && !1 === l && (o.preventDefault(), (o.returnValue = !1)), l;
        };
      }
      function at(t = 1) {
        return (function bb(t) {
          return (O.lFrame.contextLView = (function Sb(t, e) {
            for (; t > 0; ) (e = e[15]), t--;
            return e;
          })(t, O.lFrame.contextLView))[8];
        })(t);
      }
      function la(t, e, n) {
        return kc(t, "", e, "", n), la;
      }
      function kc(t, e, n, r, i) {
        const s = v(),
          o = pi(s, e, n, r);
        return o !== V && mt(J(), De(), s, t, o, s[U], i, !1), kc;
      }
      function Xm(t, e, n, r, i) {
        const s = t[n + 1],
          o = null === e;
        let a = r ? Kt(s) : Fn(s),
          l = !1;
        for (; 0 !== a && (!1 === l || o); ) {
          const c = t[a + 1];
          MM(t[a], e) && ((l = !0), (t[a + 1] = r ? Xu(c) : Yu(c))),
            (a = r ? Kt(c) : Fn(c));
        }
        l && (t[n + 1] = r ? Yu(s) : Xu(s));
      }
      function MM(t, e) {
        return (
          null === t ||
          null == e ||
          (Array.isArray(t) ? t[1] : t) === e ||
          (!(!Array.isArray(t) || "string" != typeof e) && ei(t, e) >= 0)
        );
      }
      const Oe = { textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0 };
      function ey(t) {
        return t.substring(Oe.key, Oe.keyEnd);
      }
      function ty(t, e) {
        const n = Oe.textEnd;
        return n === e
          ? -1
          : ((e = Oe.keyEnd =
              (function xM(t, e, n) {
                for (; e < n && t.charCodeAt(e) > 32; ) e++;
                return e;
              })(t, (Oe.key = e), n)),
            wi(t, e, n));
      }
      function wi(t, e, n) {
        for (; e < n && t.charCodeAt(e) <= 32; ) e++;
        return e;
      }
      function ua(t, e) {
        return (
          (function Yt(t, e, n, r) {
            const i = v(),
              s = J(),
              o = xn(2);
            s.firstUpdatePass && ly(s, t, o, r),
              e !== V &&
                Ke(i, o, e) &&
                cy(
                  s,
                  s.data[Xe()],
                  i,
                  i[U],
                  t,
                  (i[o + 1] = (function HM(t, e) {
                    return (
                      null == t ||
                        ("string" == typeof e
                          ? (t += e)
                          : "object" == typeof t && (t = te(Zn(t)))),
                      t
                    );
                  })(e, n)),
                  r,
                  o
                );
          })(t, e, null, !0),
          ua
        );
      }
      function _n(t, e) {
        for (
          let n = (function IM(t) {
            return (
              (function ry(t) {
                (Oe.key = 0),
                  (Oe.keyEnd = 0),
                  (Oe.value = 0),
                  (Oe.valueEnd = 0),
                  (Oe.textEnd = t.length);
              })(t),
              ty(t, wi(t, 0, Oe.textEnd))
            );
          })(e);
          n >= 0;
          n = ty(e, n)
        )
          pt(t, ey(e), !0);
      }
      function ay(t, e) {
        return e >= t.expandoStartIndex;
      }
      function ly(t, e, n, r) {
        const i = t.data;
        if (null === i[n + 1]) {
          const s = i[Xe()],
            o = ay(t, n);
          fy(s, r) && null === e && !o && (e = !1),
            (e = (function kM(t, e, n, r) {
              const i = (function fu(t) {
                const e = O.lFrame.currentDirectiveIndex;
                return -1 === e ? null : t[e];
              })(t);
              let s = r ? e.residualClasses : e.residualStyles;
              if (null === i)
                0 === (r ? e.classBindings : e.styleBindings) &&
                  ((n = bs((n = Vc(null, t, e, n, r)), e.attrs, r)),
                  (s = null));
              else {
                const o = e.directiveStylingLast;
                if (-1 === o || t[o] !== i)
                  if (((n = Vc(i, t, e, n, r)), null === s)) {
                    let l = (function VM(t, e, n) {
                      const r = n ? e.classBindings : e.styleBindings;
                      if (0 !== Fn(r)) return t[Kt(r)];
                    })(t, e, r);
                    void 0 !== l &&
                      Array.isArray(l) &&
                      ((l = Vc(null, t, e, l[1], r)),
                      (l = bs(l, e.attrs, r)),
                      (function LM(t, e, n, r) {
                        t[Kt(n ? e.classBindings : e.styleBindings)] = r;
                      })(t, e, r, l));
                  } else
                    s = (function BM(t, e, n) {
                      let r;
                      const i = e.directiveEnd;
                      for (let s = 1 + e.directiveStylingLast; s < i; s++)
                        r = bs(r, t[s].hostAttrs, n);
                      return bs(r, e.attrs, n);
                    })(t, e, r);
              }
              return (
                void 0 !== s &&
                  (r ? (e.residualClasses = s) : (e.residualStyles = s)),
                n
              );
            })(i, s, e, r)),
            (function SM(t, e, n, r, i, s) {
              let o = s ? e.classBindings : e.styleBindings,
                a = Kt(o),
                l = Fn(o);
              t[r] = n;
              let c,
                u = !1;
              if (Array.isArray(n)) {
                const d = n;
                (c = d[1]), (null === c || ei(d, c) > 0) && (u = !0);
              } else c = n;
              if (i)
                if (0 !== l) {
                  const f = Kt(t[a + 1]);
                  (t[r + 1] = Jo(f, a)),
                    0 !== f && (t[f + 1] = Ju(t[f + 1], r)),
                    (t[a + 1] = (function VS(t, e) {
                      return (131071 & t) | (e << 17);
                    })(t[a + 1], r));
                } else
                  (t[r + 1] = Jo(a, 0)),
                    0 !== a && (t[a + 1] = Ju(t[a + 1], r)),
                    (a = r);
              else
                (t[r + 1] = Jo(l, 0)),
                  0 === a ? (a = r) : (t[l + 1] = Ju(t[l + 1], r)),
                  (l = r);
              u && (t[r + 1] = Yu(t[r + 1])),
                Xm(t, c, r, !0),
                Xm(t, c, r, !1),
                (function AM(t, e, n, r, i) {
                  const s = i ? t.residualClasses : t.residualStyles;
                  null != s &&
                    "string" == typeof e &&
                    ei(s, e) >= 0 &&
                    (n[r + 1] = Xu(n[r + 1]));
                })(e, c, t, r, s),
                (o = Jo(a, l)),
                s ? (e.classBindings = o) : (e.styleBindings = o);
            })(i, s, e, n, o, r);
        }
      }
      function Vc(t, e, n, r, i) {
        let s = null;
        const o = n.directiveEnd;
        let a = n.directiveStylingLast;
        for (
          -1 === a ? (a = n.directiveStart) : a++;
          a < o && ((s = e[a]), (r = bs(r, s.hostAttrs, i)), s !== t);

        )
          a++;
        return null !== t && (n.directiveStylingLast = a), r;
      }
      function bs(t, e, n) {
        const r = n ? 1 : 2;
        let i = -1;
        if (null !== e)
          for (let s = 0; s < e.length; s++) {
            const o = e[s];
            "number" == typeof o
              ? (i = o)
              : i === r &&
                (Array.isArray(t) || (t = void 0 === t ? [] : ["", t]),
                pt(t, o, !!n || e[++s]));
          }
        return void 0 === t ? null : t;
      }
      function cy(t, e, n, r, i, s, o, a) {
        if (!(3 & e.type)) return;
        const l = t.data,
          u = l[a + 1];
        ca(
          (function Tg(t) {
            return 1 == (1 & t);
          })(u)
            ? dy(l, e, n, i, Fn(u), o)
            : void 0
        ) ||
          (ca(s) ||
            ((function Mg(t) {
              return 2 == (2 & t);
            })(u) &&
              (s = dy(l, null, n, i, a, o))),
          (function SS(t, e, n, r, i) {
            const s = ve(t);
            if (e)
              i
                ? s
                  ? t.addClass(n, r)
                  : n.classList.add(r)
                : s
                ? t.removeClass(n, r)
                : n.classList.remove(r);
            else {
              let o = -1 === r.indexOf("-") ? void 0 : gt.DashCase;
              if (null == i)
                s ? t.removeStyle(n, r, o) : n.style.removeProperty(r);
              else {
                const a = "string" == typeof i && i.endsWith("!important");
                a && ((i = i.slice(0, -10)), (o |= gt.Important)),
                  s
                    ? t.setStyle(n, r, i, o)
                    : n.style.setProperty(r, i, a ? "important" : "");
              }
            }
          })(r, o, Mo(Xe(), n), i, s));
      }
      function dy(t, e, n, r, i, s) {
        const o = null === e;
        let a;
        for (; i > 0; ) {
          const l = t[i],
            u = Array.isArray(l),
            c = u ? l[1] : l,
            d = null === c;
          let f = n[i + 1];
          f === V && (f = d ? se : void 0);
          let h = d ? wu(f, r) : c === r ? f : void 0;
          if ((u && !ca(h) && (h = wu(l, r)), ca(h) && ((a = h), o))) return a;
          const p = t[i + 1];
          i = o ? Kt(p) : Fn(p);
        }
        if (null !== e) {
          let l = s ? e.residualClasses : e.residualStyles;
          null != l && (a = wu(l, r));
        }
        return a;
      }
      function ca(t) {
        return void 0 !== t;
      }
      function fy(t, e) {
        return 0 != (t.flags & (e ? 16 : 32));
      }
      function Y(t, e = "") {
        const n = v(),
          r = J(),
          i = t + 20,
          s = r.firstCreatePass ? ai(r, i, 1, e, null) : r.data[i],
          o = (n[i] = (function $u(t, e) {
            return ve(t) ? t.createText(e) : t.createTextNode(e);
          })(n[U], e));
        Zo(r, n, o, s), un(s, !1);
      }
      function Er(t) {
        return yt("", t, ""), Er;
      }
      function yt(t, e, n) {
        const r = v(),
          i = pi(r, t, e, n);
        return i !== V && Pn(r, Xe(), i), yt;
      }
      function Cy(t, e, n) {
        !(function Jt(t, e, n, r) {
          const i = J(),
            s = xn(2);
          i.firstUpdatePass && ly(i, null, s, r);
          const o = v();
          if (n !== V && Ke(o, s, n)) {
            const a = i.data[Xe()];
            if (fy(a, r) && !ay(i, s)) {
              let l = r ? a.classesWithoutHost : a.stylesWithoutHost;
              null !== l && (n = Gl(l, n || "")), xc(i, a, o, n, r);
            } else
              !(function UM(t, e, n, r, i, s, o, a) {
                i === V && (i = se);
                let l = 0,
                  u = 0,
                  c = 0 < i.length ? i[0] : null,
                  d = 0 < s.length ? s[0] : null;
                for (; null !== c || null !== d; ) {
                  const f = l < i.length ? i[l + 1] : void 0,
                    h = u < s.length ? s[u + 1] : void 0;
                  let g,
                    p = null;
                  c === d
                    ? ((l += 2), (u += 2), f !== h && ((p = d), (g = h)))
                    : null === d || (null !== c && c < d)
                    ? ((l += 2), (p = c))
                    : ((u += 2), (p = d), (g = h)),
                    null !== p && cy(t, e, n, r, p, g, o, a),
                    (c = l < i.length ? i[l] : null),
                    (d = u < s.length ? s[u] : null);
                }
              })(
                i,
                a,
                o,
                o[U],
                o[s + 1],
                (o[s + 1] = (function jM(t, e, n) {
                  if (null == n || "" === n) return se;
                  const r = [],
                    i = Zn(n);
                  if (Array.isArray(i))
                    for (let s = 0; s < i.length; s++) t(r, i[s], !0);
                  else if ("object" == typeof i)
                    for (const s in i) i.hasOwnProperty(s) && t(r, s, i[s]);
                  else "string" == typeof i && e(r, i);
                  return r;
                })(t, e, n)),
                r,
                s
              );
          }
        })(pt, _n, pi(v(), t, e, n), !0);
      }
      const wr = void 0;
      var aT = [
        "en",
        [["a", "p"], ["AM", "PM"], wr],
        [["AM", "PM"], wr, wr],
        [
          ["S", "M", "T", "W", "T", "F", "S"],
          ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        ],
        wr,
        [
          ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        ],
        wr,
        [
          ["B", "A"],
          ["BC", "AD"],
          ["Before Christ", "Anno Domini"],
        ],
        0,
        [6, 0],
        ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"],
        ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"],
        ["{1}, {0}", wr, "{1} 'at' {0}", wr],
        [
          ".",
          ",",
          ";",
          "%",
          "+",
          "-",
          "E",
          "\xd7",
          "\u2030",
          "\u221e",
          "NaN",
          ":",
        ],
        ["#,##0.###", "#,##0%", "\xa4#,##0.00", "#E0"],
        "USD",
        "$",
        "US Dollar",
        {},
        "ltr",
        function oT(t) {
          const n = Math.floor(Math.abs(t)),
            r = t.toString().replace(/^[^.]*\.?/, "").length;
          return 1 === n && 0 === r ? 1 : 5;
        },
      ];
      let bi = {};
      function tt(t) {
        const e = (function lT(t) {
          return t.toLowerCase().replace(/_/g, "-");
        })(t);
        let n = Ry(e);
        if (n) return n;
        const r = e.split("-")[0];
        if (((n = Ry(r)), n)) return n;
        if ("en" === r) return aT;
        throw new Error(`Missing locale data for the locale "${t}".`);
      }
      function Ry(t) {
        return (
          t in bi ||
            (bi[t] =
              re.ng &&
              re.ng.common &&
              re.ng.common.locales &&
              re.ng.common.locales[t]),
          bi[t]
        );
      }
      var w = (() => (
        ((w = w || {})[(w.LocaleId = 0)] = "LocaleId"),
        (w[(w.DayPeriodsFormat = 1)] = "DayPeriodsFormat"),
        (w[(w.DayPeriodsStandalone = 2)] = "DayPeriodsStandalone"),
        (w[(w.DaysFormat = 3)] = "DaysFormat"),
        (w[(w.DaysStandalone = 4)] = "DaysStandalone"),
        (w[(w.MonthsFormat = 5)] = "MonthsFormat"),
        (w[(w.MonthsStandalone = 6)] = "MonthsStandalone"),
        (w[(w.Eras = 7)] = "Eras"),
        (w[(w.FirstDayOfWeek = 8)] = "FirstDayOfWeek"),
        (w[(w.WeekendRange = 9)] = "WeekendRange"),
        (w[(w.DateFormat = 10)] = "DateFormat"),
        (w[(w.TimeFormat = 11)] = "TimeFormat"),
        (w[(w.DateTimeFormat = 12)] = "DateTimeFormat"),
        (w[(w.NumberSymbols = 13)] = "NumberSymbols"),
        (w[(w.NumberFormats = 14)] = "NumberFormats"),
        (w[(w.CurrencyCode = 15)] = "CurrencyCode"),
        (w[(w.CurrencySymbol = 16)] = "CurrencySymbol"),
        (w[(w.CurrencyName = 17)] = "CurrencyName"),
        (w[(w.Currencies = 18)] = "Currencies"),
        (w[(w.Directionality = 19)] = "Directionality"),
        (w[(w.PluralCase = 20)] = "PluralCase"),
        (w[(w.ExtraData = 21)] = "ExtraData"),
        w
      ))();
      const da = "en-US";
      let Oy = da;
      function jc(t, e, n, r, i) {
        if (((t = j(t)), Array.isArray(t)))
          for (let s = 0; s < t.length; s++) jc(t[s], e, n, r, i);
        else {
          const s = J(),
            o = v();
          let a = di(t) ? t : j(t.provide),
            l = am(t);
          const u = Pe(),
            c = 1048575 & u.providerIndexes,
            d = u.directiveStart,
            f = u.providerIndexes >> 20;
          if (di(t) || !t.multi) {
            const h = new Xi(l, i, D),
              p = Hc(a, e, i ? c : c + f, d);
            -1 === p
              ? (Bo(ts(u, o), s, a),
                Uc(s, t, e.length),
                e.push(a),
                u.directiveStart++,
                u.directiveEnd++,
                i && (u.providerIndexes += 1048576),
                n.push(h),
                o.push(h))
              : ((n[p] = h), (o[p] = h));
          } else {
            const h = Hc(a, e, c + f, d),
              p = Hc(a, e, c, c + f),
              g = h >= 0 && n[h],
              y = p >= 0 && n[p];
            if ((i && !y) || (!i && !g)) {
              Bo(ts(u, o), s, a);
              const _ = (function oI(t, e, n, r, i) {
                const s = new Xi(t, n, D);
                return (
                  (s.multi = []),
                  (s.index = e),
                  (s.componentProviders = 0),
                  s_(s, i, r && !n),
                  s
                );
              })(i ? sI : iI, n.length, i, r, l);
              !i && y && (n[p].providerFactory = _),
                Uc(s, t, e.length, 0),
                e.push(a),
                u.directiveStart++,
                u.directiveEnd++,
                i && (u.providerIndexes += 1048576),
                n.push(_),
                o.push(_);
            } else Uc(s, t, h > -1 ? h : p, s_(n[i ? p : h], l, !i && r));
            !i && r && y && n[p].componentProviders++;
          }
        }
      }
      function Uc(t, e, n, r) {
        const i = di(e),
          s = (function NA(t) {
            return !!t.useClass;
          })(e);
        if (i || s) {
          const l = (s ? j(e.useClass) : e).prototype.ngOnDestroy;
          if (l) {
            const u = t.destroyHooks || (t.destroyHooks = []);
            if (!i && e.multi) {
              const c = u.indexOf(n);
              -1 === c ? u.push(n, [r, l]) : u[c + 1].push(r, l);
            } else u.push(n, l);
          }
        }
      }
      function s_(t, e, n) {
        return n && t.componentProviders++, t.multi.push(e) - 1;
      }
      function Hc(t, e, n, r) {
        for (let i = n; i < r; i++) if (e[i] === t) return i;
        return -1;
      }
      function iI(t, e, n, r) {
        return $c(this.multi, []);
      }
      function sI(t, e, n, r) {
        const i = this.multi;
        let s;
        if (this.providerFactory) {
          const o = this.providerFactory.componentProviders,
            a = ns(n, n[1], this.providerFactory.index, r);
          (s = a.slice(0, o)), $c(i, s);
          for (let l = o; l < a.length; l++) s.push(a[l]);
        } else (s = []), $c(i, s);
        return s;
      }
      function $c(t, e) {
        for (let n = 0; n < t.length; n++) e.push((0, t[n])());
        return e;
      }
      function he(t, e = []) {
        return (n) => {
          n.providersResolver = (r, i) =>
            (function rI(t, e, n) {
              const r = J();
              if (r.firstCreatePass) {
                const i = Wt(t);
                jc(n, r.data, r.blueprint, i, !0),
                  jc(e, r.data, r.blueprint, i, !1);
              }
            })(r, i ? i(t) : t, e);
        };
      }
      class o_ {}
      class uI {
        resolveComponentFactory(e) {
          throw (function lI(t) {
            const e = Error(
              `No component factory found for ${te(
                t
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (e.ngComponent = t), e;
          })(e);
        }
      }
      let Ai = (() => {
        class t {}
        return (t.NULL = new uI()), t;
      })();
      function cI() {
        return Mi(Pe(), v());
      }
      function Mi(t, e) {
        return new _t(Rt(t, e));
      }
      let _t = (() => {
        class t {
          constructor(n) {
            this.nativeElement = n;
          }
        }
        return (t.__NG_ELEMENT_ID__ = cI), t;
      })();
      class Is {}
      let On = (() => {
          class t {}
          return (
            (t.__NG_ELEMENT_ID__ = () =>
              (function hI() {
                const t = v(),
                  n = ht(Pe().index, t);
                return (function fI(t) {
                  return t[U];
                })(ln(n) ? n : t);
              })()),
            t
          );
        })(),
        pI = (() => {
          class t {}
          return (
            (t.ɵprov = G({
              token: t,
              providedIn: "root",
              factory: () => null,
            })),
            t
          );
        })();
      class Ns {
        constructor(e) {
          (this.full = e),
            (this.major = e.split(".")[0]),
            (this.minor = e.split(".")[1]),
            (this.patch = e.split(".").slice(2).join("."));
        }
      }
      const gI = new Ns("13.2.4"),
        Gc = {};
      function ma(t, e, n, r, i = !1) {
        for (; null !== n; ) {
          const s = e[n.index];
          if ((null !== s && r.push(Te(s)), zt(s)))
            for (let a = 10; a < s.length; a++) {
              const l = s[a],
                u = l[1].firstChild;
              null !== u && ma(l[1], l, u, r);
            }
          const o = n.type;
          if (8 & o) ma(t, e, n.child, r);
          else if (32 & o) {
            const a = ju(n, e);
            let l;
            for (; (l = a()); ) r.push(l);
          } else if (16 & o) {
            const a = mg(e, n);
            if (Array.isArray(a)) r.push(...a);
            else {
              const l = ms(e[16]);
              ma(l[1], l, a, r, !0);
            }
          }
          n = i ? n.projectionNext : n.next;
        }
        return r;
      }
      class xs {
        constructor(e, n) {
          (this._lView = e),
            (this._cdRefInjectingView = n),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get rootNodes() {
          const e = this._lView,
            n = e[1];
          return ma(n, e, n.firstChild, []);
        }
        get context() {
          return this._lView[8];
        }
        set context(e) {
          this._lView[8] = e;
        }
        get destroyed() {
          return 256 == (256 & this._lView[2]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const e = this._lView[3];
            if (zt(e)) {
              const n = e[8],
                r = n ? n.indexOf(this) : -1;
              r > -1 && (qu(e, r), Uo(n, r));
            }
            this._attachedToViewContainer = !1;
          }
          ag(this._lView[1], this._lView);
        }
        onDestroy(e) {
          !(function Hg(t, e, n, r) {
            const i = Jg(e);
            null === n
              ? i.push(r)
              : (i.push(n), t.firstCreatePass && Xg(t).push(r, i.length - 1));
          })(this._lView[1], this._lView, null, e);
        }
        markForCheck() {
          pc(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[2] &= -129;
        }
        reattach() {
          this._lView[2] |= 128;
        }
        detectChanges() {
          mc(this._lView[1], this._lView, this.context);
        }
        checkNoChanges() {
          !(function vA(t, e, n) {
            Io(!0);
            try {
              mc(t, e, n);
            } finally {
              Io(!1);
            }
          })(this._lView[1], this._lView, this.context);
        }
        attachToViewContainerRef() {
          if (this._appRef) throw new b(902, "");
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function gS(t, e) {
              ys(t, e, e[U], 2, null, null);
            })(this._lView[1], this._lView);
        }
        attachToAppRef(e) {
          if (this._attachedToViewContainer) throw new b(902, "");
          this._appRef = e;
        }
      }
      class mI extends xs {
        constructor(e) {
          super(e), (this._view = e);
        }
        detectChanges() {
          Yg(this._view);
        }
        checkNoChanges() {
          !(function DA(t) {
            Io(!0);
            try {
              Yg(t);
            } finally {
              Io(!1);
            }
          })(this._view);
        }
        get context() {
          return null;
        }
      }
      class l_ extends Ai {
        constructor(e) {
          super(), (this.ngModule = e);
        }
        resolveComponentFactory(e) {
          const n = Ge(e);
          return new qc(n, this.ngModule);
        }
      }
      function u_(t) {
        const e = [];
        for (let n in t)
          t.hasOwnProperty(n) && e.push({ propName: t[n], templateName: n });
        return e;
      }
      const _I = new q("SCHEDULER_TOKEN", {
        providedIn: "root",
        factory: () => Xp,
      });
      class qc extends o_ {
        constructor(e, n) {
          super(),
            (this.componentDef = e),
            (this.ngModule = n),
            (this.componentType = e.type),
            (this.selector = (function OS(t) {
              return t.map(RS).join(",");
            })(e.selectors)),
            (this.ngContentSelectors = e.ngContentSelectors
              ? e.ngContentSelectors
              : []),
            (this.isBoundToModule = !!n);
        }
        get inputs() {
          return u_(this.componentDef.inputs);
        }
        get outputs() {
          return u_(this.componentDef.outputs);
        }
        create(e, n, r, i) {
          const s = (i = i || this.ngModule)
              ? (function vI(t, e) {
                  return {
                    get: (n, r, i) => {
                      const s = t.get(n, Gc, i);
                      return s !== Gc || r === Gc ? s : e.get(n, r, i);
                    },
                  };
                })(e, i.injector)
              : e,
            o = s.get(Is, Yh),
            a = s.get(pI, null),
            l = o.createRenderer(null, this.componentDef),
            u = this.componentDef.selectors[0][0] || "div",
            c = r
              ? (function Ug(t, e, n) {
                  if (ve(t)) return t.selectRootElement(e, n === $t.ShadowDom);
                  let r = "string" == typeof e ? t.querySelector(e) : e;
                  return (r.textContent = ""), r;
                })(l, r, this.componentDef.encapsulation)
              : Gu(
                  o.createRenderer(null, this.componentDef),
                  u,
                  (function yI(t) {
                    const e = t.toLowerCase();
                    return "svg" === e ? "svg" : "math" === e ? "math" : null;
                  })(u)
                ),
            d = this.componentDef.onPush ? 576 : 528,
            f = (function vm(t, e) {
              return {
                components: [],
                scheduler: t || Xp,
                clean: CA,
                playerHandler: e || null,
                flags: 0,
              };
            })(),
            h = ta(0, null, null, 1, 0, null, null, null, null, null),
            p = _s(null, h, f, d, null, null, o, l, a, s);
          let g, y;
          No(p);
          try {
            const _ = (function ym(t, e, n, r, i, s) {
              const o = n[1];
              n[20] = t;
              const l = ai(o, 20, 2, "#host", null),
                u = (l.mergedAttrs = e.hostAttrs);
              null !== u &&
                (ra(l, u, !0),
                null !== t &&
                  (Oo(i, t, u),
                  null !== l.classes && Zu(i, t, l.classes),
                  null !== l.styles && vg(i, t, l.styles)));
              const c = r.createRenderer(t, e),
                d = _s(
                  n,
                  Bg(e),
                  null,
                  e.onPush ? 64 : 16,
                  n[20],
                  l,
                  r,
                  c,
                  s || null,
                  null
                );
              return (
                o.firstCreatePass &&
                  (Bo(ts(l, n), o, e.type), Wg(o, l), Qg(l, n.length, 1)),
                na(n, d),
                (n[20] = d)
              );
            })(c, this.componentDef, p, o, l);
            if (c)
              if (r) Oo(l, c, ["ng-version", gI.full]);
              else {
                const { attrs: m, classes: C } = (function kS(t) {
                  const e = [],
                    n = [];
                  let r = 1,
                    i = 2;
                  for (; r < t.length; ) {
                    let s = t[r];
                    if ("string" == typeof s)
                      2 === i
                        ? "" !== s && e.push(s, t[++r])
                        : 8 === i && n.push(s);
                    else {
                      if (!Qt(i)) break;
                      i = s;
                    }
                    r++;
                  }
                  return { attrs: e, classes: n };
                })(this.componentDef.selectors[0]);
                m && Oo(l, c, m), C && C.length > 0 && Zu(l, c, C.join(" "));
              }
            if (((y = ou(h, 20)), void 0 !== n)) {
              const m = (y.projection = []);
              for (let C = 0; C < this.ngContentSelectors.length; C++) {
                const S = n[C];
                m.push(null != S ? Array.from(S) : null);
              }
            }
            (g = (function _m(t, e, n, r, i) {
              const s = n[1],
                o = (function rA(t, e, n) {
                  const r = Pe();
                  t.firstCreatePass &&
                    (n.providersResolver && n.providersResolver(n),
                    Kg(t, r, e, li(t, e, 1, null), n));
                  const i = ns(e, t, r.directiveStart, r);
                  We(i, e);
                  const s = Rt(r, e);
                  return s && We(s, e), i;
                })(s, n, e);
              if (
                (r.components.push(o),
                (t[8] = o),
                i && i.forEach((l) => l(o, e)),
                e.contentQueries)
              ) {
                const l = Pe();
                e.contentQueries(1, o, l.directiveStart);
              }
              const a = Pe();
              return (
                !s.firstCreatePass ||
                  (null === e.hostBindings && null === e.hostAttrs) ||
                  (Qn(a.index),
                  qg(n[1], a, 0, a.directiveStart, a.directiveEnd, e),
                  zg(e, o)),
                o
              );
            })(_, this.componentDef, p, f, [UA])),
              vs(h, p, null);
          } finally {
            xo();
          }
          return new CI(this.componentType, g, Mi(y, p), p, y);
        }
      }
      class CI extends class aI {} {
        constructor(e, n, r, i, s) {
          super(),
            (this.location = r),
            (this._rootLView = i),
            (this._tNode = s),
            (this.instance = n),
            (this.hostView = this.changeDetectorRef = new mI(i)),
            (this.componentType = e);
        }
        get injector() {
          return new Kr(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(e) {
          this.hostView.onDestroy(e);
        }
      }
      class kn {}
      class c_ {}
      const Ti = new Map();
      class h_ extends kn {
        constructor(e, n) {
          super(),
            (this._parent = n),
            (this._bootstrapComponents = []),
            (this.injector = this),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new l_(this));
          const r = Nt(e);
          (this._bootstrapComponents = hn(r.bootstrap)),
            (this._r3Injector = om(
              e,
              n,
              [
                { provide: kn, useValue: this },
                { provide: Ai, useValue: this.componentFactoryResolver },
              ],
              te(e)
            )),
            this._r3Injector._resolveInjectorDefTypes(),
            (this.instance = this.get(e));
        }
        get(e, n = Qe.THROW_IF_NOT_FOUND, r = L.Default) {
          return e === Qe || e === kn || e === _c
            ? this
            : this._r3Injector.get(e, n, r);
        }
        destroy() {
          const e = this._r3Injector;
          !e.destroyed && e.destroy(),
            this.destroyCbs.forEach((n) => n()),
            (this.destroyCbs = null);
        }
        onDestroy(e) {
          this.destroyCbs.push(e);
        }
      }
      class zc extends c_ {
        constructor(e) {
          super(),
            (this.moduleType = e),
            null !== Nt(e) &&
              (function wI(t) {
                const e = new Set();
                !(function n(r) {
                  const i = Nt(r, !0),
                    s = i.id;
                  null !== s &&
                    ((function d_(t, e, n) {
                      if (e && e !== n)
                        throw new Error(
                          `Duplicate module registered for ${t} - ${te(
                            e
                          )} vs ${te(e.name)}`
                        );
                    })(s, Ti.get(s), r),
                    Ti.set(s, r));
                  const o = hn(i.imports);
                  for (const a of o) e.has(a) || (e.add(a), n(a));
                })(t);
              })(e);
        }
        create(e) {
          return new h_(this.moduleType, e);
        }
      }
      function br(t, e, n, r) {
        return p_(v(), Je(), t, e, n, r);
      }
      function Fs(t, e) {
        const n = t[e];
        return n === V ? void 0 : n;
      }
      function p_(t, e, n, r, i, s) {
        const o = e + n;
        return Ke(t, o, i)
          ? gn(t, o + 1, s ? r.call(s, i) : r(i))
          : Fs(t, o + 1);
      }
      function g_(t, e, n, r, i, s, o) {
        const a = e + n;
        return (function Dr(t, e, n, r) {
          const i = Ke(t, e, n);
          return Ke(t, e + 1, r) || i;
        })(t, a, i, s)
          ? gn(t, a + 2, o ? r.call(o, i, s) : r(i, s))
          : Fs(t, a + 2);
      }
      function Ps(t, e) {
        const n = J();
        let r;
        const i = t + 20;
        n.firstCreatePass
          ? ((r = (function PI(t, e) {
              if (e)
                for (let n = e.length - 1; n >= 0; n--) {
                  const r = e[n];
                  if (t === r.name) return r;
                }
            })(e, n.pipeRegistry)),
            (n.data[i] = r),
            r.onDestroy &&
              (n.destroyHooks || (n.destroyHooks = [])).push(i, r.onDestroy))
          : (r = n.data[i]);
        const s = r.factory || (r.factory = _r(r.type)),
          o = Gn(D);
        try {
          const a = Vo(!1),
            l = s();
          return (
            Vo(a),
            (function XA(t, e, n, r) {
              n >= t.data.length &&
                ((t.data[n] = null), (t.blueprint[n] = null)),
                (e[n] = r);
            })(n, v(), i, l),
            l
          );
        } finally {
          Gn(o);
        }
      }
      function Wc(t, e, n) {
        const r = t + 20,
          i = v(),
          s = qr(i, r);
        return Rs(i, r) ? p_(i, Je(), e, s.transform, n, s) : s.transform(n);
      }
      function Qc(t, e, n, r) {
        const i = t + 20,
          s = v(),
          o = qr(s, i);
        return Rs(s, i)
          ? g_(s, Je(), e, o.transform, n, r, o)
          : o.transform(n, r);
      }
      function Rs(t, e) {
        return t[1].data[e].pure;
      }
      function Kc(t) {
        return (e) => {
          setTimeout(t, void 0, e);
        };
      }
      const be = class VI extends on {
        constructor(e = !1) {
          super(), (this.__isAsync = e);
        }
        emit(e) {
          super.next(e);
        }
        subscribe(e, n, r) {
          var i, s, o;
          let a = e,
            l = n || (() => null),
            u = r;
          if (e && "object" == typeof e) {
            const d = e;
            (a = null === (i = d.next) || void 0 === i ? void 0 : i.bind(d)),
              (l = null === (s = d.error) || void 0 === s ? void 0 : s.bind(d)),
              (u =
                null === (o = d.complete) || void 0 === o ? void 0 : o.bind(d));
          }
          this.__isAsync && ((l = Kc(l)), a && (a = Kc(a)), u && (u = Kc(u)));
          const c = super.subscribe({ next: a, error: l, complete: u });
          return e instanceof Mt && e.add(c), c;
        }
      };
      Symbol;
      let Vn = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = UI), t;
      })();
      const BI = Vn,
        jI = class extends BI {
          constructor(e, n, r) {
            super(),
              (this._declarationLView = e),
              (this._declarationTContainer = n),
              (this.elementRef = r);
          }
          createEmbeddedView(e) {
            const n = this._declarationTContainer.tViews,
              r = _s(
                this._declarationLView,
                n,
                e,
                16,
                null,
                n.declTNode,
                null,
                null,
                null,
                null
              );
            r[17] = this._declarationLView[this._declarationTContainer.index];
            const s = this._declarationLView[19];
            return (
              null !== s && (r[19] = s.createEmbeddedView(n)),
              vs(n, r, e),
              new xs(r)
            );
          }
        };
      function UI() {
        return (function ya(t, e) {
          return 4 & t.type ? new jI(e, t, Mi(t, e)) : null;
        })(Pe(), v());
      }
      let Xt = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = HI), t;
      })();
      function HI() {
        return (function C_(t, e) {
          let n;
          const r = e[t.index];
          if (zt(r)) n = r;
          else {
            let i;
            if (8 & t.type) i = Te(r);
            else {
              const s = e[U];
              i = s.createComment("");
              const o = Rt(t, e);
              vr(
                s,
                Ko(s, o),
                i,
                (function ES(t, e) {
                  return ve(t) ? t.nextSibling(e) : e.nextSibling;
                })(s, o),
                !1
              );
            }
            (e[t.index] = n = Zg(r, e, i, t)), na(e, n);
          }
          return new v_(n, t, e);
        })(Pe(), v());
      }
      const $I = Xt,
        v_ = class extends $I {
          constructor(e, n, r) {
            super(),
              (this._lContainer = e),
              (this._hostTNode = n),
              (this._hostLView = r);
          }
          get element() {
            return Mi(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new Kr(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const e = Lo(this._hostTNode, this._hostLView);
            if (hp(e)) {
              const n = Qr(e, this._hostLView),
                r = Wr(e);
              return new Kr(n[1].data[r + 8], n);
            }
            return new Kr(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(e) {
            const n = D_(this._lContainer);
            return (null !== n && n[e]) || null;
          }
          get length() {
            return this._lContainer.length - 10;
          }
          createEmbeddedView(e, n, r) {
            const i = e.createEmbeddedView(n || {});
            return this.insert(i, r), i;
          }
          createComponent(e, n, r, i, s) {
            const o =
              e &&
              !(function ss(t) {
                return "function" == typeof t;
              })(e);
            let a;
            if (o) a = n;
            else {
              const d = n || {};
              (a = d.index),
                (r = d.injector),
                (i = d.projectableNodes),
                (s = d.ngModuleRef);
            }
            const l = o ? e : new qc(Ge(e)),
              u = r || this.parentInjector;
            if (!s && null == l.ngModule) {
              const f = (o ? u : this.parentInjector).get(kn, null);
              f && (s = f);
            }
            const c = l.create(u, i, void 0, s);
            return this.insert(c.hostView, a), c;
          }
          insert(e, n) {
            const r = e._lView,
              i = r[1];
            if (
              (function hb(t) {
                return zt(t[3]);
              })(r)
            ) {
              const c = this.indexOf(e);
              if (-1 !== c) this.detach(c);
              else {
                const d = r[3],
                  f = new v_(d, d[6], d[3]);
                f.detach(f.indexOf(e));
              }
            }
            const s = this._adjustIndex(n),
              o = this._lContainer;
            !(function yS(t, e, n, r) {
              const i = 10 + r,
                s = n.length;
              r > 0 && (n[i - 1][4] = e),
                r < s - 10
                  ? ((e[4] = n[i]), wp(n, 10 + r, e))
                  : (n.push(e), (e[4] = null)),
                (e[3] = n);
              const o = e[17];
              null !== o &&
                n !== o &&
                (function _S(t, e) {
                  const n = t[9];
                  e[16] !== e[3][3][16] && (t[2] = !0),
                    null === n ? (t[9] = [e]) : n.push(e);
                })(o, e);
              const a = e[19];
              null !== a && a.insertView(t), (e[2] |= 128);
            })(i, r, o, s);
            const a = Qu(s, o),
              l = r[U],
              u = Ko(l, o[7]);
            return (
              null !== u &&
                (function pS(t, e, n, r, i, s) {
                  (r[0] = i), (r[6] = e), ys(t, r, n, 1, i, s);
                })(i, o[6], l, r, u, a),
              e.attachToViewContainerRef(),
              wp(Yc(o), s, e),
              e
            );
          }
          move(e, n) {
            return this.insert(e, n);
          }
          indexOf(e) {
            const n = D_(this._lContainer);
            return null !== n ? n.indexOf(e) : -1;
          }
          remove(e) {
            const n = this._adjustIndex(e, -1),
              r = qu(this._lContainer, n);
            r && (Uo(Yc(this._lContainer), n), ag(r[1], r));
          }
          detach(e) {
            const n = this._adjustIndex(e, -1),
              r = qu(this._lContainer, n);
            return r && null != Uo(Yc(this._lContainer), n) ? new xs(r) : null;
          }
          _adjustIndex(e, n = 0) {
            return null == e ? this.length + n : e;
          }
        };
      function D_(t) {
        return t[8];
      }
      function Yc(t) {
        return t[8] || (t[8] = []);
      }
      function Da(...t) {}
      const Ca = new q("Application Initializer");
      let Ni = (() => {
        class t {
          constructor(n) {
            (this.appInits = n),
              (this.resolve = Da),
              (this.reject = Da),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((r, i) => {
                (this.resolve = r), (this.reject = i);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const n = [],
              r = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let i = 0; i < this.appInits.length; i++) {
                const s = this.appInits[i]();
                if (ws(s)) n.push(s);
                else if (Rc(s)) {
                  const o = new Promise((a, l) => {
                    s.subscribe({ complete: a, error: l });
                  });
                  n.push(o);
                }
              }
            Promise.all(n)
              .then(() => {
                r();
              })
              .catch((i) => {
                this.reject(i);
              }),
              0 === n.length && r(),
              (this.initialized = !0);
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(T(Ca, 8));
          }),
          (t.ɵprov = G({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const ks = new q("AppId"),
        y1 = {
          provide: ks,
          useFactory: function m1() {
            return `${dd()}${dd()}${dd()}`;
          },
          deps: [],
        };
      function dd() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const $_ = new q("Platform Initializer"),
        fd = new q("Platform ID"),
        G_ = new q("appBootstrapListener");
      let q_ = (() => {
        class t {
          log(n) {
            console.log(n);
          }
          warn(n) {
            console.warn(n);
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)();
          }),
          (t.ɵprov = G({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const Xn = new q("LocaleId"),
        z_ = new q("DefaultCurrencyCode");
      class _1 {
        constructor(e, n) {
          (this.ngModuleFactory = e), (this.componentFactories = n);
        }
      }
      let Ea = (() => {
        class t {
          compileModuleSync(n) {
            return new zc(n);
          }
          compileModuleAsync(n) {
            return Promise.resolve(this.compileModuleSync(n));
          }
          compileModuleAndAllComponentsSync(n) {
            const r = this.compileModuleSync(n),
              s = hn(Nt(n).declarations).reduce((o, a) => {
                const l = Ge(a);
                return l && o.push(new qc(l)), o;
              }, []);
            return new _1(r, s);
          }
          compileModuleAndAllComponentsAsync(n) {
            return Promise.resolve(this.compileModuleAndAllComponentsSync(n));
          }
          clearCache() {}
          clearCacheFor(n) {}
          getModuleId(n) {}
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)();
          }),
          (t.ɵprov = G({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const D1 = (() => Promise.resolve(0))();
      function hd(t) {
        "undefined" == typeof Zone
          ? D1.then(() => {
              t && t.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", t);
      }
      class Ae {
        constructor({
          enableLongStackTrace: e = !1,
          shouldCoalesceEventChangeDetection: n = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new be(!1)),
            (this.onMicrotaskEmpty = new be(!1)),
            (this.onStable = new be(!1)),
            (this.onError = new be(!1)),
            "undefined" == typeof Zone)
          )
            throw new Error("In this configuration Angular requires Zone.js");
          Zone.assertZonePatched();
          const i = this;
          (i._nesting = 0),
            (i._outer = i._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (i._inner = i._inner.fork(new Zone.TaskTrackingZoneSpec())),
            e &&
              Zone.longStackTraceZoneSpec &&
              (i._inner = i._inner.fork(Zone.longStackTraceZoneSpec)),
            (i.shouldCoalesceEventChangeDetection = !r && n),
            (i.shouldCoalesceRunChangeDetection = r),
            (i.lastRequestAnimationFrameId = -1),
            (i.nativeRequestAnimationFrame = (function C1() {
              let t = re.requestAnimationFrame,
                e = re.cancelAnimationFrame;
              if ("undefined" != typeof Zone && t && e) {
                const n = t[Zone.__symbol__("OriginalDelegate")];
                n && (t = n);
                const r = e[Zone.__symbol__("OriginalDelegate")];
                r && (e = r);
              }
              return {
                nativeRequestAnimationFrame: t,
                nativeCancelAnimationFrame: e,
              };
            })().nativeRequestAnimationFrame),
            (function b1(t) {
              const e = () => {
                !(function w1(t) {
                  t.isCheckStableRunning ||
                    -1 !== t.lastRequestAnimationFrameId ||
                    ((t.lastRequestAnimationFrameId =
                      t.nativeRequestAnimationFrame.call(re, () => {
                        t.fakeTopEventTask ||
                          (t.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (t.lastRequestAnimationFrameId = -1),
                                gd(t),
                                (t.isCheckStableRunning = !0),
                                pd(t),
                                (t.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          t.fakeTopEventTask.invoke();
                      })),
                    gd(t));
                })(t);
              };
              t._inner = t._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, i, s, o, a) => {
                  try {
                    return W_(t), n.invokeTask(i, s, o, a);
                  } finally {
                    ((t.shouldCoalesceEventChangeDetection &&
                      "eventTask" === s.type) ||
                      t.shouldCoalesceRunChangeDetection) &&
                      e(),
                      Q_(t);
                  }
                },
                onInvoke: (n, r, i, s, o, a, l) => {
                  try {
                    return W_(t), n.invoke(i, s, o, a, l);
                  } finally {
                    t.shouldCoalesceRunChangeDetection && e(), Q_(t);
                  }
                },
                onHasTask: (n, r, i, s) => {
                  n.hasTask(i, s),
                    r === i &&
                      ("microTask" == s.change
                        ? ((t._hasPendingMicrotasks = s.microTask),
                          gd(t),
                          pd(t))
                        : "macroTask" == s.change &&
                          (t.hasPendingMacrotasks = s.macroTask));
                },
                onHandleError: (n, r, i, s) => (
                  n.handleError(i, s),
                  t.runOutsideAngular(() => t.onError.emit(s)),
                  !1
                ),
              });
            })(i);
        }
        static isInAngularZone() {
          return (
            "undefined" != typeof Zone &&
            !0 === Zone.current.get("isAngularZone")
          );
        }
        static assertInAngularZone() {
          if (!Ae.isInAngularZone())
            throw new Error("Expected to be in Angular Zone, but it is not!");
        }
        static assertNotInAngularZone() {
          if (Ae.isInAngularZone())
            throw new Error("Expected to not be in Angular Zone, but it is!");
        }
        run(e, n, r) {
          return this._inner.run(e, n, r);
        }
        runTask(e, n, r, i) {
          const s = this._inner,
            o = s.scheduleEventTask("NgZoneEvent: " + i, e, E1, Da, Da);
          try {
            return s.runTask(o, n, r);
          } finally {
            s.cancelTask(o);
          }
        }
        runGuarded(e, n, r) {
          return this._inner.runGuarded(e, n, r);
        }
        runOutsideAngular(e) {
          return this._outer.run(e);
        }
      }
      const E1 = {};
      function pd(t) {
        if (0 == t._nesting && !t.hasPendingMicrotasks && !t.isStable)
          try {
            t._nesting++, t.onMicrotaskEmpty.emit(null);
          } finally {
            if ((t._nesting--, !t.hasPendingMicrotasks))
              try {
                t.runOutsideAngular(() => t.onStable.emit(null));
              } finally {
                t.isStable = !0;
              }
          }
      }
      function gd(t) {
        t.hasPendingMicrotasks = !!(
          t._hasPendingMicrotasks ||
          ((t.shouldCoalesceEventChangeDetection ||
            t.shouldCoalesceRunChangeDetection) &&
            -1 !== t.lastRequestAnimationFrameId)
        );
      }
      function W_(t) {
        t._nesting++,
          t.isStable && ((t.isStable = !1), t.onUnstable.emit(null));
      }
      function Q_(t) {
        t._nesting--, pd(t);
      }
      class S1 {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new be()),
            (this.onMicrotaskEmpty = new be()),
            (this.onStable = new be()),
            (this.onError = new be());
        }
        run(e, n, r) {
          return e.apply(n, r);
        }
        runGuarded(e, n, r) {
          return e.apply(n, r);
        }
        runOutsideAngular(e) {
          return e();
        }
        runTask(e, n, r, i) {
          return e.apply(n, r);
        }
      }
      let md = (() => {
          class t {
            constructor(n) {
              (this._ngZone = n),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                this._watchAngularEvents(),
                n.run(() => {
                  this.taskTrackingZone =
                    "undefined" == typeof Zone
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      Ae.assertNotInAngularZone(),
                        hd(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                hd(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let n = this._callbacks.pop();
                    clearTimeout(n.timeoutId), n.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let n = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (r) =>
                    !r.updateCb ||
                    !r.updateCb(n) ||
                    (clearTimeout(r.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((n) => ({
                    source: n.source,
                    creationLocation: n.creationLocation,
                    data: n.data,
                  }))
                : [];
            }
            addCallback(n, r, i) {
              let s = -1;
              r &&
                r > 0 &&
                (s = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (o) => o.timeoutId !== s
                  )),
                    n(this._didWork, this.getPendingTasks());
                }, r)),
                this._callbacks.push({ doneCb: n, timeoutId: s, updateCb: i });
            }
            whenStable(n, r, i) {
              if (i && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(n, r, i), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            findProviders(n, r, i) {
              return [];
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(T(Ae));
            }),
            (t.ɵprov = G({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        K_ = (() => {
          class t {
            constructor() {
              (this._applications = new Map()), yd.addToWindow(this);
            }
            registerApplication(n, r) {
              this._applications.set(n, r);
            }
            unregisterApplication(n) {
              this._applications.delete(n);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(n) {
              return this._applications.get(n) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(n, r = !0) {
              return yd.findTestabilityInTree(this, n, r);
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵprov = G({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      class A1 {
        addToWindow(e) {}
        findTestabilityInTree(e, n, r) {
          return null;
        }
      }
      let en,
        yd = new A1();
      const Z_ = new q("AllowMultipleToken");
      class Y_ {
        constructor(e, n) {
          (this.name = e), (this.token = n);
        }
      }
      function J_(t, e, n = []) {
        const r = `Platform: ${e}`,
          i = new q(r);
        return (s = []) => {
          let o = X_();
          if (!o || o.injector.get(Z_, !1))
            if (t) t(n.concat(s).concat({ provide: i, useValue: !0 }));
            else {
              const a = n
                .concat(s)
                .concat(
                  { provide: i, useValue: !0 },
                  { provide: vc, useValue: "platform" }
                );
              !(function N1(t) {
                if (en && !en.destroyed && !en.injector.get(Z_, !1))
                  throw new b(400, "");
                en = t.get(ev);
                const e = t.get($_, null);
                e && e.forEach((n) => n());
              })(Qe.create({ providers: a, name: r }));
            }
          return (function x1(t) {
            const e = X_();
            if (!e) throw new b(401, "");
            return e;
          })();
        };
      }
      function X_() {
        return en && !en.destroyed ? en : null;
      }
      let ev = (() => {
        class t {
          constructor(n) {
            (this._injector = n),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(n, r) {
            const a = (function F1(t, e) {
                let n;
                return (
                  (n =
                    "noop" === t
                      ? new S1()
                      : ("zone.js" === t ? void 0 : t) ||
                        new Ae({
                          enableLongStackTrace: !1,
                          shouldCoalesceEventChangeDetection: !!(null == e
                            ? void 0
                            : e.ngZoneEventCoalescing),
                          shouldCoalesceRunChangeDetection: !!(null == e
                            ? void 0
                            : e.ngZoneRunCoalescing),
                        })),
                  n
                );
              })(r ? r.ngZone : void 0, {
                ngZoneEventCoalescing: (r && r.ngZoneEventCoalescing) || !1,
                ngZoneRunCoalescing: (r && r.ngZoneRunCoalescing) || !1,
              }),
              l = [{ provide: Ae, useValue: a }];
            return a.run(() => {
              const u = Qe.create({
                  providers: l,
                  parent: this.injector,
                  name: n.moduleType.name,
                }),
                c = n.create(u),
                d = c.injector.get(ii, null);
              if (!d) throw new b(402, "");
              return (
                a.runOutsideAngular(() => {
                  const f = a.onError.subscribe({
                    next: (h) => {
                      d.handleError(h);
                    },
                  });
                  c.onDestroy(() => {
                    _d(this._modules, c), f.unsubscribe();
                  });
                }),
                (function P1(t, e, n) {
                  try {
                    const r = n();
                    return ws(r)
                      ? r.catch((i) => {
                          throw (
                            (e.runOutsideAngular(() => t.handleError(i)), i)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (e.runOutsideAngular(() => t.handleError(r)), r);
                  }
                })(d, a, () => {
                  const f = c.injector.get(Ni);
                  return (
                    f.runInitializers(),
                    f.donePromise.then(
                      () => (
                        (function fT(t) {
                          dt(t, "Expected localeId to be defined"),
                            "string" == typeof t &&
                              (Oy = t.toLowerCase().replace(/_/g, "-"));
                        })(c.injector.get(Xn, da) || da),
                        this._moduleDoBootstrap(c),
                        c
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(n, r = []) {
            const i = tv({}, r);
            return (function T1(t, e, n) {
              const r = new zc(n);
              return Promise.resolve(r);
            })(0, 0, n).then((s) => this.bootstrapModuleFactory(s, i));
          }
          _moduleDoBootstrap(n) {
            const r = n.injector.get(Vs);
            if (n._bootstrapComponents.length > 0)
              n._bootstrapComponents.forEach((i) => r.bootstrap(i));
            else {
              if (!n.instance.ngDoBootstrap) throw new b(403, "");
              n.instance.ngDoBootstrap(r);
            }
            this._modules.push(n);
          }
          onDestroy(n) {
            this._destroyListeners.push(n);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new b(404, "");
            this._modules.slice().forEach((n) => n.destroy()),
              this._destroyListeners.forEach((n) => n()),
              (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(T(Qe));
          }),
          (t.ɵprov = G({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function tv(t, e) {
        return Array.isArray(e)
          ? e.reduce(tv, t)
          : Object.assign(Object.assign({}, t), e);
      }
      let Vs = (() => {
        class t {
          constructor(n, r, i, s, o) {
            (this._zone = n),
              (this._injector = r),
              (this._exceptionHandler = i),
              (this._componentFactoryResolver = s),
              (this._initStatus = o),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription =
                this._zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this._zone.run(() => {
                      this.tick();
                    });
                  },
                }));
            const a = new ge((u) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    u.next(this._stable), u.complete();
                  });
              }),
              l = new ge((u) => {
                let c;
                this._zone.runOutsideAngular(() => {
                  c = this._zone.onStable.subscribe(() => {
                    Ae.assertNotInAngularZone(),
                      hd(() => {
                        !this._stable &&
                          !this._zone.hasPendingMacrotasks &&
                          !this._zone.hasPendingMicrotasks &&
                          ((this._stable = !0), u.next(!0));
                      });
                  });
                });
                const d = this._zone.onUnstable.subscribe(() => {
                  Ae.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        u.next(!1);
                      }));
                });
                return () => {
                  c.unsubscribe(), d.unsubscribe();
                };
              });
            this.isStable = (function Fw(...t) {
              const e = Wi(t),
                n = (function Sw(t, e) {
                  return "number" == typeof Ul(t) ? t.pop() : e;
                })(t, 1 / 0),
                r = t;
              return r.length
                ? 1 === r.length
                  ? an(r[0])
                  : zi(n)(Be(r, e))
                : An;
            })(
              a,
              l.pipe(
                (function Pw(t = {}) {
                  const {
                    connector: e = () => new on(),
                    resetOnError: n = !0,
                    resetOnComplete: r = !0,
                    resetOnRefCountZero: i = !0,
                  } = t;
                  return (s) => {
                    let o = null,
                      a = null,
                      l = null,
                      u = 0,
                      c = !1,
                      d = !1;
                    const f = () => {
                        null == a || a.unsubscribe(), (a = null);
                      },
                      h = () => {
                        f(), (o = l = null), (c = d = !1);
                      },
                      p = () => {
                        const g = o;
                        h(), null == g || g.unsubscribe();
                      };
                    return He((g, y) => {
                      u++, !d && !c && f();
                      const _ = (l = null != l ? l : e());
                      y.add(() => {
                        u--, 0 === u && !d && !c && (a = Hl(p, i));
                      }),
                        _.subscribe(y),
                        o ||
                          ((o = new mo({
                            next: (m) => _.next(m),
                            error: (m) => {
                              (d = !0), f(), (a = Hl(h, n, m)), _.error(m);
                            },
                            complete: () => {
                              (c = !0), f(), (a = Hl(h, r)), _.complete();
                            },
                          })),
                          Be(g).subscribe(o));
                    })(s);
                  };
                })()
              )
            );
          }
          bootstrap(n, r) {
            if (!this._initStatus.done) throw new b(405, "");
            let i;
            (i =
              n instanceof o_
                ? n
                : this._componentFactoryResolver.resolveComponentFactory(n)),
              this.componentTypes.push(i.componentType);
            const s = (function I1(t) {
                return t.isBoundToModule;
              })(i)
                ? void 0
                : this._injector.get(kn),
              a = i.create(Qe.NULL, [], r || i.selector, s),
              l = a.location.nativeElement,
              u = a.injector.get(md, null),
              c = u && a.injector.get(K_);
            return (
              u && c && c.registerApplication(l, u),
              a.onDestroy(() => {
                this.detachView(a.hostView),
                  _d(this.components, a),
                  c && c.unregisterApplication(l);
              }),
              this._loadComponent(a),
              a
            );
          }
          tick() {
            if (this._runningTick) throw new b(101, "");
            try {
              this._runningTick = !0;
              for (let n of this._views) n.detectChanges();
            } catch (n) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(n)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(n) {
            const r = n;
            this._views.push(r), r.attachToAppRef(this);
          }
          detachView(n) {
            const r = n;
            _d(this._views, r), r.detachFromAppRef();
          }
          _loadComponent(n) {
            this.attachView(n.hostView),
              this.tick(),
              this.components.push(n),
              this._injector
                .get(G_, [])
                .concat(this._bootstrapListeners)
                .forEach((i) => i(n));
          }
          ngOnDestroy() {
            this._views.slice().forEach((n) => n.destroy()),
              this._onMicrotaskEmptySubscription.unsubscribe();
          }
          get viewCount() {
            return this._views.length;
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(T(Ae), T(Qe), T(ii), T(Ai), T(Ni));
          }),
          (t.ɵprov = G({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function _d(t, e) {
        const n = t.indexOf(e);
        n > -1 && t.splice(n, 1);
      }
      let rv = !0,
        wa = (() => {
          class t {}
          return (t.__NG_ELEMENT_ID__ = k1), t;
        })();
      function k1(t) {
        return (function V1(t, e, n) {
          if (So(t) && !n) {
            const r = ht(t.index, e);
            return new xs(r, r);
          }
          return 47 & t.type ? new xs(e[16], e) : null;
        })(Pe(), v(), 16 == (16 & t));
      }
      class lv {
        constructor() {}
        supports(e) {
          return Cs(e);
        }
        create(e) {
          return new $1(e);
        }
      }
      const H1 = (t, e) => e;
      class $1 {
        constructor(e) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = e || H1);
        }
        forEachItem(e) {
          let n;
          for (n = this._itHead; null !== n; n = n._next) e(n);
        }
        forEachOperation(e) {
          let n = this._itHead,
            r = this._removalsHead,
            i = 0,
            s = null;
          for (; n || r; ) {
            const o = !r || (n && n.currentIndex < cv(r, i, s)) ? n : r,
              a = cv(o, i, s),
              l = o.currentIndex;
            if (o === r) i--, (r = r._nextRemoved);
            else if (((n = n._next), null == o.previousIndex)) i++;
            else {
              s || (s = []);
              const u = a - i,
                c = l - i;
              if (u != c) {
                for (let f = 0; f < u; f++) {
                  const h = f < s.length ? s[f] : (s[f] = 0),
                    p = h + f;
                  c <= p && p < u && (s[f] = h + 1);
                }
                s[o.previousIndex] = c - u;
              }
            }
            a !== l && e(o, a, l);
          }
        }
        forEachPreviousItem(e) {
          let n;
          for (n = this._previousItHead; null !== n; n = n._nextPrevious) e(n);
        }
        forEachAddedItem(e) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) e(n);
        }
        forEachMovedItem(e) {
          let n;
          for (n = this._movesHead; null !== n; n = n._nextMoved) e(n);
        }
        forEachRemovedItem(e) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) e(n);
        }
        forEachIdentityChange(e) {
          let n;
          for (
            n = this._identityChangesHead;
            null !== n;
            n = n._nextIdentityChange
          )
            e(n);
        }
        diff(e) {
          if ((null == e && (e = []), !Cs(e))) throw new b(900, "");
          return this.check(e) ? this : null;
        }
        onDestroy() {}
        check(e) {
          this._reset();
          let i,
            s,
            o,
            n = this._itHead,
            r = !1;
          if (Array.isArray(e)) {
            this.length = e.length;
            for (let a = 0; a < this.length; a++)
              (s = e[a]),
                (o = this._trackByFn(a, s)),
                null !== n && Object.is(n.trackById, o)
                  ? (r && (n = this._verifyReinsertion(n, s, o, a)),
                    Object.is(n.item, s) || this._addIdentityChange(n, s))
                  : ((n = this._mismatch(n, s, o, a)), (r = !0)),
                (n = n._next);
          } else
            (i = 0),
              (function YA(t, e) {
                if (Array.isArray(t))
                  for (let n = 0; n < t.length; n++) e(t[n]);
                else {
                  const n = t[fi()]();
                  let r;
                  for (; !(r = n.next()).done; ) e(r.value);
                }
              })(e, (a) => {
                (o = this._trackByFn(i, a)),
                  null !== n && Object.is(n.trackById, o)
                    ? (r && (n = this._verifyReinsertion(n, a, o, i)),
                      Object.is(n.item, a) || this._addIdentityChange(n, a))
                    : ((n = this._mismatch(n, a, o, i)), (r = !0)),
                  (n = n._next),
                  i++;
              }),
              (this.length = i);
          return this._truncate(n), (this.collection = e), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let e;
            for (
              e = this._previousItHead = this._itHead;
              null !== e;
              e = e._next
            )
              e._nextPrevious = e._next;
            for (e = this._additionsHead; null !== e; e = e._nextAdded)
              e.previousIndex = e.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                e = this._movesHead;
              null !== e;
              e = e._nextMoved
            )
              e.previousIndex = e.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(e, n, r, i) {
          let s;
          return (
            null === e ? (s = this._itTail) : ((s = e._prev), this._remove(e)),
            null !==
            (e =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(r, null))
              ? (Object.is(e.item, n) || this._addIdentityChange(e, n),
                this._reinsertAfter(e, s, i))
              : null !==
                (e =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(r, i))
              ? (Object.is(e.item, n) || this._addIdentityChange(e, n),
                this._moveAfter(e, s, i))
              : (e = this._addAfter(new G1(n, r), s, i)),
            e
          );
        }
        _verifyReinsertion(e, n, r, i) {
          let s =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(r, null);
          return (
            null !== s
              ? (e = this._reinsertAfter(s, e._prev, i))
              : e.currentIndex != i &&
                ((e.currentIndex = i), this._addToMoves(e, i)),
            e
          );
        }
        _truncate(e) {
          for (; null !== e; ) {
            const n = e._next;
            this._addToRemovals(this._unlink(e)), (e = n);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(e, n, r) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(e);
          const i = e._prevRemoved,
            s = e._nextRemoved;
          return (
            null === i ? (this._removalsHead = s) : (i._nextRemoved = s),
            null === s ? (this._removalsTail = i) : (s._prevRemoved = i),
            this._insertAfter(e, n, r),
            this._addToMoves(e, r),
            e
          );
        }
        _moveAfter(e, n, r) {
          return (
            this._unlink(e),
            this._insertAfter(e, n, r),
            this._addToMoves(e, r),
            e
          );
        }
        _addAfter(e, n, r) {
          return (
            this._insertAfter(e, n, r),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = e)
                : (this._additionsTail._nextAdded = e)),
            e
          );
        }
        _insertAfter(e, n, r) {
          const i = null === n ? this._itHead : n._next;
          return (
            (e._next = i),
            (e._prev = n),
            null === i ? (this._itTail = e) : (i._prev = e),
            null === n ? (this._itHead = e) : (n._next = e),
            null === this._linkedRecords && (this._linkedRecords = new uv()),
            this._linkedRecords.put(e),
            (e.currentIndex = r),
            e
          );
        }
        _remove(e) {
          return this._addToRemovals(this._unlink(e));
        }
        _unlink(e) {
          null !== this._linkedRecords && this._linkedRecords.remove(e);
          const n = e._prev,
            r = e._next;
          return (
            null === n ? (this._itHead = r) : (n._next = r),
            null === r ? (this._itTail = n) : (r._prev = n),
            e
          );
        }
        _addToMoves(e, n) {
          return (
            e.previousIndex === n ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = e)
                  : (this._movesTail._nextMoved = e)),
            e
          );
        }
        _addToRemovals(e) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new uv()),
            this._unlinkedRecords.put(e),
            (e.currentIndex = null),
            (e._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = e),
                (e._prevRemoved = null))
              : ((e._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = e)),
            e
          );
        }
        _addIdentityChange(e, n) {
          return (
            (e.item = n),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = e)
                : (this._identityChangesTail._nextIdentityChange = e)),
            e
          );
        }
      }
      class G1 {
        constructor(e, n) {
          (this.item = e),
            (this.trackById = n),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class q1 {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(e) {
          null === this._head
            ? ((this._head = this._tail = e),
              (e._nextDup = null),
              (e._prevDup = null))
            : ((this._tail._nextDup = e),
              (e._prevDup = this._tail),
              (e._nextDup = null),
              (this._tail = e));
        }
        get(e, n) {
          let r;
          for (r = this._head; null !== r; r = r._nextDup)
            if (
              (null === n || n <= r.currentIndex) &&
              Object.is(r.trackById, e)
            )
              return r;
          return null;
        }
        remove(e) {
          const n = e._prevDup,
            r = e._nextDup;
          return (
            null === n ? (this._head = r) : (n._nextDup = r),
            null === r ? (this._tail = n) : (r._prevDup = n),
            null === this._head
          );
        }
      }
      class uv {
        constructor() {
          this.map = new Map();
        }
        put(e) {
          const n = e.trackById;
          let r = this.map.get(n);
          r || ((r = new q1()), this.map.set(n, r)), r.add(e);
        }
        get(e, n) {
          const i = this.map.get(e);
          return i ? i.get(e, n) : null;
        }
        remove(e) {
          const n = e.trackById;
          return this.map.get(n).remove(e) && this.map.delete(n), e;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function cv(t, e, n) {
        const r = t.previousIndex;
        if (null === r) return r;
        let i = 0;
        return n && r < n.length && (i = n[r]), r + e + i;
      }
      class dv {
        constructor() {}
        supports(e) {
          return e instanceof Map || Sc(e);
        }
        create() {
          return new z1();
        }
      }
      class z1 {
        constructor() {
          (this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null);
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._changesHead ||
            null !== this._removalsHead
          );
        }
        forEachItem(e) {
          let n;
          for (n = this._mapHead; null !== n; n = n._next) e(n);
        }
        forEachPreviousItem(e) {
          let n;
          for (n = this._previousMapHead; null !== n; n = n._nextPrevious) e(n);
        }
        forEachChangedItem(e) {
          let n;
          for (n = this._changesHead; null !== n; n = n._nextChanged) e(n);
        }
        forEachAddedItem(e) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) e(n);
        }
        forEachRemovedItem(e) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) e(n);
        }
        diff(e) {
          if (e) {
            if (!(e instanceof Map || Sc(e))) throw new b(900, "");
          } else e = new Map();
          return this.check(e) ? this : null;
        }
        onDestroy() {}
        check(e) {
          this._reset();
          let n = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(e, (r, i) => {
              if (n && n.key === i)
                this._maybeAddToChanges(n, r),
                  (this._appendAfter = n),
                  (n = n._next);
              else {
                const s = this._getOrCreateRecordForKey(i, r);
                n = this._insertBeforeOrAppend(n, s);
              }
            }),
            n)
          ) {
            n._prev && (n._prev._next = null), (this._removalsHead = n);
            for (let r = n; null !== r; r = r._nextRemoved)
              r === this._mapHead && (this._mapHead = null),
                this._records.delete(r.key),
                (r._nextRemoved = r._next),
                (r.previousValue = r.currentValue),
                (r.currentValue = null),
                (r._prev = null),
                (r._next = null);
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(e, n) {
          if (e) {
            const r = e._prev;
            return (
              (n._next = e),
              (n._prev = r),
              (e._prev = n),
              r && (r._next = n),
              e === this._mapHead && (this._mapHead = n),
              (this._appendAfter = e),
              e
            );
          }
          return (
            this._appendAfter
              ? ((this._appendAfter._next = n), (n._prev = this._appendAfter))
              : (this._mapHead = n),
            (this._appendAfter = n),
            null
          );
        }
        _getOrCreateRecordForKey(e, n) {
          if (this._records.has(e)) {
            const i = this._records.get(e);
            this._maybeAddToChanges(i, n);
            const s = i._prev,
              o = i._next;
            return (
              s && (s._next = o),
              o && (o._prev = s),
              (i._next = null),
              (i._prev = null),
              i
            );
          }
          const r = new W1(e);
          return (
            this._records.set(e, r),
            (r.currentValue = n),
            this._addToAdditions(r),
            r
          );
        }
        _reset() {
          if (this.isDirty) {
            let e;
            for (
              this._previousMapHead = this._mapHead, e = this._previousMapHead;
              null !== e;
              e = e._next
            )
              e._nextPrevious = e._next;
            for (e = this._changesHead; null !== e; e = e._nextChanged)
              e.previousValue = e.currentValue;
            for (e = this._additionsHead; null != e; e = e._nextAdded)
              e.previousValue = e.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(e, n) {
          Object.is(n, e.currentValue) ||
            ((e.previousValue = e.currentValue),
            (e.currentValue = n),
            this._addToChanges(e));
        }
        _addToAdditions(e) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = e)
            : ((this._additionsTail._nextAdded = e), (this._additionsTail = e));
        }
        _addToChanges(e) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = e)
            : ((this._changesTail._nextChanged = e), (this._changesTail = e));
        }
        _forEach(e, n) {
          e instanceof Map
            ? e.forEach(n)
            : Object.keys(e).forEach((r) => n(e[r], r));
        }
      }
      class W1 {
        constructor(e) {
          (this.key = e),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null);
        }
      }
      function fv() {
        return new Aa([new lv()]);
      }
      let Aa = (() => {
        class t {
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (null != r) {
              const i = r.factories.slice();
              n = n.concat(i);
            }
            return new t(n);
          }
          static extend(n) {
            return {
              provide: t,
              useFactory: (r) => t.create(n, r || fv()),
              deps: [[t, new ti(), new dn()]],
            };
          }
          find(n) {
            const r = this.factories.find((i) => i.supports(n));
            if (null != r) return r;
            throw new b(901, "");
          }
        }
        return (t.ɵprov = G({ token: t, providedIn: "root", factory: fv })), t;
      })();
      function hv() {
        return new Ls([new dv()]);
      }
      let Ls = (() => {
        class t {
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (r) {
              const i = r.factories.slice();
              n = n.concat(i);
            }
            return new t(n);
          }
          static extend(n) {
            return {
              provide: t,
              useFactory: (r) => t.create(n, r || hv()),
              deps: [[t, new ti(), new dn()]],
            };
          }
          find(n) {
            const r = this.factories.find((s) => s.supports(n));
            if (r) return r;
            throw new b(901, "");
          }
        }
        return (t.ɵprov = G({ token: t, providedIn: "root", factory: hv })), t;
      })();
      const Z1 = J_(null, "core", [
          { provide: fd, useValue: "unknown" },
          { provide: ev, deps: [Qe] },
          { provide: K_, deps: [] },
          { provide: q_, deps: [] },
        ]),
        X1 = [
          { provide: Vs, useClass: Vs, deps: [Ae, Qe, ii, Ai, Ni] },
          {
            provide: _I,
            deps: [Ae],
            useFactory: function eN(t) {
              let e = [];
              return (
                t.onStable.subscribe(() => {
                  for (; e.length; ) e.pop()();
                }),
                function (n) {
                  e.push(n);
                }
              );
            },
          },
          { provide: Ni, useClass: Ni, deps: [[new dn(), Ca]] },
          { provide: Ea, useClass: Ea, deps: [] },
          y1,
          {
            provide: Xn,
            useFactory: function Y1(t) {
              return (
                t ||
                (function J1() {
                  return (
                    ("undefined" != typeof $localize && $localize.locale) || da
                  );
                })()
              );
            },
            deps: [[new cs(Xn), new dn(), new ti()]],
          },
          { provide: z_, useValue: "USD" },
        ];
      let tN = (() => {
          class t {
            constructor(n) {}
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(T(Vs));
            }),
            (t.ɵmod = Gt({ type: t })),
            (t.ɵinj = Tt({ providers: X1 })),
            t
          );
        })(),
        Ma = null;
      function vn() {
        return Ma;
      }
      const lt = new q("DocumentToken");
      let Ar = (() => {
        class t {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)();
          }),
          (t.ɵprov = G({
            token: t,
            factory: function () {
              return (function sN() {
                return T(pv);
              })();
            },
            providedIn: "platform",
          })),
          t
        );
      })();
      const oN = new q("Location Initialized");
      let pv = (() => {
        class t extends Ar {
          constructor(n) {
            super(), (this._doc = n), this._init();
          }
          _init() {
            (this.location = window.location), (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return vn().getBaseHref(this._doc);
          }
          onPopState(n) {
            const r = vn().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("popstate", n, !1),
              () => r.removeEventListener("popstate", n)
            );
          }
          onHashChange(n) {
            const r = vn().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("hashchange", n, !1),
              () => r.removeEventListener("hashchange", n)
            );
          }
          get href() {
            return this.location.href;
          }
          get protocol() {
            return this.location.protocol;
          }
          get hostname() {
            return this.location.hostname;
          }
          get port() {
            return this.location.port;
          }
          get pathname() {
            return this.location.pathname;
          }
          get search() {
            return this.location.search;
          }
          get hash() {
            return this.location.hash;
          }
          set pathname(n) {
            this.location.pathname = n;
          }
          pushState(n, r, i) {
            gv() ? this._history.pushState(n, r, i) : (this.location.hash = i);
          }
          replaceState(n, r, i) {
            gv()
              ? this._history.replaceState(n, r, i)
              : (this.location.hash = i);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          historyGo(n = 0) {
            this._history.go(n);
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(T(lt));
          }),
          (t.ɵprov = G({
            token: t,
            factory: function () {
              return (function aN() {
                return new pv(T(lt));
              })();
            },
            providedIn: "platform",
          })),
          t
        );
      })();
      function gv() {
        return !!window.history.pushState;
      }
      function wd(t, e) {
        if (0 == t.length) return e;
        if (0 == e.length) return t;
        let n = 0;
        return (
          t.endsWith("/") && n++,
          e.startsWith("/") && n++,
          2 == n ? t + e.substring(1) : 1 == n ? t + e : t + "/" + e
        );
      }
      function mv(t) {
        const e = t.match(/#|\?|$/),
          n = (e && e.index) || t.length;
        return t.slice(0, n - ("/" === t[n - 1] ? 1 : 0)) + t.slice(n);
      }
      function Ln(t) {
        return t && "?" !== t[0] ? "?" + t : t;
      }
      let xi = (() => {
        class t {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)();
          }),
          (t.ɵprov = G({
            token: t,
            factory: function () {
              return (function lN(t) {
                const e = T(lt).location;
                return new yv(T(Ar), (e && e.origin) || "");
              })();
            },
            providedIn: "root",
          })),
          t
        );
      })();
      const bd = new q("appBaseHref");
      let yv = (() => {
          class t extends xi {
            constructor(n, r) {
              if (
                (super(),
                (this._platformLocation = n),
                (this._removeListenerFns = []),
                null == r && (r = this._platformLocation.getBaseHrefFromDOM()),
                null == r)
              )
                throw new Error(
                  "No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document."
                );
              this._baseHref = r;
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(n) {
              return wd(this._baseHref, n);
            }
            path(n = !1) {
              const r =
                  this._platformLocation.pathname +
                  Ln(this._platformLocation.search),
                i = this._platformLocation.hash;
              return i && n ? `${r}${i}` : r;
            }
            pushState(n, r, i, s) {
              const o = this.prepareExternalUrl(i + Ln(s));
              this._platformLocation.pushState(n, r, o);
            }
            replaceState(n, r, i, s) {
              const o = this.prepareExternalUrl(i + Ln(s));
              this._platformLocation.replaceState(n, r, o);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            historyGo(n = 0) {
              var r, i;
              null === (i = (r = this._platformLocation).historyGo) ||
                void 0 === i ||
                i.call(r, n);
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(T(Ar), T(bd, 8));
            }),
            (t.ɵprov = G({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        uN = (() => {
          class t extends xi {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._baseHref = ""),
                (this._removeListenerFns = []),
                null != r && (this._baseHref = r);
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(n = !1) {
              let r = this._platformLocation.hash;
              return null == r && (r = "#"), r.length > 0 ? r.substring(1) : r;
            }
            prepareExternalUrl(n) {
              const r = wd(this._baseHref, n);
              return r.length > 0 ? "#" + r : r;
            }
            pushState(n, r, i, s) {
              let o = this.prepareExternalUrl(i + Ln(s));
              0 == o.length && (o = this._platformLocation.pathname),
                this._platformLocation.pushState(n, r, o);
            }
            replaceState(n, r, i, s) {
              let o = this.prepareExternalUrl(i + Ln(s));
              0 == o.length && (o = this._platformLocation.pathname),
                this._platformLocation.replaceState(n, r, o);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            historyGo(n = 0) {
              var r, i;
              null === (i = (r = this._platformLocation).historyGo) ||
                void 0 === i ||
                i.call(r, n);
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(T(Ar), T(bd, 8));
            }),
            (t.ɵprov = G({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Sd = (() => {
          class t {
            constructor(n, r) {
              (this._subject = new be()),
                (this._urlChangeListeners = []),
                (this._platformStrategy = n);
              const i = this._platformStrategy.getBaseHref();
              (this._platformLocation = r),
                (this._baseHref = mv(_v(i))),
                this._platformStrategy.onPopState((s) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: s.state,
                    type: s.type,
                  });
                });
            }
            path(n = !1) {
              return this.normalize(this._platformStrategy.path(n));
            }
            getState() {
              return this._platformLocation.getState();
            }
            isCurrentPathEqualTo(n, r = "") {
              return this.path() == this.normalize(n + Ln(r));
            }
            normalize(n) {
              return t.stripTrailingSlash(
                (function dN(t, e) {
                  return t && e.startsWith(t) ? e.substring(t.length) : e;
                })(this._baseHref, _v(n))
              );
            }
            prepareExternalUrl(n) {
              return (
                n && "/" !== n[0] && (n = "/" + n),
                this._platformStrategy.prepareExternalUrl(n)
              );
            }
            go(n, r = "", i = null) {
              this._platformStrategy.pushState(i, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + Ln(r)),
                  i
                );
            }
            replaceState(n, r = "", i = null) {
              this._platformStrategy.replaceState(i, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + Ln(r)),
                  i
                );
            }
            forward() {
              this._platformStrategy.forward();
            }
            back() {
              this._platformStrategy.back();
            }
            historyGo(n = 0) {
              var r, i;
              null === (i = (r = this._platformStrategy).historyGo) ||
                void 0 === i ||
                i.call(r, n);
            }
            onUrlChange(n) {
              this._urlChangeListeners.push(n),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((r) => {
                    this._notifyUrlChangeListeners(r.url, r.state);
                  }));
            }
            _notifyUrlChangeListeners(n = "", r) {
              this._urlChangeListeners.forEach((i) => i(n, r));
            }
            subscribe(n, r, i) {
              return this._subject.subscribe({
                next: n,
                error: r,
                complete: i,
              });
            }
          }
          return (
            (t.normalizeQueryParams = Ln),
            (t.joinWithSlash = wd),
            (t.stripTrailingSlash = mv),
            (t.ɵfac = function (n) {
              return new (n || t)(T(xi), T(Ar));
            }),
            (t.ɵprov = G({
              token: t,
              factory: function () {
                return (function cN() {
                  return new Sd(T(xi), T(Ar));
                })();
              },
              providedIn: "root",
            })),
            t
          );
        })();
      function _v(t) {
        return t.replace(/\/index.html$/, "");
      }
      var ut = (() => (
          ((ut = ut || {})[(ut.Decimal = 0)] = "Decimal"),
          (ut[(ut.Percent = 1)] = "Percent"),
          (ut[(ut.Currency = 2)] = "Currency"),
          (ut[(ut.Scientific = 3)] = "Scientific"),
          ut
        ))(),
        xe = (() => (
          ((xe = xe || {})[(xe.Zero = 0)] = "Zero"),
          (xe[(xe.One = 1)] = "One"),
          (xe[(xe.Two = 2)] = "Two"),
          (xe[(xe.Few = 3)] = "Few"),
          (xe[(xe.Many = 4)] = "Many"),
          (xe[(xe.Other = 5)] = "Other"),
          xe
        ))(),
        x = (() => (
          ((x = x || {})[(x.Decimal = 0)] = "Decimal"),
          (x[(x.Group = 1)] = "Group"),
          (x[(x.List = 2)] = "List"),
          (x[(x.PercentSign = 3)] = "PercentSign"),
          (x[(x.PlusSign = 4)] = "PlusSign"),
          (x[(x.MinusSign = 5)] = "MinusSign"),
          (x[(x.Exponential = 6)] = "Exponential"),
          (x[(x.SuperscriptingExponent = 7)] = "SuperscriptingExponent"),
          (x[(x.PerMille = 8)] = "PerMille"),
          (x[(x.Infinity = 9)] = "Infinity"),
          (x[(x.NaN = 10)] = "NaN"),
          (x[(x.TimeSeparator = 11)] = "TimeSeparator"),
          (x[(x.CurrencyDecimal = 12)] = "CurrencyDecimal"),
          (x[(x.CurrencyGroup = 13)] = "CurrencyGroup"),
          x
        ))();
      function Vt(t, e) {
        const n = tt(t),
          r = n[w.NumberSymbols][e];
        if (void 0 === r) {
          if (e === x.CurrencyDecimal) return n[w.NumberSymbols][x.Decimal];
          if (e === x.CurrencyGroup) return n[w.NumberSymbols][x.Group];
        }
        return r;
      }
      const _N = function Py(t) {
          return tt(t)[w.PluralCase];
        },
        VN = /^(\d+)?\.((\d+)(-(\d+))?)?$/;
      function Pd(t) {
        const e = parseInt(t);
        if (isNaN(e))
          throw new Error("Invalid integer literal when parsing " + t);
        return e;
      }
      class Va {}
      let WN = (() => {
          class t extends Va {
            constructor(n) {
              super(), (this.locale = n);
            }
            getPluralCategory(n, r) {
              switch (_N(r || this.locale)(n)) {
                case xe.Zero:
                  return "zero";
                case xe.One:
                  return "one";
                case xe.Two:
                  return "two";
                case xe.Few:
                  return "few";
                case xe.Many:
                  return "many";
                default:
                  return "other";
              }
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(T(Xn));
            }),
            (t.ɵprov = G({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Us = (() => {
          class t {
            constructor(n, r, i, s) {
              (this._iterableDiffers = n),
                (this._keyValueDiffers = r),
                (this._ngEl = i),
                (this._renderer = s),
                (this._iterableDiffer = null),
                (this._keyValueDiffer = null),
                (this._initialClasses = []),
                (this._rawClass = null);
            }
            set klass(n) {
              this._removeClasses(this._initialClasses),
                (this._initialClasses =
                  "string" == typeof n ? n.split(/\s+/) : []),
                this._applyClasses(this._initialClasses),
                this._applyClasses(this._rawClass);
            }
            set ngClass(n) {
              this._removeClasses(this._rawClass),
                this._applyClasses(this._initialClasses),
                (this._iterableDiffer = null),
                (this._keyValueDiffer = null),
                (this._rawClass = "string" == typeof n ? n.split(/\s+/) : n),
                this._rawClass &&
                  (Cs(this._rawClass)
                    ? (this._iterableDiffer = this._iterableDiffers
                        .find(this._rawClass)
                        .create())
                    : (this._keyValueDiffer = this._keyValueDiffers
                        .find(this._rawClass)
                        .create()));
            }
            ngDoCheck() {
              if (this._iterableDiffer) {
                const n = this._iterableDiffer.diff(this._rawClass);
                n && this._applyIterableChanges(n);
              } else if (this._keyValueDiffer) {
                const n = this._keyValueDiffer.diff(this._rawClass);
                n && this._applyKeyValueChanges(n);
              }
            }
            _applyKeyValueChanges(n) {
              n.forEachAddedItem((r) =>
                this._toggleClass(r.key, r.currentValue)
              ),
                n.forEachChangedItem((r) =>
                  this._toggleClass(r.key, r.currentValue)
                ),
                n.forEachRemovedItem((r) => {
                  r.previousValue && this._toggleClass(r.key, !1);
                });
            }
            _applyIterableChanges(n) {
              n.forEachAddedItem((r) => {
                if ("string" != typeof r.item)
                  throw new Error(
                    `NgClass can only toggle CSS classes expressed as strings, got ${te(
                      r.item
                    )}`
                  );
                this._toggleClass(r.item, !0);
              }),
                n.forEachRemovedItem((r) => this._toggleClass(r.item, !1));
            }
            _applyClasses(n) {
              n &&
                (Array.isArray(n) || n instanceof Set
                  ? n.forEach((r) => this._toggleClass(r, !0))
                  : Object.keys(n).forEach((r) =>
                      this._toggleClass(r, !!n[r])
                    ));
            }
            _removeClasses(n) {
              n &&
                (Array.isArray(n) || n instanceof Set
                  ? n.forEach((r) => this._toggleClass(r, !1))
                  : Object.keys(n).forEach((r) => this._toggleClass(r, !1)));
            }
            _toggleClass(n, r) {
              (n = n.trim()) &&
                n.split(/\s+/g).forEach((i) => {
                  r
                    ? this._renderer.addClass(this._ngEl.nativeElement, i)
                    : this._renderer.removeClass(this._ngEl.nativeElement, i);
                });
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(D(Aa), D(Ls), D(_t), D(On));
            }),
            (t.ɵdir = P({
              type: t,
              selectors: [["", "ngClass", ""]],
              inputs: { klass: ["class", "klass"], ngClass: "ngClass" },
            })),
            t
          );
        })();
      class ZN {
        constructor(e, n, r, i) {
          (this.$implicit = e),
            (this.ngForOf = n),
            (this.index = r),
            (this.count = i);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let Hs = (() => {
        class t {
          constructor(n, r, i) {
            (this._viewContainer = n),
              (this._template = r),
              (this._differs = i),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForOf(n) {
            (this._ngForOf = n), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(n) {
            this._trackByFn = n;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          set ngForTemplate(n) {
            n && (this._template = n);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const n = this._ngForOf;
              !this._differ &&
                n &&
                (this._differ = this._differs
                  .find(n)
                  .create(this.ngForTrackBy));
            }
            if (this._differ) {
              const n = this._differ.diff(this._ngForOf);
              n && this._applyChanges(n);
            }
          }
          _applyChanges(n) {
            const r = this._viewContainer;
            n.forEachOperation((i, s, o) => {
              if (null == i.previousIndex)
                r.createEmbeddedView(
                  this._template,
                  new ZN(i.item, this._ngForOf, -1, -1),
                  null === o ? void 0 : o
                );
              else if (null == o) r.remove(null === s ? void 0 : s);
              else if (null !== s) {
                const a = r.get(s);
                r.move(a, o), Mv(a, i);
              }
            });
            for (let i = 0, s = r.length; i < s; i++) {
              const a = r.get(i).context;
              (a.index = i), (a.count = s), (a.ngForOf = this._ngForOf);
            }
            n.forEachIdentityChange((i) => {
              Mv(r.get(i.currentIndex), i);
            });
          }
          static ngTemplateContextGuard(n, r) {
            return !0;
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(D(Xt), D(Vn), D(Aa));
          }),
          (t.ɵdir = P({
            type: t,
            selectors: [["", "ngFor", "", "ngForOf", ""]],
            inputs: {
              ngForOf: "ngForOf",
              ngForTrackBy: "ngForTrackBy",
              ngForTemplate: "ngForTemplate",
            },
          })),
          t
        );
      })();
      function Mv(t, e) {
        t.context.$implicit = e.item;
      }
      let La = (() => {
        class t {
          constructor(n, r) {
            (this._viewContainer = n),
              (this._context = new YN()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = r);
          }
          set ngIf(n) {
            (this._context.$implicit = this._context.ngIf = n),
              this._updateView();
          }
          set ngIfThen(n) {
            Tv("ngIfThen", n),
              (this._thenTemplateRef = n),
              (this._thenViewRef = null),
              this._updateView();
          }
          set ngIfElse(n) {
            Tv("ngIfElse", n),
              (this._elseTemplateRef = n),
              (this._elseViewRef = null),
              this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context
                  )));
          }
          static ngTemplateContextGuard(n, r) {
            return !0;
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(D(Xt), D(Vn));
          }),
          (t.ɵdir = P({
            type: t,
            selectors: [["", "ngIf", ""]],
            inputs: {
              ngIf: "ngIf",
              ngIfThen: "ngIfThen",
              ngIfElse: "ngIfElse",
            },
          })),
          t
        );
      })();
      class YN {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function Tv(t, e) {
        if (e && !e.createEmbeddedView)
          throw new Error(
            `${t} must be a TemplateRef, but received '${te(e)}'.`
          );
      }
      function nn(t, e) {
        return new b(2100, "");
      }
      const ux =
        /(?:[0-9A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E]|\uD838[\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF38\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])\S*/g;
      let Nv = (() => {
          class t {
            transform(n) {
              if (null == n) return null;
              if ("string" != typeof n) throw nn();
              return n.replace(
                ux,
                (r) => r[0].toUpperCase() + r.substr(1).toLowerCase()
              );
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵpipe = st({ name: "titlecase", type: t, pure: !0 })),
            t
          );
        })(),
        kd = (() => {
          class t {
            constructor(n) {
              this._locale = n;
            }
            transform(n, r, i) {
              if (
                !(function Vd(t) {
                  return !(null == t || "" === t || t != t);
                })(n)
              )
                return null;
              i = i || this._locale;
              try {
                return (function $N(t, e, n) {
                  return (function xd(t, e, n, r, i, s, o = !1) {
                    let a = "",
                      l = !1;
                    if (isFinite(t)) {
                      let u = (function qN(t) {
                        let r,
                          i,
                          s,
                          o,
                          a,
                          e = Math.abs(t) + "",
                          n = 0;
                        for (
                          (i = e.indexOf(".")) > -1 && (e = e.replace(".", "")),
                            (s = e.search(/e/i)) > 0
                              ? (i < 0 && (i = s),
                                (i += +e.slice(s + 1)),
                                (e = e.substring(0, s)))
                              : i < 0 && (i = e.length),
                            s = 0;
                          "0" === e.charAt(s);
                          s++
                        );
                        if (s === (a = e.length)) (r = [0]), (i = 1);
                        else {
                          for (a--; "0" === e.charAt(a); ) a--;
                          for (i -= s, r = [], o = 0; s <= a; s++, o++)
                            r[o] = Number(e.charAt(s));
                        }
                        return (
                          i > 22 &&
                            ((r = r.splice(0, 21)), (n = i - 1), (i = 1)),
                          { digits: r, exponent: n, integerLen: i }
                        );
                      })(t);
                      o &&
                        (u = (function GN(t) {
                          if (0 === t.digits[0]) return t;
                          const e = t.digits.length - t.integerLen;
                          return (
                            t.exponent
                              ? (t.exponent += 2)
                              : (0 === e
                                  ? t.digits.push(0, 0)
                                  : 1 === e && t.digits.push(0),
                                (t.integerLen += 2)),
                            t
                          );
                        })(u));
                      let c = e.minInt,
                        d = e.minFrac,
                        f = e.maxFrac;
                      if (s) {
                        const m = s.match(VN);
                        if (null === m)
                          throw new Error(`${s} is not a valid digit info`);
                        const C = m[1],
                          S = m[3],
                          B = m[5];
                        null != C && (c = Pd(C)),
                          null != S && (d = Pd(S)),
                          null != B
                            ? (f = Pd(B))
                            : null != S && d > f && (f = d);
                      }
                      !(function zN(t, e, n) {
                        if (e > n)
                          throw new Error(
                            `The minimum number of digits after fraction (${e}) is higher than the maximum (${n}).`
                          );
                        let r = t.digits,
                          i = r.length - t.integerLen;
                        const s = Math.min(Math.max(e, i), n);
                        let o = s + t.integerLen,
                          a = r[o];
                        if (o > 0) {
                          r.splice(Math.max(t.integerLen, o));
                          for (let d = o; d < r.length; d++) r[d] = 0;
                        } else {
                          (i = Math.max(0, i)),
                            (t.integerLen = 1),
                            (r.length = Math.max(1, (o = s + 1))),
                            (r[0] = 0);
                          for (let d = 1; d < o; d++) r[d] = 0;
                        }
                        if (a >= 5)
                          if (o - 1 < 0) {
                            for (let d = 0; d > o; d--)
                              r.unshift(0), t.integerLen++;
                            r.unshift(1), t.integerLen++;
                          } else r[o - 1]++;
                        for (; i < Math.max(0, s); i++) r.push(0);
                        let l = 0 !== s;
                        const u = e + t.integerLen,
                          c = r.reduceRight(function (d, f, h, p) {
                            return (
                              (p[h] = (f += d) < 10 ? f : f - 10),
                              l && (0 === p[h] && h >= u ? p.pop() : (l = !1)),
                              f >= 10 ? 1 : 0
                            );
                          }, 0);
                        c && (r.unshift(c), t.integerLen++);
                      })(u, d, f);
                      let h = u.digits,
                        p = u.integerLen;
                      const g = u.exponent;
                      let y = [];
                      for (l = h.every((m) => !m); p < c; p++) h.unshift(0);
                      for (; p < 0; p++) h.unshift(0);
                      p > 0
                        ? (y = h.splice(p, h.length))
                        : ((y = h), (h = [0]));
                      const _ = [];
                      for (
                        h.length >= e.lgSize &&
                        _.unshift(h.splice(-e.lgSize, h.length).join(""));
                        h.length > e.gSize;

                      )
                        _.unshift(h.splice(-e.gSize, h.length).join(""));
                      h.length && _.unshift(h.join("")),
                        (a = _.join(Vt(n, r))),
                        y.length && (a += Vt(n, i) + y.join("")),
                        g && (a += Vt(n, x.Exponential) + "+" + g);
                    } else a = Vt(n, x.Infinity);
                    return (
                      (a =
                        t < 0 && !l
                          ? e.negPre + a + e.negSuf
                          : e.posPre + a + e.posSuf),
                      a
                    );
                  })(
                    t,
                    (function Fd(t, e = "-") {
                      const n = {
                          minInt: 1,
                          minFrac: 0,
                          maxFrac: 0,
                          posPre: "",
                          posSuf: "",
                          negPre: "",
                          negSuf: "",
                          gSize: 0,
                          lgSize: 0,
                        },
                        r = t.split(";"),
                        i = r[0],
                        s = r[1],
                        o =
                          -1 !== i.indexOf(".")
                            ? i.split(".")
                            : [
                                i.substring(0, i.lastIndexOf("0") + 1),
                                i.substring(i.lastIndexOf("0") + 1),
                              ],
                        a = o[0],
                        l = o[1] || "";
                      n.posPre = a.substr(0, a.indexOf("#"));
                      for (let c = 0; c < l.length; c++) {
                        const d = l.charAt(c);
                        "0" === d
                          ? (n.minFrac = n.maxFrac = c + 1)
                          : "#" === d
                          ? (n.maxFrac = c + 1)
                          : (n.posSuf += d);
                      }
                      const u = a.split(",");
                      if (
                        ((n.gSize = u[1] ? u[1].length : 0),
                        (n.lgSize = u[2] || u[1] ? (u[2] || u[1]).length : 0),
                        s)
                      ) {
                        const c = i.length - n.posPre.length - n.posSuf.length,
                          d = s.indexOf("#");
                        (n.negPre = s.substr(0, d).replace(/'/g, "")),
                          (n.negSuf = s.substr(d + c).replace(/'/g, ""));
                      } else (n.negPre = e + n.posPre), (n.negSuf = n.posSuf);
                      return n;
                    })(
                      (function Ad(t, e) {
                        return tt(t)[w.NumberFormats][e];
                      })(e, ut.Decimal),
                      Vt(e, x.MinusSign)
                    ),
                    e,
                    x.Group,
                    x.Decimal,
                    n
                  );
                })(
                  (function Ld(t) {
                    if (
                      "string" == typeof t &&
                      !isNaN(Number(t) - parseFloat(t))
                    )
                      return Number(t);
                    if ("number" != typeof t)
                      throw new Error(`${t} is not a number`);
                    return t;
                  })(n),
                  i,
                  r
                );
              } catch (s) {
                throw nn();
              }
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(D(Xn, 16));
            }),
            (t.ɵpipe = st({ name: "number", type: t, pure: !0 })),
            t
          );
        })();
      let Ex = (() => {
        class t {}
        return (
          (t.ɵfac = function (n) {
            return new (n || t)();
          }),
          (t.ɵmod = Gt({ type: t })),
          (t.ɵinj = Tt({ providers: [{ provide: Va, useClass: WN }] })),
          t
        );
      })();
      let Ax = (() => {
        class t {}
        return (
          (t.ɵprov = G({
            token: t,
            providedIn: "root",
            factory: () => new Mx(T(lt), window),
          })),
          t
        );
      })();
      class Mx {
        constructor(e, n) {
          (this.document = e), (this.window = n), (this.offset = () => [0, 0]);
        }
        setOffset(e) {
          this.offset = Array.isArray(e) ? () => e : e;
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0];
        }
        scrollToPosition(e) {
          this.supportsScrolling() && this.window.scrollTo(e[0], e[1]);
        }
        scrollToAnchor(e) {
          if (!this.supportsScrolling()) return;
          const n = (function Tx(t, e) {
            const n = t.getElementById(e) || t.getElementsByName(e)[0];
            if (n) return n;
            if (
              "function" == typeof t.createTreeWalker &&
              t.body &&
              (t.body.createShadowRoot || t.body.attachShadow)
            ) {
              const r = t.createTreeWalker(t.body, NodeFilter.SHOW_ELEMENT);
              let i = r.currentNode;
              for (; i; ) {
                const s = i.shadowRoot;
                if (s) {
                  const o =
                    s.getElementById(e) || s.querySelector(`[name="${e}"]`);
                  if (o) return o;
                }
                i = r.nextNode();
              }
            }
            return null;
          })(this.document, e);
          n && (this.scrollToElement(n), n.focus());
        }
        setHistoryScrollRestoration(e) {
          if (this.supportScrollRestoration()) {
            const n = this.window.history;
            n && n.scrollRestoration && (n.scrollRestoration = e);
          }
        }
        scrollToElement(e) {
          const n = e.getBoundingClientRect(),
            r = n.left + this.window.pageXOffset,
            i = n.top + this.window.pageYOffset,
            s = this.offset();
          this.window.scrollTo(r - s[0], i - s[1]);
        }
        supportScrollRestoration() {
          try {
            if (!this.supportsScrolling()) return !1;
            const e =
              Pv(this.window.history) ||
              Pv(Object.getPrototypeOf(this.window.history));
            return !(!e || (!e.writable && !e.set));
          } catch (e) {
            return !1;
          }
        }
        supportsScrolling() {
          try {
            return (
              !!this.window &&
              !!this.window.scrollTo &&
              "pageXOffset" in this.window
            );
          } catch (e) {
            return !1;
          }
        }
      }
      function Pv(t) {
        return Object.getOwnPropertyDescriptor(t, "scrollRestoration");
      }
      class Bd extends class Nx extends class iN {} {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      } {
        static makeCurrent() {
          !(function rN(t) {
            Ma || (Ma = t);
          })(new Bd());
        }
        onAndCancel(e, n, r) {
          return (
            e.addEventListener(n, r, !1),
            () => {
              e.removeEventListener(n, r, !1);
            }
          );
        }
        dispatchEvent(e, n) {
          e.dispatchEvent(n);
        }
        remove(e) {
          e.parentNode && e.parentNode.removeChild(e);
        }
        createElement(e, n) {
          return (n = n || this.getDefaultDocument()).createElement(e);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(e) {
          return e.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(e) {
          return e instanceof DocumentFragment;
        }
        getGlobalEventTarget(e, n) {
          return "window" === n
            ? window
            : "document" === n
            ? e
            : "body" === n
            ? e.body
            : null;
        }
        getBaseHref(e) {
          const n = (function xx() {
            return (
              ($s = $s || document.querySelector("base")),
              $s ? $s.getAttribute("href") : null
            );
          })();
          return null == n
            ? null
            : (function Fx(t) {
                (Ba = Ba || document.createElement("a")),
                  Ba.setAttribute("href", t);
                const e = Ba.pathname;
                return "/" === e.charAt(0) ? e : `/${e}`;
              })(n);
        }
        resetBaseElement() {
          $s = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(e) {
          return (function QN(t, e) {
            e = encodeURIComponent(e);
            for (const n of t.split(";")) {
              const r = n.indexOf("="),
                [i, s] = -1 == r ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
              if (i.trim() === e) return decodeURIComponent(s);
            }
            return null;
          })(document.cookie, e);
        }
      }
      let Ba,
        $s = null;
      const Rv = new q("TRANSITION_ID"),
        Rx = [
          {
            provide: Ca,
            useFactory: function Px(t, e, n) {
              return () => {
                n.get(Ni).donePromise.then(() => {
                  const r = vn(),
                    i = e.querySelectorAll(`style[ng-transition="${t}"]`);
                  for (let s = 0; s < i.length; s++) r.remove(i[s]);
                });
              };
            },
            deps: [Rv, lt, Qe],
            multi: !0,
          },
        ];
      class jd {
        static init() {
          !(function M1(t) {
            yd = t;
          })(new jd());
        }
        addToWindow(e) {
          (re.getAngularTestability = (r, i = !0) => {
            const s = e.findTestabilityInTree(r, i);
            if (null == s)
              throw new Error("Could not find testability for element.");
            return s;
          }),
            (re.getAllAngularTestabilities = () => e.getAllTestabilities()),
            (re.getAllAngularRootElements = () => e.getAllRootElements()),
            re.frameworkStabilizers || (re.frameworkStabilizers = []),
            re.frameworkStabilizers.push((r) => {
              const i = re.getAllAngularTestabilities();
              let s = i.length,
                o = !1;
              const a = function (l) {
                (o = o || l), s--, 0 == s && r(o);
              };
              i.forEach(function (l) {
                l.whenStable(a);
              });
            });
        }
        findTestabilityInTree(e, n, r) {
          if (null == n) return null;
          const i = e.getTestability(n);
          return null != i
            ? i
            : r
            ? vn().isShadowRoot(n)
              ? this.findTestabilityInTree(e, n.host, !0)
              : this.findTestabilityInTree(e, n.parentElement, !0)
            : null;
        }
      }
      let Ox = (() => {
        class t {
          build() {
            return new XMLHttpRequest();
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)();
          }),
          (t.ɵprov = G({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const ja = new q("EventManagerPlugins");
      let Ua = (() => {
        class t {
          constructor(n, r) {
            (this._zone = r),
              (this._eventNameToPlugin = new Map()),
              n.forEach((i) => (i.manager = this)),
              (this._plugins = n.slice().reverse());
          }
          addEventListener(n, r, i) {
            return this._findPluginFor(r).addEventListener(n, r, i);
          }
          addGlobalEventListener(n, r, i) {
            return this._findPluginFor(r).addGlobalEventListener(n, r, i);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(n) {
            const r = this._eventNameToPlugin.get(n);
            if (r) return r;
            const i = this._plugins;
            for (let s = 0; s < i.length; s++) {
              const o = i[s];
              if (o.supports(n)) return this._eventNameToPlugin.set(n, o), o;
            }
            throw new Error(`No event manager plugin found for event ${n}`);
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(T(ja), T(Ae));
          }),
          (t.ɵprov = G({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class Ov {
        constructor(e) {
          this._doc = e;
        }
        addGlobalEventListener(e, n, r) {
          const i = vn().getGlobalEventTarget(this._doc, e);
          if (!i)
            throw new Error(`Unsupported event target ${i} for event ${n}`);
          return this.addEventListener(i, n, r);
        }
      }
      let kv = (() => {
          class t {
            constructor() {
              this._stylesSet = new Set();
            }
            addStyles(n) {
              const r = new Set();
              n.forEach((i) => {
                this._stylesSet.has(i) || (this._stylesSet.add(i), r.add(i));
              }),
                this.onStylesAdded(r);
            }
            onStylesAdded(n) {}
            getAllStyles() {
              return Array.from(this._stylesSet);
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵprov = G({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Gs = (() => {
          class t extends kv {
            constructor(n) {
              super(),
                (this._doc = n),
                (this._hostNodes = new Map()),
                this._hostNodes.set(n.head, []);
            }
            _addStylesToHost(n, r, i) {
              n.forEach((s) => {
                const o = this._doc.createElement("style");
                (o.textContent = s), i.push(r.appendChild(o));
              });
            }
            addHost(n) {
              const r = [];
              this._addStylesToHost(this._stylesSet, n, r),
                this._hostNodes.set(n, r);
            }
            removeHost(n) {
              const r = this._hostNodes.get(n);
              r && r.forEach(Vv), this._hostNodes.delete(n);
            }
            onStylesAdded(n) {
              this._hostNodes.forEach((r, i) => {
                this._addStylesToHost(n, i, r);
              });
            }
            ngOnDestroy() {
              this._hostNodes.forEach((n) => n.forEach(Vv));
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(T(lt));
            }),
            (t.ɵprov = G({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      function Vv(t) {
        vn().remove(t);
      }
      const Ud = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
          math: "http://www.w3.org/1998/MathML/",
        },
        Hd = /%COMP%/g;
      function Ha(t, e, n) {
        for (let r = 0; r < e.length; r++) {
          let i = e[r];
          Array.isArray(i) ? Ha(t, i, n) : ((i = i.replace(Hd, t)), n.push(i));
        }
        return n;
      }
      function jv(t) {
        return (e) => {
          if ("__ngUnwrap__" === e) return t;
          !1 === t(e) && (e.preventDefault(), (e.returnValue = !1));
        };
      }
      let $a = (() => {
        class t {
          constructor(n, r, i) {
            (this.eventManager = n),
              (this.sharedStylesHost = r),
              (this.appId = i),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new $d(n));
          }
          createRenderer(n, r) {
            if (!n || !r) return this.defaultRenderer;
            switch (r.encapsulation) {
              case $t.Emulated: {
                let i = this.rendererByCompId.get(r.id);
                return (
                  i ||
                    ((i = new Ux(
                      this.eventManager,
                      this.sharedStylesHost,
                      r,
                      this.appId
                    )),
                    this.rendererByCompId.set(r.id, i)),
                  i.applyToHost(n),
                  i
                );
              }
              case 1:
              case $t.ShadowDom:
                return new Hx(this.eventManager, this.sharedStylesHost, n, r);
              default:
                if (!this.rendererByCompId.has(r.id)) {
                  const i = Ha(r.id, r.styles, []);
                  this.sharedStylesHost.addStyles(i),
                    this.rendererByCompId.set(r.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
          }
          begin() {}
          end() {}
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(T(Ua), T(Gs), T(ks));
          }),
          (t.ɵprov = G({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class $d {
        constructor(e) {
          (this.eventManager = e),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(e, n) {
          return n
            ? document.createElementNS(Ud[n] || n, e)
            : document.createElement(e);
        }
        createComment(e) {
          return document.createComment(e);
        }
        createText(e) {
          return document.createTextNode(e);
        }
        appendChild(e, n) {
          e.appendChild(n);
        }
        insertBefore(e, n, r) {
          e && e.insertBefore(n, r);
        }
        removeChild(e, n) {
          e && e.removeChild(n);
        }
        selectRootElement(e, n) {
          let r = "string" == typeof e ? document.querySelector(e) : e;
          if (!r)
            throw new Error(`The selector "${e}" did not match any elements`);
          return n || (r.textContent = ""), r;
        }
        parentNode(e) {
          return e.parentNode;
        }
        nextSibling(e) {
          return e.nextSibling;
        }
        setAttribute(e, n, r, i) {
          if (i) {
            n = i + ":" + n;
            const s = Ud[i];
            s ? e.setAttributeNS(s, n, r) : e.setAttribute(n, r);
          } else e.setAttribute(n, r);
        }
        removeAttribute(e, n, r) {
          if (r) {
            const i = Ud[r];
            i ? e.removeAttributeNS(i, n) : e.removeAttribute(`${r}:${n}`);
          } else e.removeAttribute(n);
        }
        addClass(e, n) {
          e.classList.add(n);
        }
        removeClass(e, n) {
          e.classList.remove(n);
        }
        setStyle(e, n, r, i) {
          i & (gt.DashCase | gt.Important)
            ? e.style.setProperty(n, r, i & gt.Important ? "important" : "")
            : (e.style[n] = r);
        }
        removeStyle(e, n, r) {
          r & gt.DashCase ? e.style.removeProperty(n) : (e.style[n] = "");
        }
        setProperty(e, n, r) {
          e[n] = r;
        }
        setValue(e, n) {
          e.nodeValue = n;
        }
        listen(e, n, r) {
          return "string" == typeof e
            ? this.eventManager.addGlobalEventListener(e, n, jv(r))
            : this.eventManager.addEventListener(e, n, jv(r));
        }
      }
      class Ux extends $d {
        constructor(e, n, r, i) {
          super(e), (this.component = r);
          const s = Ha(i + "-" + r.id, r.styles, []);
          n.addStyles(s),
            (this.contentAttr = (function Lx(t) {
              return "_ngcontent-%COMP%".replace(Hd, t);
            })(i + "-" + r.id)),
            (this.hostAttr = (function Bx(t) {
              return "_nghost-%COMP%".replace(Hd, t);
            })(i + "-" + r.id));
        }
        applyToHost(e) {
          super.setAttribute(e, this.hostAttr, "");
        }
        createElement(e, n) {
          const r = super.createElement(e, n);
          return super.setAttribute(r, this.contentAttr, ""), r;
        }
      }
      class Hx extends $d {
        constructor(e, n, r, i) {
          super(e),
            (this.sharedStylesHost = n),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const s = Ha(i.id, i.styles, []);
          for (let o = 0; o < s.length; o++) {
            const a = document.createElement("style");
            (a.textContent = s[o]), this.shadowRoot.appendChild(a);
          }
        }
        nodeOrShadowRoot(e) {
          return e === this.hostEl ? this.shadowRoot : e;
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
        appendChild(e, n) {
          return super.appendChild(this.nodeOrShadowRoot(e), n);
        }
        insertBefore(e, n, r) {
          return super.insertBefore(this.nodeOrShadowRoot(e), n, r);
        }
        removeChild(e, n) {
          return super.removeChild(this.nodeOrShadowRoot(e), n);
        }
        parentNode(e) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(e))
          );
        }
      }
      let $x = (() => {
        class t extends Ov {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return !0;
          }
          addEventListener(n, r, i) {
            return (
              n.addEventListener(r, i, !1),
              () => this.removeEventListener(n, r, i)
            );
          }
          removeEventListener(n, r, i) {
            return n.removeEventListener(r, i);
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(T(lt));
          }),
          (t.ɵprov = G({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const Hv = ["alt", "control", "meta", "shift"],
        qx = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        $v = {
          A: "1",
          B: "2",
          C: "3",
          D: "4",
          E: "5",
          F: "6",
          G: "7",
          H: "8",
          I: "9",
          J: "*",
          K: "+",
          M: "-",
          N: ".",
          O: "/",
          "`": "0",
          "\x90": "NumLock",
        },
        zx = {
          alt: (t) => t.altKey,
          control: (t) => t.ctrlKey,
          meta: (t) => t.metaKey,
          shift: (t) => t.shiftKey,
        };
      let Wx = (() => {
        class t extends Ov {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return null != t.parseEventName(n);
          }
          addEventListener(n, r, i) {
            const s = t.parseEventName(r),
              o = t.eventCallback(s.fullKey, i, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => vn().onAndCancel(n, s.domEventName, o));
          }
          static parseEventName(n) {
            const r = n.toLowerCase().split("."),
              i = r.shift();
            if (0 === r.length || ("keydown" !== i && "keyup" !== i))
              return null;
            const s = t._normalizeKey(r.pop());
            let o = "";
            if (
              (Hv.forEach((l) => {
                const u = r.indexOf(l);
                u > -1 && (r.splice(u, 1), (o += l + "."));
              }),
              (o += s),
              0 != r.length || 0 === s.length)
            )
              return null;
            const a = {};
            return (a.domEventName = i), (a.fullKey = o), a;
          }
          static getEventFullKey(n) {
            let r = "",
              i = (function Qx(t) {
                let e = t.key;
                if (null == e) {
                  if (((e = t.keyIdentifier), null == e)) return "Unidentified";
                  e.startsWith("U+") &&
                    ((e = String.fromCharCode(parseInt(e.substring(2), 16))),
                    3 === t.location && $v.hasOwnProperty(e) && (e = $v[e]));
                }
                return qx[e] || e;
              })(n);
            return (
              (i = i.toLowerCase()),
              " " === i ? (i = "space") : "." === i && (i = "dot"),
              Hv.forEach((s) => {
                s != i && zx[s](n) && (r += s + ".");
              }),
              (r += i),
              r
            );
          }
          static eventCallback(n, r, i) {
            return (s) => {
              t.getEventFullKey(s) === n && i.runGuarded(() => r(s));
            };
          }
          static _normalizeKey(n) {
            return "esc" === n ? "escape" : n;
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(T(lt));
          }),
          (t.ɵprov = G({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const Jx = J_(Z1, "browser", [
          { provide: fd, useValue: "browser" },
          {
            provide: $_,
            useValue: function Kx() {
              Bd.makeCurrent(), jd.init();
            },
            multi: !0,
          },
          {
            provide: lt,
            useFactory: function Yx() {
              return (
                (function ub(t) {
                  iu = t;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        Xx = [
          { provide: vc, useValue: "root" },
          {
            provide: ii,
            useFactory: function Zx() {
              return new ii();
            },
            deps: [],
          },
          { provide: ja, useClass: $x, multi: !0, deps: [lt, Ae, fd] },
          { provide: ja, useClass: Wx, multi: !0, deps: [lt] },
          { provide: $a, useClass: $a, deps: [Ua, Gs, ks] },
          { provide: Is, useExisting: $a },
          { provide: kv, useExisting: Gs },
          { provide: Gs, useClass: Gs, deps: [lt] },
          { provide: md, useClass: md, deps: [Ae] },
          { provide: Ua, useClass: Ua, deps: [ja, Ae] },
          { provide: class Ix {}, useClass: Ox, deps: [] },
        ];
      let Gv = (() => {
        class t {
          constructor(n) {
            if (n)
              throw new Error(
                "BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead."
              );
          }
          static withServerTransition(n) {
            return {
              ngModule: t,
              providers: [
                { provide: ks, useValue: n.appId },
                { provide: Rv, useExisting: ks },
                Rx,
              ],
            };
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(T(t, 12));
          }),
          (t.ɵmod = Gt({ type: t })),
          (t.ɵinj = Tt({ providers: Xx, imports: [Ex, tN] })),
          t
        );
      })();
      function $(...t) {
        return Be(t, Wi(t));
      }
      "undefined" != typeof window && window;
      class rn extends on {
        constructor(e) {
          super(), (this._value = e);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(e) {
          const n = super._subscribe(e);
          return !n.closed && e.next(this._value), n;
        }
        getValue() {
          const { hasError: e, thrownError: n, _value: r } = this;
          if (e) throw n;
          return this._throwIfClosed(), r;
        }
        next(e) {
          super.next((this._value = e));
        }
      }
      const { isArray: cF } = Array,
        { getPrototypeOf: dF, prototype: fF, keys: hF } = Object;
      function Wv(t) {
        if (1 === t.length) {
          const e = t[0];
          if (cF(e)) return { args: e, keys: null };
          if (
            (function pF(t) {
              return t && "object" == typeof t && dF(t) === fF;
            })(e)
          ) {
            const n = hF(e);
            return { args: n.map((r) => e[r]), keys: n };
          }
        }
        return { args: t, keys: null };
      }
      const { isArray: gF } = Array;
      function Qv(t) {
        return oe((e) =>
          (function mF(t, e) {
            return gF(e) ? t(...e) : t(e);
          })(t, e)
        );
      }
      function Kv(t, e) {
        return t.reduce((n, r, i) => ((n[r] = e[i]), n), {});
      }
      function Zv(t, e, n) {
        t ? Sn(n, t, e) : e();
      }
      const Ga = Gi(
        (t) =>
          function () {
            t(this),
              (this.name = "EmptyError"),
              (this.message = "no elements in sequence");
          }
      );
      function qd(...t) {
        return (function vF() {
          return zi(1);
        })()(Be(t, Wi(t)));
      }
      function Yv(t) {
        return new ge((e) => {
          an(t()).subscribe(e);
        });
      }
      function Jv() {
        return He((t, e) => {
          let n = null;
          t._refCount++;
          const r = Ve(e, void 0, void 0, void 0, () => {
            if (!t || t._refCount <= 0 || 0 < --t._refCount)
              return void (n = null);
            const i = t._connection,
              s = n;
            (n = null),
              i && (!s || i === s) && i.unsubscribe(),
              e.unsubscribe();
          });
          t.subscribe(r), r.closed || (n = t.connect());
        });
      }
      class DF extends ge {
        constructor(e, n) {
          super(),
            (this.source = e),
            (this.subjectFactory = n),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            vh(e) && (this.lift = e.lift);
        }
        _subscribe(e) {
          return this.getSubject().subscribe(e);
        }
        getSubject() {
          const e = this._subject;
          return (
            (!e || e.isStopped) && (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        _teardown() {
          this._refCount = 0;
          const { _connection: e } = this;
          (this._subject = this._connection = null),
            null == e || e.unsubscribe();
        }
        connect() {
          let e = this._connection;
          if (!e) {
            e = this._connection = new Mt();
            const n = this.getSubject();
            e.add(
              this.source.subscribe(
                Ve(
                  n,
                  void 0,
                  () => {
                    this._teardown(), n.complete();
                  },
                  (r) => {
                    this._teardown(), n.error(r);
                  },
                  () => this._teardown()
                )
              )
            ),
              e.closed && ((this._connection = null), (e = Mt.EMPTY));
          }
          return e;
        }
        refCount() {
          return Jv()(this);
        }
      }
      function Mr(t, e) {
        return He((n, r) => {
          let i = null,
            s = 0,
            o = !1;
          const a = () => o && !i && r.complete();
          n.subscribe(
            Ve(
              r,
              (l) => {
                null == i || i.unsubscribe();
                let u = 0;
                const c = s++;
                an(t(l, c)).subscribe(
                  (i = Ve(
                    r,
                    (d) => r.next(e ? e(l, d, c, u++) : d),
                    () => {
                      (i = null), a();
                    }
                  ))
                );
              },
              () => {
                (o = !0), a();
              }
            )
          );
        });
      }
      function EF(t, e, n, r, i) {
        return (s, o) => {
          let a = n,
            l = e,
            u = 0;
          s.subscribe(
            Ve(
              o,
              (c) => {
                const d = u++;
                (l = a ? t(l, c, d) : ((a = !0), c)), r && o.next(l);
              },
              i &&
                (() => {
                  a && o.next(l), o.complete();
                })
            )
          );
        };
      }
      function Xv(t, e) {
        return He(EF(t, e, arguments.length >= 2, !0));
      }
      function Fi(t, e) {
        return He((n, r) => {
          let i = 0;
          n.subscribe(Ve(r, (s) => t.call(e, s, i++) && r.next(s)));
        });
      }
      function tr(t) {
        return He((e, n) => {
          let s,
            r = null,
            i = !1;
          (r = e.subscribe(
            Ve(n, void 0, void 0, (o) => {
              (s = an(t(o, tr(t)(e)))),
                r ? (r.unsubscribe(), (r = null), s.subscribe(n)) : (i = !0);
            })
          )),
            i && (r.unsubscribe(), (r = null), s.subscribe(n));
        });
      }
      function qs(t, e) {
        return ce(e) ? Le(t, e, 1) : Le(t, 1);
      }
      function zd(t) {
        return t <= 0
          ? () => An
          : He((e, n) => {
              let r = [];
              e.subscribe(
                Ve(
                  n,
                  (i) => {
                    r.push(i), t < r.length && r.shift();
                  },
                  () => {
                    for (const i of r) n.next(i);
                    n.complete();
                  },
                  void 0,
                  () => {
                    r = null;
                  }
                )
              );
            });
      }
      function eD(t = wF) {
        return He((e, n) => {
          let r = !1;
          e.subscribe(
            Ve(
              n,
              (i) => {
                (r = !0), n.next(i);
              },
              () => (r ? n.complete() : n.error(t()))
            )
          );
        });
      }
      function wF() {
        return new Ga();
      }
      function tD(t) {
        return He((e, n) => {
          let r = !1;
          e.subscribe(
            Ve(
              n,
              (i) => {
                (r = !0), n.next(i);
              },
              () => {
                r || n.next(t), n.complete();
              }
            )
          );
        });
      }
      function Pi(t, e) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            t ? Fi((i, s) => t(i, s, r)) : fr,
            _o(1),
            n ? tD(e) : eD(() => new Ga())
          );
      }
      function vt(t, e, n) {
        const r = ce(t) || e || n ? { next: t, error: e, complete: n } : t;
        return r
          ? He((i, s) => {
              var o;
              null === (o = r.subscribe) || void 0 === o || o.call(r);
              let a = !0;
              i.subscribe(
                Ve(
                  s,
                  (l) => {
                    var u;
                    null === (u = r.next) || void 0 === u || u.call(r, l),
                      s.next(l);
                  },
                  () => {
                    var l;
                    (a = !1),
                      null === (l = r.complete) || void 0 === l || l.call(r),
                      s.complete();
                  },
                  (l) => {
                    var u;
                    (a = !1),
                      null === (u = r.error) || void 0 === u || u.call(r, l),
                      s.error(l);
                  },
                  () => {
                    var l, u;
                    a &&
                      (null === (l = r.unsubscribe) ||
                        void 0 === l ||
                        l.call(r)),
                      null === (u = r.finalize) || void 0 === u || u.call(r);
                  }
                )
              );
            })
          : fr;
      }
      class jn {
        constructor(e, n) {
          (this.id = e), (this.url = n);
        }
      }
      class Wd extends jn {
        constructor(e, n, r = "imperative", i = null) {
          super(e, n), (this.navigationTrigger = r), (this.restoredState = i);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class zs extends jn {
        constructor(e, n, r) {
          super(e, n), (this.urlAfterRedirects = r);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class nD extends jn {
        constructor(e, n, r) {
          super(e, n), (this.reason = r);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class AF extends jn {
        constructor(e, n, r) {
          super(e, n), (this.error = r);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class MF extends jn {
        constructor(e, n, r, i) {
          super(e, n), (this.urlAfterRedirects = r), (this.state = i);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class TF extends jn {
        constructor(e, n, r, i) {
          super(e, n), (this.urlAfterRedirects = r), (this.state = i);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class IF extends jn {
        constructor(e, n, r, i, s) {
          super(e, n),
            (this.urlAfterRedirects = r),
            (this.state = i),
            (this.shouldActivate = s);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class NF extends jn {
        constructor(e, n, r, i) {
          super(e, n), (this.urlAfterRedirects = r), (this.state = i);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class xF extends jn {
        constructor(e, n, r, i) {
          super(e, n), (this.urlAfterRedirects = r), (this.state = i);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class rD {
        constructor(e) {
          this.route = e;
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class iD {
        constructor(e) {
          this.route = e;
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class FF {
        constructor(e) {
          this.snapshot = e;
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class PF {
        constructor(e) {
          this.snapshot = e;
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class RF {
        constructor(e) {
          this.snapshot = e;
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class OF {
        constructor(e) {
          this.snapshot = e;
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class sD {
        constructor(e, n, r) {
          (this.routerEvent = e), (this.position = n), (this.anchor = r);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      const W = "primary";
      class kF {
        constructor(e) {
          this.params = e || {};
        }
        has(e) {
          return Object.prototype.hasOwnProperty.call(this.params, e);
        }
        get(e) {
          if (this.has(e)) {
            const n = this.params[e];
            return Array.isArray(n) ? n[0] : n;
          }
          return null;
        }
        getAll(e) {
          if (this.has(e)) {
            const n = this.params[e];
            return Array.isArray(n) ? n : [n];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function Ri(t) {
        return new kF(t);
      }
      const oD = "ngNavigationCancelingError";
      function Qd(t) {
        const e = Error("NavigationCancelingError: " + t);
        return (e[oD] = !0), e;
      }
      function LF(t, e, n) {
        const r = n.path.split("/");
        if (
          r.length > t.length ||
          ("full" === n.pathMatch && (e.hasChildren() || r.length < t.length))
        )
          return null;
        const i = {};
        for (let s = 0; s < r.length; s++) {
          const o = r[s],
            a = t[s];
          if (o.startsWith(":")) i[o.substring(1)] = a;
          else if (o !== a.path) return null;
        }
        return { consumed: t.slice(0, r.length), posParams: i };
      }
      function Dn(t, e) {
        const n = t ? Object.keys(t) : void 0,
          r = e ? Object.keys(e) : void 0;
        if (!n || !r || n.length != r.length) return !1;
        let i;
        for (let s = 0; s < n.length; s++)
          if (((i = n[s]), !aD(t[i], e[i]))) return !1;
        return !0;
      }
      function aD(t, e) {
        if (Array.isArray(t) && Array.isArray(e)) {
          if (t.length !== e.length) return !1;
          const n = [...t].sort(),
            r = [...e].sort();
          return n.every((i, s) => r[s] === i);
        }
        return t === e;
      }
      function lD(t) {
        return Array.prototype.concat.apply([], t);
      }
      function uD(t) {
        return t.length > 0 ? t[t.length - 1] : null;
      }
      function $e(t, e) {
        for (const n in t) t.hasOwnProperty(n) && e(t[n], n);
      }
      function Cn(t) {
        return Rc(t) ? t : ws(t) ? Be(Promise.resolve(t)) : $(t);
      }
      const UF = {
          exact: function fD(t, e, n) {
            if (
              !Ir(t.segments, e.segments) ||
              !qa(t.segments, e.segments, n) ||
              t.numberOfChildren !== e.numberOfChildren
            )
              return !1;
            for (const r in e.children)
              if (!t.children[r] || !fD(t.children[r], e.children[r], n))
                return !1;
            return !0;
          },
          subset: hD,
        },
        cD = {
          exact: function HF(t, e) {
            return Dn(t, e);
          },
          subset: function $F(t, e) {
            return (
              Object.keys(e).length <= Object.keys(t).length &&
              Object.keys(e).every((n) => aD(t[n], e[n]))
            );
          },
          ignored: () => !0,
        };
      function dD(t, e, n) {
        return (
          UF[n.paths](t.root, e.root, n.matrixParams) &&
          cD[n.queryParams](t.queryParams, e.queryParams) &&
          !("exact" === n.fragment && t.fragment !== e.fragment)
        );
      }
      function hD(t, e, n) {
        return pD(t, e, e.segments, n);
      }
      function pD(t, e, n, r) {
        if (t.segments.length > n.length) {
          const i = t.segments.slice(0, n.length);
          return !(!Ir(i, n) || e.hasChildren() || !qa(i, n, r));
        }
        if (t.segments.length === n.length) {
          if (!Ir(t.segments, n) || !qa(t.segments, n, r)) return !1;
          for (const i in e.children)
            if (!t.children[i] || !hD(t.children[i], e.children[i], r))
              return !1;
          return !0;
        }
        {
          const i = n.slice(0, t.segments.length),
            s = n.slice(t.segments.length);
          return (
            !!(Ir(t.segments, i) && qa(t.segments, i, r) && t.children[W]) &&
            pD(t.children[W], e, s, r)
          );
        }
      }
      function qa(t, e, n) {
        return e.every((r, i) => cD[n](t[i].parameters, r.parameters));
      }
      class Tr {
        constructor(e, n, r) {
          (this.root = e), (this.queryParams = n), (this.fragment = r);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Ri(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return zF.serialize(this);
        }
      }
      class K {
        constructor(e, n) {
          (this.segments = e),
            (this.children = n),
            (this.parent = null),
            $e(n, (r, i) => (r.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return za(this);
        }
      }
      class Ws {
        constructor(e, n) {
          (this.path = e), (this.parameters = n);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = Ri(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return vD(this);
        }
      }
      function Ir(t, e) {
        return t.length === e.length && t.every((n, r) => n.path === e[r].path);
      }
      class gD {}
      class mD {
        parse(e) {
          const n = new tP(e);
          return new Tr(
            n.parseRootSegment(),
            n.parseQueryParams(),
            n.parseFragment()
          );
        }
        serialize(e) {
          const n = `/${Qs(e.root, !0)}`,
            r = (function KF(t) {
              const e = Object.keys(t)
                .map((n) => {
                  const r = t[n];
                  return Array.isArray(r)
                    ? r.map((i) => `${Wa(n)}=${Wa(i)}`).join("&")
                    : `${Wa(n)}=${Wa(r)}`;
                })
                .filter((n) => !!n);
              return e.length ? `?${e.join("&")}` : "";
            })(e.queryParams);
          return `${n}${r}${
            "string" == typeof e.fragment
              ? `#${(function WF(t) {
                  return encodeURI(t);
                })(e.fragment)}`
              : ""
          }`;
        }
      }
      const zF = new mD();
      function za(t) {
        return t.segments.map((e) => vD(e)).join("/");
      }
      function Qs(t, e) {
        if (!t.hasChildren()) return za(t);
        if (e) {
          const n = t.children[W] ? Qs(t.children[W], !1) : "",
            r = [];
          return (
            $e(t.children, (i, s) => {
              s !== W && r.push(`${s}:${Qs(i, !1)}`);
            }),
            r.length > 0 ? `${n}(${r.join("//")})` : n
          );
        }
        {
          const n = (function qF(t, e) {
            let n = [];
            return (
              $e(t.children, (r, i) => {
                i === W && (n = n.concat(e(r, i)));
              }),
              $e(t.children, (r, i) => {
                i !== W && (n = n.concat(e(r, i)));
              }),
              n
            );
          })(t, (r, i) =>
            i === W ? [Qs(t.children[W], !1)] : [`${i}:${Qs(r, !1)}`]
          );
          return 1 === Object.keys(t.children).length && null != t.children[W]
            ? `${za(t)}/${n[0]}`
            : `${za(t)}/(${n.join("//")})`;
        }
      }
      function yD(t) {
        return encodeURIComponent(t)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function Wa(t) {
        return yD(t).replace(/%3B/gi, ";");
      }
      function Kd(t) {
        return yD(t)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function Qa(t) {
        return decodeURIComponent(t);
      }
      function _D(t) {
        return Qa(t.replace(/\+/g, "%20"));
      }
      function vD(t) {
        return `${Kd(t.path)}${(function QF(t) {
          return Object.keys(t)
            .map((e) => `;${Kd(e)}=${Kd(t[e])}`)
            .join("");
        })(t.parameters)}`;
      }
      const ZF = /^[^\/()?;=#]+/;
      function Ka(t) {
        const e = t.match(ZF);
        return e ? e[0] : "";
      }
      const YF = /^[^=?&#]+/,
        XF = /^[^&#]+/;
      class tP {
        constructor(e) {
          (this.url = e), (this.remaining = e);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new K([], {})
              : new K([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const e = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(e);
            } while (this.consumeOptional("&"));
          return e;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const e = [];
          for (
            this.peekStartsWith("(") || e.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), e.push(this.parseSegment());
          let n = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (n = this.parseParens(!0)));
          let r = {};
          return (
            this.peekStartsWith("(") && (r = this.parseParens(!1)),
            (e.length > 0 || Object.keys(n).length > 0) && (r[W] = new K(e, n)),
            r
          );
        }
        parseSegment() {
          const e = Ka(this.remaining);
          if ("" === e && this.peekStartsWith(";"))
            throw new Error(
              `Empty path url segment cannot have parameters: '${this.remaining}'.`
            );
          return this.capture(e), new Ws(Qa(e), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const e = {};
          for (; this.consumeOptional(";"); ) this.parseParam(e);
          return e;
        }
        parseParam(e) {
          const n = Ka(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const i = Ka(this.remaining);
            i && ((r = i), this.capture(r));
          }
          e[Qa(n)] = Qa(r);
        }
        parseQueryParam(e) {
          const n = (function JF(t) {
            const e = t.match(YF);
            return e ? e[0] : "";
          })(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const o = (function eP(t) {
              const e = t.match(XF);
              return e ? e[0] : "";
            })(this.remaining);
            o && ((r = o), this.capture(r));
          }
          const i = _D(n),
            s = _D(r);
          if (e.hasOwnProperty(i)) {
            let o = e[i];
            Array.isArray(o) || ((o = [o]), (e[i] = o)), o.push(s);
          } else e[i] = s;
        }
        parseParens(e) {
          const n = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const r = Ka(this.remaining),
              i = this.remaining[r.length];
            if ("/" !== i && ")" !== i && ";" !== i)
              throw new Error(`Cannot parse url '${this.url}'`);
            let s;
            r.indexOf(":") > -1
              ? ((s = r.substr(0, r.indexOf(":"))),
                this.capture(s),
                this.capture(":"))
              : e && (s = W);
            const o = this.parseChildren();
            (n[s] = 1 === Object.keys(o).length ? o[W] : new K([], o)),
              this.consumeOptional("//");
          }
          return n;
        }
        peekStartsWith(e) {
          return this.remaining.startsWith(e);
        }
        consumeOptional(e) {
          return (
            !!this.peekStartsWith(e) &&
            ((this.remaining = this.remaining.substring(e.length)), !0)
          );
        }
        capture(e) {
          if (!this.consumeOptional(e)) throw new Error(`Expected "${e}".`);
        }
      }
      class DD {
        constructor(e) {
          this._root = e;
        }
        get root() {
          return this._root.value;
        }
        parent(e) {
          const n = this.pathFromRoot(e);
          return n.length > 1 ? n[n.length - 2] : null;
        }
        children(e) {
          const n = Zd(e, this._root);
          return n ? n.children.map((r) => r.value) : [];
        }
        firstChild(e) {
          const n = Zd(e, this._root);
          return n && n.children.length > 0 ? n.children[0].value : null;
        }
        siblings(e) {
          const n = Yd(e, this._root);
          return n.length < 2
            ? []
            : n[n.length - 2].children
                .map((i) => i.value)
                .filter((i) => i !== e);
        }
        pathFromRoot(e) {
          return Yd(e, this._root).map((n) => n.value);
        }
      }
      function Zd(t, e) {
        if (t === e.value) return e;
        for (const n of e.children) {
          const r = Zd(t, n);
          if (r) return r;
        }
        return null;
      }
      function Yd(t, e) {
        if (t === e.value) return [e];
        for (const n of e.children) {
          const r = Yd(t, n);
          if (r.length) return r.unshift(e), r;
        }
        return [];
      }
      class Un {
        constructor(e, n) {
          (this.value = e), (this.children = n);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function Oi(t) {
        const e = {};
        return t && t.children.forEach((n) => (e[n.value.outlet] = n)), e;
      }
      class CD extends DD {
        constructor(e, n) {
          super(e), (this.snapshot = n), Jd(this, e);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function ED(t, e) {
        const n = (function nP(t, e) {
            const o = new Za([], {}, {}, "", {}, W, e, null, t.root, -1, {});
            return new bD("", new Un(o, []));
          })(t, e),
          r = new rn([new Ws("", {})]),
          i = new rn({}),
          s = new rn({}),
          o = new rn({}),
          a = new rn(""),
          l = new ki(r, i, o, a, s, W, e, n.root);
        return (l.snapshot = n.root), new CD(new Un(l, []), n);
      }
      class ki {
        constructor(e, n, r, i, s, o, a, l) {
          (this.url = e),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = i),
            (this.data = s),
            (this.outlet = o),
            (this.component = a),
            (this._futureSnapshot = l);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(oe((e) => Ri(e)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(oe((e) => Ri(e)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function wD(t, e = "emptyOnly") {
        const n = t.pathFromRoot;
        let r = 0;
        if ("always" !== e)
          for (r = n.length - 1; r >= 1; ) {
            const i = n[r],
              s = n[r - 1];
            if (i.routeConfig && "" === i.routeConfig.path) r--;
            else {
              if (s.component) break;
              r--;
            }
          }
        return (function rP(t) {
          return t.reduce(
            (e, n) => ({
              params: Object.assign(Object.assign({}, e.params), n.params),
              data: Object.assign(Object.assign({}, e.data), n.data),
              resolve: Object.assign(
                Object.assign({}, e.resolve),
                n._resolvedData
              ),
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(n.slice(r));
      }
      class Za {
        constructor(e, n, r, i, s, o, a, l, u, c, d) {
          (this.url = e),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = i),
            (this.data = s),
            (this.outlet = o),
            (this.component = a),
            (this.routeConfig = l),
            (this._urlSegment = u),
            (this._lastPathIndex = c),
            (this._resolve = d);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = Ri(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Ri(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((r) => r.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`;
        }
      }
      class bD extends DD {
        constructor(e, n) {
          super(n), (this.url = e), Jd(this, n);
        }
        toString() {
          return SD(this._root);
        }
      }
      function Jd(t, e) {
        (e.value._routerState = t), e.children.forEach((n) => Jd(t, n));
      }
      function SD(t) {
        const e =
          t.children.length > 0 ? ` { ${t.children.map(SD).join(", ")} } ` : "";
        return `${t.value}${e}`;
      }
      function Xd(t) {
        if (t.snapshot) {
          const e = t.snapshot,
            n = t._futureSnapshot;
          (t.snapshot = n),
            Dn(e.queryParams, n.queryParams) ||
              t.queryParams.next(n.queryParams),
            e.fragment !== n.fragment && t.fragment.next(n.fragment),
            Dn(e.params, n.params) || t.params.next(n.params),
            (function BF(t, e) {
              if (t.length !== e.length) return !1;
              for (let n = 0; n < t.length; ++n) if (!Dn(t[n], e[n])) return !1;
              return !0;
            })(e.url, n.url) || t.url.next(n.url),
            Dn(e.data, n.data) || t.data.next(n.data);
        } else
          (t.snapshot = t._futureSnapshot), t.data.next(t._futureSnapshot.data);
      }
      function ef(t, e) {
        const n =
          Dn(t.params, e.params) &&
          (function GF(t, e) {
            return (
              Ir(t, e) && t.every((n, r) => Dn(n.parameters, e[r].parameters))
            );
          })(t.url, e.url);
        return (
          n &&
          !(!t.parent != !e.parent) &&
          (!t.parent || ef(t.parent, e.parent))
        );
      }
      function Ks(t, e, n) {
        if (n && t.shouldReuseRoute(e.value, n.value.snapshot)) {
          const r = n.value;
          r._futureSnapshot = e.value;
          const i = (function sP(t, e, n) {
            return e.children.map((r) => {
              for (const i of n.children)
                if (t.shouldReuseRoute(r.value, i.value.snapshot))
                  return Ks(t, r, i);
              return Ks(t, r);
            });
          })(t, e, n);
          return new Un(r, i);
        }
        {
          if (t.shouldAttach(e.value)) {
            const s = t.retrieve(e.value);
            if (null !== s) {
              const o = s.route;
              return (
                (o.value._futureSnapshot = e.value),
                (o.children = e.children.map((a) => Ks(t, a))),
                o
              );
            }
          }
          const r = (function oP(t) {
              return new ki(
                new rn(t.url),
                new rn(t.params),
                new rn(t.queryParams),
                new rn(t.fragment),
                new rn(t.data),
                t.outlet,
                t.component,
                t
              );
            })(e.value),
            i = e.children.map((s) => Ks(t, s));
          return new Un(r, i);
        }
      }
      function Ya(t) {
        return (
          "object" == typeof t && null != t && !t.outlets && !t.segmentPath
        );
      }
      function Zs(t) {
        return "object" == typeof t && null != t && t.outlets;
      }
      function tf(t, e, n, r, i) {
        let s = {};
        return (
          r &&
            $e(r, (o, a) => {
              s[a] = Array.isArray(o) ? o.map((l) => `${l}`) : `${o}`;
            }),
          new Tr(n.root === t ? e : AD(n.root, t, e), s, i)
        );
      }
      function AD(t, e, n) {
        const r = {};
        return (
          $e(t.children, (i, s) => {
            r[s] = i === e ? n : AD(i, e, n);
          }),
          new K(t.segments, r)
        );
      }
      class MD {
        constructor(e, n, r) {
          if (
            ((this.isAbsolute = e),
            (this.numberOfDoubleDots = n),
            (this.commands = r),
            e && r.length > 0 && Ya(r[0]))
          )
            throw new Error("Root segment cannot have matrix parameters");
          const i = r.find(Zs);
          if (i && i !== uD(r))
            throw new Error("{outlets:{}} has to be the last command");
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class nf {
        constructor(e, n, r) {
          (this.segmentGroup = e), (this.processChildren = n), (this.index = r);
        }
      }
      function TD(t, e, n) {
        if (
          (t || (t = new K([], {})), 0 === t.segments.length && t.hasChildren())
        )
          return Ja(t, e, n);
        const r = (function fP(t, e, n) {
            let r = 0,
              i = e;
            const s = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; i < t.segments.length; ) {
              if (r >= n.length) return s;
              const o = t.segments[i],
                a = n[r];
              if (Zs(a)) break;
              const l = `${a}`,
                u = r < n.length - 1 ? n[r + 1] : null;
              if (i > 0 && void 0 === l) break;
              if (l && u && "object" == typeof u && void 0 === u.outlets) {
                if (!ND(l, u, o)) return s;
                r += 2;
              } else {
                if (!ND(l, {}, o)) return s;
                r++;
              }
              i++;
            }
            return { match: !0, pathIndex: i, commandIndex: r };
          })(t, e, n),
          i = n.slice(r.commandIndex);
        if (r.match && r.pathIndex < t.segments.length) {
          const s = new K(t.segments.slice(0, r.pathIndex), {});
          return (
            (s.children[W] = new K(t.segments.slice(r.pathIndex), t.children)),
            Ja(s, 0, i)
          );
        }
        return r.match && 0 === i.length
          ? new K(t.segments, {})
          : r.match && !t.hasChildren()
          ? rf(t, e, n)
          : r.match
          ? Ja(t, 0, i)
          : rf(t, e, n);
      }
      function Ja(t, e, n) {
        if (0 === n.length) return new K(t.segments, {});
        {
          const r = (function dP(t) {
              return Zs(t[0]) ? t[0].outlets : { [W]: t };
            })(n),
            i = {};
          return (
            $e(r, (s, o) => {
              "string" == typeof s && (s = [s]),
                null !== s && (i[o] = TD(t.children[o], e, s));
            }),
            $e(t.children, (s, o) => {
              void 0 === r[o] && (i[o] = s);
            }),
            new K(t.segments, i)
          );
        }
      }
      function rf(t, e, n) {
        const r = t.segments.slice(0, e);
        let i = 0;
        for (; i < n.length; ) {
          const s = n[i];
          if (Zs(s)) {
            const l = hP(s.outlets);
            return new K(r, l);
          }
          if (0 === i && Ya(n[0])) {
            r.push(new Ws(t.segments[e].path, ID(n[0]))), i++;
            continue;
          }
          const o = Zs(s) ? s.outlets[W] : `${s}`,
            a = i < n.length - 1 ? n[i + 1] : null;
          o && a && Ya(a)
            ? (r.push(new Ws(o, ID(a))), (i += 2))
            : (r.push(new Ws(o, {})), i++);
        }
        return new K(r, {});
      }
      function hP(t) {
        const e = {};
        return (
          $e(t, (n, r) => {
            "string" == typeof n && (n = [n]),
              null !== n && (e[r] = rf(new K([], {}), 0, n));
          }),
          e
        );
      }
      function ID(t) {
        const e = {};
        return $e(t, (n, r) => (e[r] = `${n}`)), e;
      }
      function ND(t, e, n) {
        return t == n.path && Dn(e, n.parameters);
      }
      class gP {
        constructor(e, n, r, i) {
          (this.routeReuseStrategy = e),
            (this.futureState = n),
            (this.currState = r),
            (this.forwardEvent = i);
        }
        activate(e) {
          const n = this.futureState._root,
            r = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(n, r, e),
            Xd(this.futureState.root),
            this.activateChildRoutes(n, r, e);
        }
        deactivateChildRoutes(e, n, r) {
          const i = Oi(n);
          e.children.forEach((s) => {
            const o = s.value.outlet;
            this.deactivateRoutes(s, i[o], r), delete i[o];
          }),
            $e(i, (s, o) => {
              this.deactivateRouteAndItsChildren(s, r);
            });
        }
        deactivateRoutes(e, n, r) {
          const i = e.value,
            s = n ? n.value : null;
          if (i === s)
            if (i.component) {
              const o = r.getContext(i.outlet);
              o && this.deactivateChildRoutes(e, n, o.children);
            } else this.deactivateChildRoutes(e, n, r);
          else s && this.deactivateRouteAndItsChildren(n, r);
        }
        deactivateRouteAndItsChildren(e, n) {
          e.value.component &&
          this.routeReuseStrategy.shouldDetach(e.value.snapshot)
            ? this.detachAndStoreRouteSubtree(e, n)
            : this.deactivateRouteAndOutlet(e, n);
        }
        detachAndStoreRouteSubtree(e, n) {
          const r = n.getContext(e.value.outlet),
            i = r && e.value.component ? r.children : n,
            s = Oi(e);
          for (const o of Object.keys(s))
            this.deactivateRouteAndItsChildren(s[o], i);
          if (r && r.outlet) {
            const o = r.outlet.detach(),
              a = r.children.onOutletDeactivated();
            this.routeReuseStrategy.store(e.value.snapshot, {
              componentRef: o,
              route: e,
              contexts: a,
            });
          }
        }
        deactivateRouteAndOutlet(e, n) {
          const r = n.getContext(e.value.outlet),
            i = r && e.value.component ? r.children : n,
            s = Oi(e);
          for (const o of Object.keys(s))
            this.deactivateRouteAndItsChildren(s[o], i);
          r &&
            r.outlet &&
            (r.outlet.deactivate(),
            r.children.onOutletDeactivated(),
            (r.attachRef = null),
            (r.resolver = null),
            (r.route = null));
        }
        activateChildRoutes(e, n, r) {
          const i = Oi(n);
          e.children.forEach((s) => {
            this.activateRoutes(s, i[s.value.outlet], r),
              this.forwardEvent(new OF(s.value.snapshot));
          }),
            e.children.length && this.forwardEvent(new PF(e.value.snapshot));
        }
        activateRoutes(e, n, r) {
          const i = e.value,
            s = n ? n.value : null;
          if ((Xd(i), i === s))
            if (i.component) {
              const o = r.getOrCreateContext(i.outlet);
              this.activateChildRoutes(e, n, o.children);
            } else this.activateChildRoutes(e, n, r);
          else if (i.component) {
            const o = r.getOrCreateContext(i.outlet);
            if (this.routeReuseStrategy.shouldAttach(i.snapshot)) {
              const a = this.routeReuseStrategy.retrieve(i.snapshot);
              this.routeReuseStrategy.store(i.snapshot, null),
                o.children.onOutletReAttached(a.contexts),
                (o.attachRef = a.componentRef),
                (o.route = a.route.value),
                o.outlet && o.outlet.attach(a.componentRef, a.route.value),
                Xd(a.route.value),
                this.activateChildRoutes(e, null, o.children);
            } else {
              const a = (function mP(t) {
                  for (let e = t.parent; e; e = e.parent) {
                    const n = e.routeConfig;
                    if (n && n._loadedConfig) return n._loadedConfig;
                    if (n && n.component) return null;
                  }
                  return null;
                })(i.snapshot),
                l = a ? a.module.componentFactoryResolver : null;
              (o.attachRef = null),
                (o.route = i),
                (o.resolver = l),
                o.outlet && o.outlet.activateWith(i, l),
                this.activateChildRoutes(e, null, o.children);
            }
          } else this.activateChildRoutes(e, null, r);
        }
      }
      class sf {
        constructor(e, n) {
          (this.routes = e), (this.module = n);
        }
      }
      function nr(t) {
        return "function" == typeof t;
      }
      function Nr(t) {
        return t instanceof Tr;
      }
      const Ys = Symbol("INITIAL_VALUE");
      function Js() {
        return Mr((t) =>
          (function yF(...t) {
            const e = Wi(t),
              n = Ph(t),
              { args: r, keys: i } = Wv(t);
            if (0 === r.length) return Be([], e);
            const s = new ge(
              (function _F(t, e, n = fr) {
                return (r) => {
                  Zv(
                    e,
                    () => {
                      const { length: i } = t,
                        s = new Array(i);
                      let o = i,
                        a = i;
                      for (let l = 0; l < i; l++)
                        Zv(
                          e,
                          () => {
                            const u = Be(t[l], e);
                            let c = !1;
                            u.subscribe(
                              Ve(
                                r,
                                (d) => {
                                  (s[l] = d),
                                    c || ((c = !0), a--),
                                    a || r.next(n(s.slice()));
                                },
                                () => {
                                  --o || r.complete();
                                }
                              )
                            );
                          },
                          r
                        );
                    },
                    r
                  );
                };
              })(r, e, i ? (o) => Kv(i, o) : fr)
            );
            return n ? s.pipe(Qv(n)) : s;
          })(
            t.map((e) =>
              e.pipe(
                _o(1),
                (function CF(...t) {
                  const e = Wi(t);
                  return He((n, r) => {
                    (e ? qd(t, n, e) : qd(t, n)).subscribe(r);
                  });
                })(Ys)
              )
            )
          ).pipe(
            Xv((e, n) => {
              let r = !1;
              return n.reduce(
                (i, s, o) =>
                  i !== Ys
                    ? i
                    : (s === Ys && (r = !0),
                      r || (!1 !== s && o !== n.length - 1 && !Nr(s)) ? i : s),
                e
              );
            }, Ys),
            Fi((e) => e !== Ys),
            oe((e) => (Nr(e) ? e : !0 === e)),
            _o(1)
          )
        );
      }
      class EP {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.children = new Xs()),
            (this.attachRef = null);
        }
      }
      class Xs {
        constructor() {
          this.contexts = new Map();
        }
        onChildOutletCreated(e, n) {
          const r = this.getOrCreateContext(e);
          (r.outlet = n), this.contexts.set(e, r);
        }
        onChildOutletDestroyed(e) {
          const n = this.getContext(e);
          n && ((n.outlet = null), (n.attachRef = null));
        }
        onOutletDeactivated() {
          const e = this.contexts;
          return (this.contexts = new Map()), e;
        }
        onOutletReAttached(e) {
          this.contexts = e;
        }
        getOrCreateContext(e) {
          let n = this.getContext(e);
          return n || ((n = new EP()), this.contexts.set(e, n)), n;
        }
        getContext(e) {
          return this.contexts.get(e) || null;
        }
      }
      let of = (() => {
        class t {
          constructor(n, r, i, s, o) {
            (this.parentContexts = n),
              (this.location = r),
              (this.resolver = i),
              (this.changeDetector = o),
              (this.activated = null),
              (this._activatedRoute = null),
              (this.activateEvents = new be()),
              (this.deactivateEvents = new be()),
              (this.attachEvents = new be()),
              (this.detachEvents = new be()),
              (this.name = s || W),
              n.onChildOutletCreated(this.name, this);
          }
          ngOnDestroy() {
            this.parentContexts.onChildOutletDestroyed(this.name);
          }
          ngOnInit() {
            if (!this.activated) {
              const n = this.parentContexts.getContext(this.name);
              n &&
                n.route &&
                (n.attachRef
                  ? this.attach(n.attachRef, n.route)
                  : this.activateWith(n.route, n.resolver || null));
            }
          }
          get isActivated() {
            return !!this.activated;
          }
          get component() {
            if (!this.activated) throw new Error("Outlet is not activated");
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new Error("Outlet is not activated");
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {};
          }
          detach() {
            if (!this.activated) throw new Error("Outlet is not activated");
            this.location.detach();
            const n = this.activated;
            return (
              (this.activated = null),
              (this._activatedRoute = null),
              this.detachEvents.emit(n.instance),
              n
            );
          }
          attach(n, r) {
            (this.activated = n),
              (this._activatedRoute = r),
              this.location.insert(n.hostView),
              this.attachEvents.emit(n.instance);
          }
          deactivate() {
            if (this.activated) {
              const n = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(n);
            }
          }
          activateWith(n, r) {
            if (this.isActivated)
              throw new Error("Cannot activate an already activated outlet");
            this._activatedRoute = n;
            const o = (r = r || this.resolver).resolveComponentFactory(
                n._futureSnapshot.routeConfig.component
              ),
              a = this.parentContexts.getOrCreateContext(this.name).children,
              l = new wP(n, a, this.location.injector);
            (this.activated = this.location.createComponent(
              o,
              this.location.length,
              l
            )),
              this.changeDetector.markForCheck(),
              this.activateEvents.emit(this.activated.instance);
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(
              D(Xs),
              D(Xt),
              D(Ai),
              (function rs(t) {
                return (function jb(t, e) {
                  if ("class" === e) return t.classes;
                  if ("style" === e) return t.styles;
                  const n = t.attrs;
                  if (n) {
                    const r = n.length;
                    let i = 0;
                    for (; i < r; ) {
                      const s = n[i];
                      if (dp(s)) break;
                      if (0 === s) i += 2;
                      else if ("number" == typeof s)
                        for (i++; i < r && "string" == typeof n[i]; ) i++;
                      else {
                        if (s === e) return n[i + 1];
                        i += 2;
                      }
                    }
                  }
                  return null;
                })(Pe(), t);
              })("name"),
              D(wa)
            );
          }),
          (t.ɵdir = P({
            type: t,
            selectors: [["router-outlet"]],
            outputs: {
              activateEvents: "activate",
              deactivateEvents: "deactivate",
              attachEvents: "attach",
              detachEvents: "detach",
            },
            exportAs: ["outlet"],
          })),
          t
        );
      })();
      class wP {
        constructor(e, n, r) {
          (this.route = e), (this.childContexts = n), (this.parent = r);
        }
        get(e, n) {
          return e === ki
            ? this.route
            : e === Xs
            ? this.childContexts
            : this.parent.get(e, n);
        }
      }
      let xD = (() => {
        class t {}
        return (
          (t.ɵfac = function (n) {
            return new (n || t)();
          }),
          (t.ɵcmp = It({
            type: t,
            selectors: [["ng-component"]],
            decls: 1,
            vars: 0,
            template: function (n, r) {
              1 & n && Ce(0, "router-outlet");
            },
            directives: [of],
            encapsulation: 2,
          })),
          t
        );
      })();
      function FD(t, e = "") {
        for (let n = 0; n < t.length; n++) {
          const r = t[n];
          bP(r, SP(e, r));
        }
      }
      function bP(t, e) {
        t.children && FD(t.children, e);
      }
      function SP(t, e) {
        return e
          ? t || e.path
            ? t && !e.path
              ? `${t}/`
              : !t && e.path
              ? e.path
              : `${t}/${e.path}`
            : ""
          : t;
      }
      function af(t) {
        const e = t.children && t.children.map(af),
          n = e
            ? Object.assign(Object.assign({}, t), { children: e })
            : Object.assign({}, t);
        return (
          !n.component &&
            (e || n.loadChildren) &&
            n.outlet &&
            n.outlet !== W &&
            (n.component = xD),
          n
        );
      }
      function Bt(t) {
        return t.outlet || W;
      }
      function PD(t, e) {
        const n = t.filter((r) => Bt(r) === e);
        return n.push(...t.filter((r) => Bt(r) !== e)), n;
      }
      const RD = {
        matched: !1,
        consumedSegments: [],
        lastChild: 0,
        parameters: {},
        positionalParamSegments: {},
      };
      function Xa(t, e, n) {
        var r;
        if ("" === e.path)
          return "full" === e.pathMatch && (t.hasChildren() || n.length > 0)
            ? Object.assign({}, RD)
            : {
                matched: !0,
                consumedSegments: [],
                lastChild: 0,
                parameters: {},
                positionalParamSegments: {},
              };
        const s = (e.matcher || LF)(n, t, e);
        if (!s) return Object.assign({}, RD);
        const o = {};
        $e(s.posParams, (l, u) => {
          o[u] = l.path;
        });
        const a =
          s.consumed.length > 0
            ? Object.assign(
                Object.assign({}, o),
                s.consumed[s.consumed.length - 1].parameters
              )
            : o;
        return {
          matched: !0,
          consumedSegments: s.consumed,
          lastChild: s.consumed.length,
          parameters: a,
          positionalParamSegments:
            null !== (r = s.posParams) && void 0 !== r ? r : {},
        };
      }
      function el(t, e, n, r, i = "corrected") {
        if (
          n.length > 0 &&
          (function TP(t, e, n) {
            return n.some((r) => tl(t, e, r) && Bt(r) !== W);
          })(t, n, r)
        ) {
          const o = new K(
            e,
            (function MP(t, e, n, r) {
              const i = {};
              (i[W] = r),
                (r._sourceSegment = t),
                (r._segmentIndexShift = e.length);
              for (const s of n)
                if ("" === s.path && Bt(s) !== W) {
                  const o = new K([], {});
                  (o._sourceSegment = t),
                    (o._segmentIndexShift = e.length),
                    (i[Bt(s)] = o);
                }
              return i;
            })(t, e, r, new K(n, t.children))
          );
          return (
            (o._sourceSegment = t),
            (o._segmentIndexShift = e.length),
            { segmentGroup: o, slicedSegments: [] }
          );
        }
        if (
          0 === n.length &&
          (function IP(t, e, n) {
            return n.some((r) => tl(t, e, r));
          })(t, n, r)
        ) {
          const o = new K(
            t.segments,
            (function AP(t, e, n, r, i, s) {
              const o = {};
              for (const a of r)
                if (tl(t, n, a) && !i[Bt(a)]) {
                  const l = new K([], {});
                  (l._sourceSegment = t),
                    (l._segmentIndexShift =
                      "legacy" === s ? t.segments.length : e.length),
                    (o[Bt(a)] = l);
                }
              return Object.assign(Object.assign({}, i), o);
            })(t, e, n, r, t.children, i)
          );
          return (
            (o._sourceSegment = t),
            (o._segmentIndexShift = e.length),
            { segmentGroup: o, slicedSegments: n }
          );
        }
        const s = new K(t.segments, t.children);
        return (
          (s._sourceSegment = t),
          (s._segmentIndexShift = e.length),
          { segmentGroup: s, slicedSegments: n }
        );
      }
      function tl(t, e, n) {
        return (
          (!(t.hasChildren() || e.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path
        );
      }
      function OD(t, e, n, r) {
        return (
          !!(Bt(t) === r || (r !== W && tl(e, n, t))) &&
          ("**" === t.path || Xa(e, t, n).matched)
        );
      }
      function kD(t, e, n) {
        return 0 === e.length && !t.children[n];
      }
      class eo {
        constructor(e) {
          this.segmentGroup = e || null;
        }
      }
      class VD {
        constructor(e) {
          this.urlTree = e;
        }
      }
      function nl(t) {
        return new ge((e) => e.error(new eo(t)));
      }
      function LD(t) {
        return new ge((e) => e.error(new VD(t)));
      }
      function NP(t) {
        return new ge((e) =>
          e.error(
            new Error(
              `Only absolute redirects can have named outlets. redirectTo: '${t}'`
            )
          )
        );
      }
      class PP {
        constructor(e, n, r, i, s) {
          (this.configLoader = n),
            (this.urlSerializer = r),
            (this.urlTree = i),
            (this.config = s),
            (this.allowRedirects = !0),
            (this.ngModule = e.get(kn));
        }
        apply() {
          const e = el(this.urlTree.root, [], [], this.config).segmentGroup,
            n = new K(e.segments, e.children);
          return this.expandSegmentGroup(this.ngModule, this.config, n, W)
            .pipe(
              oe((s) =>
                this.createUrlTree(
                  lf(s),
                  this.urlTree.queryParams,
                  this.urlTree.fragment
                )
              )
            )
            .pipe(
              tr((s) => {
                if (s instanceof VD)
                  return (this.allowRedirects = !1), this.match(s.urlTree);
                throw s instanceof eo ? this.noMatchError(s) : s;
              })
            );
        }
        match(e) {
          return this.expandSegmentGroup(this.ngModule, this.config, e.root, W)
            .pipe(
              oe((i) => this.createUrlTree(lf(i), e.queryParams, e.fragment))
            )
            .pipe(
              tr((i) => {
                throw i instanceof eo ? this.noMatchError(i) : i;
              })
            );
        }
        noMatchError(e) {
          return new Error(
            `Cannot match any routes. URL Segment: '${e.segmentGroup}'`
          );
        }
        createUrlTree(e, n, r) {
          const i = e.segments.length > 0 ? new K([], { [W]: e }) : e;
          return new Tr(i, n, r);
        }
        expandSegmentGroup(e, n, r, i) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.expandChildren(e, n, r).pipe(oe((s) => new K([], s)))
            : this.expandSegment(e, r, n, r.segments, i, !0);
        }
        expandChildren(e, n, r) {
          const i = [];
          for (const s of Object.keys(r.children))
            "primary" === s ? i.unshift(s) : i.push(s);
          return Be(i).pipe(
            qs((s) => {
              const o = r.children[s],
                a = PD(n, s);
              return this.expandSegmentGroup(e, a, o, s).pipe(
                oe((l) => ({ segment: l, outlet: s }))
              );
            }),
            Xv((s, o) => ((s[o.outlet] = o.segment), s), {}),
            (function bF(t, e) {
              const n = arguments.length >= 2;
              return (r) =>
                r.pipe(
                  t ? Fi((i, s) => t(i, s, r)) : fr,
                  zd(1),
                  n ? tD(e) : eD(() => new Ga())
                );
            })()
          );
        }
        expandSegment(e, n, r, i, s, o) {
          return Be(r).pipe(
            qs((a) =>
              this.expandSegmentAgainstRoute(e, n, r, a, i, s, o).pipe(
                tr((u) => {
                  if (u instanceof eo) return $(null);
                  throw u;
                })
              )
            ),
            Pi((a) => !!a),
            tr((a, l) => {
              if (a instanceof Ga || "EmptyError" === a.name) {
                if (kD(n, i, s)) return $(new K([], {}));
                throw new eo(n);
              }
              throw a;
            })
          );
        }
        expandSegmentAgainstRoute(e, n, r, i, s, o, a) {
          return OD(i, n, s, o)
            ? void 0 === i.redirectTo
              ? this.matchSegmentAgainstRoute(e, n, i, s, o)
              : a && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(e, n, r, i, s, o)
              : nl(n)
            : nl(n);
        }
        expandSegmentAgainstRouteUsingRedirect(e, n, r, i, s, o) {
          return "**" === i.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(e, r, i, o)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                e,
                n,
                r,
                i,
                s,
                o
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(e, n, r, i) {
          const s = this.applyRedirectCommands([], r.redirectTo, {});
          return r.redirectTo.startsWith("/")
            ? LD(s)
            : this.lineralizeSegments(r, s).pipe(
                Le((o) => {
                  const a = new K(o, {});
                  return this.expandSegment(e, a, n, o, i, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(e, n, r, i, s, o) {
          const {
            matched: a,
            consumedSegments: l,
            lastChild: u,
            positionalParamSegments: c,
          } = Xa(n, i, s);
          if (!a) return nl(n);
          const d = this.applyRedirectCommands(l, i.redirectTo, c);
          return i.redirectTo.startsWith("/")
            ? LD(d)
            : this.lineralizeSegments(i, d).pipe(
                Le((f) =>
                  this.expandSegment(e, n, r, f.concat(s.slice(u)), o, !1)
                )
              );
        }
        matchSegmentAgainstRoute(e, n, r, i, s) {
          if ("**" === r.path)
            return r.loadChildren
              ? (r._loadedConfig
                  ? $(r._loadedConfig)
                  : this.configLoader.load(e.injector, r)
                ).pipe(oe((f) => ((r._loadedConfig = f), new K(i, {}))))
              : $(new K(i, {}));
          const { matched: o, consumedSegments: a, lastChild: l } = Xa(n, r, i);
          if (!o) return nl(n);
          const u = i.slice(l);
          return this.getChildConfig(e, r, i).pipe(
            Le((d) => {
              const f = d.module,
                h = d.routes,
                { segmentGroup: p, slicedSegments: g } = el(n, a, u, h),
                y = new K(p.segments, p.children);
              if (0 === g.length && y.hasChildren())
                return this.expandChildren(f, h, y).pipe(
                  oe((S) => new K(a, S))
                );
              if (0 === h.length && 0 === g.length) return $(new K(a, {}));
              const _ = Bt(r) === s;
              return this.expandSegment(f, y, h, g, _ ? W : s, !0).pipe(
                oe((C) => new K(a.concat(C.segments), C.children))
              );
            })
          );
        }
        getChildConfig(e, n, r) {
          return n.children
            ? $(new sf(n.children, e))
            : n.loadChildren
            ? void 0 !== n._loadedConfig
              ? $(n._loadedConfig)
              : this.runCanLoadGuards(e.injector, n, r).pipe(
                  Le((i) =>
                    i
                      ? this.configLoader
                          .load(e.injector, n)
                          .pipe(oe((s) => ((n._loadedConfig = s), s)))
                      : (function xP(t) {
                          return new ge((e) =>
                            e.error(
                              Qd(
                                `Cannot load children because the guard of the route "path: '${t.path}'" returned false`
                              )
                            )
                          );
                        })(n)
                  )
                )
            : $(new sf([], e));
        }
        runCanLoadGuards(e, n, r) {
          const i = n.canLoad;
          return i && 0 !== i.length
            ? $(
                i.map((o) => {
                  const a = e.get(o);
                  let l;
                  if (
                    (function _P(t) {
                      return t && nr(t.canLoad);
                    })(a)
                  )
                    l = a.canLoad(n, r);
                  else {
                    if (!nr(a)) throw new Error("Invalid CanLoad guard");
                    l = a(n, r);
                  }
                  return Cn(l);
                })
              ).pipe(
                Js(),
                vt((o) => {
                  if (!Nr(o)) return;
                  const a = Qd(
                    `Redirecting to "${this.urlSerializer.serialize(o)}"`
                  );
                  throw ((a.url = o), a);
                }),
                oe((o) => !0 === o)
              )
            : $(!0);
        }
        lineralizeSegments(e, n) {
          let r = [],
            i = n.root;
          for (;;) {
            if (((r = r.concat(i.segments)), 0 === i.numberOfChildren))
              return $(r);
            if (i.numberOfChildren > 1 || !i.children[W])
              return NP(e.redirectTo);
            i = i.children[W];
          }
        }
        applyRedirectCommands(e, n, r) {
          return this.applyRedirectCreatreUrlTree(
            n,
            this.urlSerializer.parse(n),
            e,
            r
          );
        }
        applyRedirectCreatreUrlTree(e, n, r, i) {
          const s = this.createSegmentGroup(e, n.root, r, i);
          return new Tr(
            s,
            this.createQueryParams(n.queryParams, this.urlTree.queryParams),
            n.fragment
          );
        }
        createQueryParams(e, n) {
          const r = {};
          return (
            $e(e, (i, s) => {
              if ("string" == typeof i && i.startsWith(":")) {
                const a = i.substring(1);
                r[s] = n[a];
              } else r[s] = i;
            }),
            r
          );
        }
        createSegmentGroup(e, n, r, i) {
          const s = this.createSegments(e, n.segments, r, i);
          let o = {};
          return (
            $e(n.children, (a, l) => {
              o[l] = this.createSegmentGroup(e, a, r, i);
            }),
            new K(s, o)
          );
        }
        createSegments(e, n, r, i) {
          return n.map((s) =>
            s.path.startsWith(":")
              ? this.findPosParam(e, s, i)
              : this.findOrReturn(s, r)
          );
        }
        findPosParam(e, n, r) {
          const i = r[n.path.substring(1)];
          if (!i)
            throw new Error(
              `Cannot redirect to '${e}'. Cannot find '${n.path}'.`
            );
          return i;
        }
        findOrReturn(e, n) {
          let r = 0;
          for (const i of n) {
            if (i.path === e.path) return n.splice(r), i;
            r++;
          }
          return e;
        }
      }
      function lf(t) {
        const e = {};
        for (const r of Object.keys(t.children)) {
          const s = lf(t.children[r]);
          (s.segments.length > 0 || s.hasChildren()) && (e[r] = s);
        }
        return (function RP(t) {
          if (1 === t.numberOfChildren && t.children[W]) {
            const e = t.children[W];
            return new K(t.segments.concat(e.segments), e.children);
          }
          return t;
        })(new K(t.segments, e));
      }
      class BD {
        constructor(e) {
          (this.path = e), (this.route = this.path[this.path.length - 1]);
        }
      }
      class rl {
        constructor(e, n) {
          (this.component = e), (this.route = n);
        }
      }
      function kP(t, e, n) {
        const r = t._root;
        return to(r, e ? e._root : null, n, [r.value]);
      }
      function il(t, e, n) {
        const r = (function LP(t) {
          if (!t) return null;
          for (let e = t.parent; e; e = e.parent) {
            const n = e.routeConfig;
            if (n && n._loadedConfig) return n._loadedConfig;
          }
          return null;
        })(e);
        return (r ? r.module.injector : n).get(t);
      }
      function to(
        t,
        e,
        n,
        r,
        i = { canDeactivateChecks: [], canActivateChecks: [] }
      ) {
        const s = Oi(e);
        return (
          t.children.forEach((o) => {
            (function BP(
              t,
              e,
              n,
              r,
              i = { canDeactivateChecks: [], canActivateChecks: [] }
            ) {
              const s = t.value,
                o = e ? e.value : null,
                a = n ? n.getContext(t.value.outlet) : null;
              if (o && s.routeConfig === o.routeConfig) {
                const l = (function jP(t, e, n) {
                  if ("function" == typeof n) return n(t, e);
                  switch (n) {
                    case "pathParamsChange":
                      return !Ir(t.url, e.url);
                    case "pathParamsOrQueryParamsChange":
                      return (
                        !Ir(t.url, e.url) || !Dn(t.queryParams, e.queryParams)
                      );
                    case "always":
                      return !0;
                    case "paramsOrQueryParamsChange":
                      return !ef(t, e) || !Dn(t.queryParams, e.queryParams);
                    default:
                      return !ef(t, e);
                  }
                })(o, s, s.routeConfig.runGuardsAndResolvers);
                l
                  ? i.canActivateChecks.push(new BD(r))
                  : ((s.data = o.data), (s._resolvedData = o._resolvedData)),
                  to(t, e, s.component ? (a ? a.children : null) : n, r, i),
                  l &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    i.canDeactivateChecks.push(new rl(a.outlet.component, o));
              } else
                o && no(e, a, i),
                  i.canActivateChecks.push(new BD(r)),
                  to(t, null, s.component ? (a ? a.children : null) : n, r, i);
            })(o, s[o.value.outlet], n, r.concat([o.value]), i),
              delete s[o.value.outlet];
          }),
          $e(s, (o, a) => no(o, n.getContext(a), i)),
          i
        );
      }
      function no(t, e, n) {
        const r = Oi(t),
          i = t.value;
        $e(r, (s, o) => {
          no(s, i.component ? (e ? e.children.getContext(o) : null) : e, n);
        }),
          n.canDeactivateChecks.push(
            new rl(
              i.component && e && e.outlet && e.outlet.isActivated
                ? e.outlet.component
                : null,
              i
            )
          );
      }
      class KP {}
      function jD(t) {
        return new ge((e) => e.error(t));
      }
      class YP {
        constructor(e, n, r, i, s, o) {
          (this.rootComponentType = e),
            (this.config = n),
            (this.urlTree = r),
            (this.url = i),
            (this.paramsInheritanceStrategy = s),
            (this.relativeLinkResolution = o);
        }
        recognize() {
          const e = el(
              this.urlTree.root,
              [],
              [],
              this.config.filter((o) => void 0 === o.redirectTo),
              this.relativeLinkResolution
            ).segmentGroup,
            n = this.processSegmentGroup(this.config, e, W);
          if (null === n) return null;
          const r = new Za(
              [],
              Object.freeze({}),
              Object.freeze(Object.assign({}, this.urlTree.queryParams)),
              this.urlTree.fragment,
              {},
              W,
              this.rootComponentType,
              null,
              this.urlTree.root,
              -1,
              {}
            ),
            i = new Un(r, n),
            s = new bD(this.url, i);
          return this.inheritParamsAndData(s._root), s;
        }
        inheritParamsAndData(e) {
          const n = e.value,
            r = wD(n, this.paramsInheritanceStrategy);
          (n.params = Object.freeze(r.params)),
            (n.data = Object.freeze(r.data)),
            e.children.forEach((i) => this.inheritParamsAndData(i));
        }
        processSegmentGroup(e, n, r) {
          return 0 === n.segments.length && n.hasChildren()
            ? this.processChildren(e, n)
            : this.processSegment(e, n, n.segments, r);
        }
        processChildren(e, n) {
          const r = [];
          for (const s of Object.keys(n.children)) {
            const o = n.children[s],
              a = PD(e, s),
              l = this.processSegmentGroup(a, o, s);
            if (null === l) return null;
            r.push(...l);
          }
          const i = UD(r);
          return (
            (function JP(t) {
              t.sort((e, n) =>
                e.value.outlet === W
                  ? -1
                  : n.value.outlet === W
                  ? 1
                  : e.value.outlet.localeCompare(n.value.outlet)
              );
            })(i),
            i
          );
        }
        processSegment(e, n, r, i) {
          for (const s of e) {
            const o = this.processSegmentAgainstRoute(s, n, r, i);
            if (null !== o) return o;
          }
          return kD(n, r, i) ? [] : null;
        }
        processSegmentAgainstRoute(e, n, r, i) {
          if (e.redirectTo || !OD(e, n, r, i)) return null;
          let s,
            o = [],
            a = [];
          if ("**" === e.path) {
            const h = r.length > 0 ? uD(r).parameters : {};
            s = new Za(
              r,
              h,
              Object.freeze(Object.assign({}, this.urlTree.queryParams)),
              this.urlTree.fragment,
              GD(e),
              Bt(e),
              e.component,
              e,
              HD(n),
              $D(n) + r.length,
              qD(e)
            );
          } else {
            const h = Xa(n, e, r);
            if (!h.matched) return null;
            (o = h.consumedSegments),
              (a = r.slice(h.lastChild)),
              (s = new Za(
                o,
                h.parameters,
                Object.freeze(Object.assign({}, this.urlTree.queryParams)),
                this.urlTree.fragment,
                GD(e),
                Bt(e),
                e.component,
                e,
                HD(n),
                $D(n) + o.length,
                qD(e)
              ));
          }
          const l = (function XP(t) {
              return t.children
                ? t.children
                : t.loadChildren
                ? t._loadedConfig.routes
                : [];
            })(e),
            { segmentGroup: u, slicedSegments: c } = el(
              n,
              o,
              a,
              l.filter((h) => void 0 === h.redirectTo),
              this.relativeLinkResolution
            );
          if (0 === c.length && u.hasChildren()) {
            const h = this.processChildren(l, u);
            return null === h ? null : [new Un(s, h)];
          }
          if (0 === l.length && 0 === c.length) return [new Un(s, [])];
          const d = Bt(e) === i,
            f = this.processSegment(l, u, c, d ? W : i);
          return null === f ? null : [new Un(s, f)];
        }
      }
      function eR(t) {
        const e = t.value.routeConfig;
        return e && "" === e.path && void 0 === e.redirectTo;
      }
      function UD(t) {
        const e = [],
          n = new Set();
        for (const r of t) {
          if (!eR(r)) {
            e.push(r);
            continue;
          }
          const i = e.find((s) => r.value.routeConfig === s.value.routeConfig);
          void 0 !== i ? (i.children.push(...r.children), n.add(i)) : e.push(r);
        }
        for (const r of n) {
          const i = UD(r.children);
          e.push(new Un(r.value, i));
        }
        return e.filter((r) => !n.has(r));
      }
      function HD(t) {
        let e = t;
        for (; e._sourceSegment; ) e = e._sourceSegment;
        return e;
      }
      function $D(t) {
        let e = t,
          n = e._segmentIndexShift ? e._segmentIndexShift : 0;
        for (; e._sourceSegment; )
          (e = e._sourceSegment),
            (n += e._segmentIndexShift ? e._segmentIndexShift : 0);
        return n - 1;
      }
      function GD(t) {
        return t.data || {};
      }
      function qD(t) {
        return t.resolve || {};
      }
      function zD(t) {
        return [...Object.keys(t), ...Object.getOwnPropertySymbols(t)];
      }
      function uf(t) {
        return Mr((e) => {
          const n = t(e);
          return n ? Be(n).pipe(oe(() => e)) : $(e);
        });
      }
      class lR extends class aR {
        shouldDetach(e) {
          return !1;
        }
        store(e, n) {}
        shouldAttach(e) {
          return !1;
        }
        retrieve(e) {
          return null;
        }
        shouldReuseRoute(e, n) {
          return e.routeConfig === n.routeConfig;
        }
      } {}
      const cf = new q("ROUTES");
      class WD {
        constructor(e, n, r, i) {
          (this.injector = e),
            (this.compiler = n),
            (this.onLoadStartListener = r),
            (this.onLoadEndListener = i);
        }
        load(e, n) {
          if (n._loader$) return n._loader$;
          this.onLoadStartListener && this.onLoadStartListener(n);
          const i = this.loadModuleFactory(n.loadChildren).pipe(
            oe((s) => {
              this.onLoadEndListener && this.onLoadEndListener(n);
              const o = s.create(e);
              return new sf(
                lD(o.injector.get(cf, void 0, L.Self | L.Optional)).map(af),
                o
              );
            }),
            tr((s) => {
              throw ((n._loader$ = void 0), s);
            })
          );
          return (
            (n._loader$ = new DF(i, () => new on()).pipe(Jv())), n._loader$
          );
        }
        loadModuleFactory(e) {
          return Cn(e()).pipe(
            Le((n) =>
              n instanceof c_ ? $(n) : Be(this.compiler.compileModuleAsync(n))
            )
          );
        }
      }
      class cR {
        shouldProcessUrl(e) {
          return !0;
        }
        extract(e) {
          return e;
        }
        merge(e, n) {
          return e;
        }
      }
      function dR(t) {
        throw t;
      }
      function fR(t, e, n) {
        return e.parse("/");
      }
      function QD(t, e) {
        return $(null);
      }
      const hR = {
          paths: "exact",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "exact",
        },
        pR = {
          paths: "subset",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "subset",
        };
      let Dt = (() => {
        class t {
          constructor(n, r, i, s, o, a, l) {
            (this.rootComponentType = n),
              (this.urlSerializer = r),
              (this.rootContexts = i),
              (this.location = s),
              (this.config = l),
              (this.lastSuccessfulNavigation = null),
              (this.currentNavigation = null),
              (this.disposed = !1),
              (this.navigationId = 0),
              (this.currentPageId = 0),
              (this.isNgZoneEnabled = !1),
              (this.events = new on()),
              (this.errorHandler = dR),
              (this.malformedUriErrorHandler = fR),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1),
              (this.hooks = {
                beforePreactivation: QD,
                afterPreactivation: QD,
              }),
              (this.urlHandlingStrategy = new cR()),
              (this.routeReuseStrategy = new lR()),
              (this.onSameUrlNavigation = "ignore"),
              (this.paramsInheritanceStrategy = "emptyOnly"),
              (this.urlUpdateStrategy = "deferred"),
              (this.relativeLinkResolution = "corrected"),
              (this.canceledNavigationResolution = "replace"),
              (this.ngModule = o.get(kn)),
              (this.console = o.get(q_));
            const d = o.get(Ae);
            (this.isNgZoneEnabled = d instanceof Ae && Ae.isInAngularZone()),
              this.resetConfig(l),
              (this.currentUrlTree = (function jF() {
                return new Tr(new K([], {}), {}, null);
              })()),
              (this.rawUrlTree = this.currentUrlTree),
              (this.browserUrlTree = this.currentUrlTree),
              (this.configLoader = new WD(
                o,
                a,
                (f) => this.triggerEvent(new rD(f)),
                (f) => this.triggerEvent(new iD(f))
              )),
              (this.routerState = ED(
                this.currentUrlTree,
                this.rootComponentType
              )),
              (this.transitions = new rn({
                id: 0,
                targetPageId: 0,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.currentUrlTree,
                extractedUrl: this.urlHandlingStrategy.extract(
                  this.currentUrlTree
                ),
                urlAfterRedirects: this.urlHandlingStrategy.extract(
                  this.currentUrlTree
                ),
                rawUrl: this.currentUrlTree,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: "imperative",
                restoredState: null,
                currentSnapshot: this.routerState.snapshot,
                targetSnapshot: null,
                currentRouterState: this.routerState,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null,
              })),
              (this.navigations = this.setupNavigations(this.transitions)),
              this.processNavigations();
          }
          get browserPageId() {
            var n;
            return null === (n = this.location.getState()) || void 0 === n
              ? void 0
              : n.ɵrouterPageId;
          }
          setupNavigations(n) {
            const r = this.events;
            return n.pipe(
              Fi((i) => 0 !== i.id),
              oe((i) =>
                Object.assign(Object.assign({}, i), {
                  extractedUrl: this.urlHandlingStrategy.extract(i.rawUrl),
                })
              ),
              Mr((i) => {
                let s = !1,
                  o = !1;
                return $(i).pipe(
                  vt((a) => {
                    this.currentNavigation = {
                      id: a.id,
                      initialUrl: a.currentRawUrl,
                      extractedUrl: a.extractedUrl,
                      trigger: a.source,
                      extras: a.extras,
                      previousNavigation: this.lastSuccessfulNavigation
                        ? Object.assign(
                            Object.assign({}, this.lastSuccessfulNavigation),
                            { previousNavigation: null }
                          )
                        : null,
                    };
                  }),
                  Mr((a) => {
                    const l = this.browserUrlTree.toString(),
                      u =
                        !this.navigated ||
                        a.extractedUrl.toString() !== l ||
                        l !== this.currentUrlTree.toString();
                    if (
                      ("reload" === this.onSameUrlNavigation || u) &&
                      this.urlHandlingStrategy.shouldProcessUrl(a.rawUrl)
                    )
                      return (
                        sl(a.source) && (this.browserUrlTree = a.extractedUrl),
                        $(a).pipe(
                          Mr((d) => {
                            const f = this.transitions.getValue();
                            return (
                              r.next(
                                new Wd(
                                  d.id,
                                  this.serializeUrl(d.extractedUrl),
                                  d.source,
                                  d.restoredState
                                )
                              ),
                              f !== this.transitions.getValue()
                                ? An
                                : Promise.resolve(d)
                            );
                          }),
                          (function OP(t, e, n, r) {
                            return Mr((i) =>
                              (function FP(t, e, n, r, i) {
                                return new PP(t, e, n, r, i).apply();
                              })(t, e, n, i.extractedUrl, r).pipe(
                                oe((s) =>
                                  Object.assign(Object.assign({}, i), {
                                    urlAfterRedirects: s,
                                  })
                                )
                              )
                            );
                          })(
                            this.ngModule.injector,
                            this.configLoader,
                            this.urlSerializer,
                            this.config
                          ),
                          vt((d) => {
                            this.currentNavigation = Object.assign(
                              Object.assign({}, this.currentNavigation),
                              { finalUrl: d.urlAfterRedirects }
                            );
                          }),
                          (function tR(t, e, n, r, i) {
                            return Le((s) =>
                              (function ZP(
                                t,
                                e,
                                n,
                                r,
                                i = "emptyOnly",
                                s = "legacy"
                              ) {
                                try {
                                  const o = new YP(
                                    t,
                                    e,
                                    n,
                                    r,
                                    i,
                                    s
                                  ).recognize();
                                  return null === o ? jD(new KP()) : $(o);
                                } catch (o) {
                                  return jD(o);
                                }
                              })(
                                t,
                                e,
                                s.urlAfterRedirects,
                                n(s.urlAfterRedirects),
                                r,
                                i
                              ).pipe(
                                oe((o) =>
                                  Object.assign(Object.assign({}, s), {
                                    targetSnapshot: o,
                                  })
                                )
                              )
                            );
                          })(
                            this.rootComponentType,
                            this.config,
                            (d) => this.serializeUrl(d),
                            this.paramsInheritanceStrategy,
                            this.relativeLinkResolution
                          ),
                          vt((d) => {
                            if ("eager" === this.urlUpdateStrategy) {
                              if (!d.extras.skipLocationChange) {
                                const h = this.urlHandlingStrategy.merge(
                                  d.urlAfterRedirects,
                                  d.rawUrl
                                );
                                this.setBrowserUrl(h, d);
                              }
                              this.browserUrlTree = d.urlAfterRedirects;
                            }
                            const f = new MF(
                              d.id,
                              this.serializeUrl(d.extractedUrl),
                              this.serializeUrl(d.urlAfterRedirects),
                              d.targetSnapshot
                            );
                            r.next(f);
                          })
                        )
                      );
                    if (
                      u &&
                      this.rawUrlTree &&
                      this.urlHandlingStrategy.shouldProcessUrl(this.rawUrlTree)
                    ) {
                      const {
                          id: f,
                          extractedUrl: h,
                          source: p,
                          restoredState: g,
                          extras: y,
                        } = a,
                        _ = new Wd(f, this.serializeUrl(h), p, g);
                      r.next(_);
                      const m = ED(h, this.rootComponentType).snapshot;
                      return $(
                        Object.assign(Object.assign({}, a), {
                          targetSnapshot: m,
                          urlAfterRedirects: h,
                          extras: Object.assign(Object.assign({}, y), {
                            skipLocationChange: !1,
                            replaceUrl: !1,
                          }),
                        })
                      );
                    }
                    return (this.rawUrlTree = a.rawUrl), a.resolve(null), An;
                  }),
                  uf((a) => {
                    const {
                      targetSnapshot: l,
                      id: u,
                      extractedUrl: c,
                      rawUrl: d,
                      extras: { skipLocationChange: f, replaceUrl: h },
                    } = a;
                    return this.hooks.beforePreactivation(l, {
                      navigationId: u,
                      appliedUrlTree: c,
                      rawUrlTree: d,
                      skipLocationChange: !!f,
                      replaceUrl: !!h,
                    });
                  }),
                  vt((a) => {
                    const l = new TF(
                      a.id,
                      this.serializeUrl(a.extractedUrl),
                      this.serializeUrl(a.urlAfterRedirects),
                      a.targetSnapshot
                    );
                    this.triggerEvent(l);
                  }),
                  oe((a) =>
                    Object.assign(Object.assign({}, a), {
                      guards: kP(
                        a.targetSnapshot,
                        a.currentSnapshot,
                        this.rootContexts
                      ),
                    })
                  ),
                  (function UP(t, e) {
                    return Le((n) => {
                      const {
                        targetSnapshot: r,
                        currentSnapshot: i,
                        guards: {
                          canActivateChecks: s,
                          canDeactivateChecks: o,
                        },
                      } = n;
                      return 0 === o.length && 0 === s.length
                        ? $(
                            Object.assign(Object.assign({}, n), {
                              guardsResult: !0,
                            })
                          )
                        : (function HP(t, e, n, r) {
                            return Be(t).pipe(
                              Le((i) =>
                                (function QP(t, e, n, r, i) {
                                  const s =
                                    e && e.routeConfig
                                      ? e.routeConfig.canDeactivate
                                      : null;
                                  return s && 0 !== s.length
                                    ? $(
                                        s.map((a) => {
                                          const l = il(a, e, i);
                                          let u;
                                          if (
                                            (function CP(t) {
                                              return t && nr(t.canDeactivate);
                                            })(l)
                                          )
                                            u = Cn(l.canDeactivate(t, e, n, r));
                                          else {
                                            if (!nr(l))
                                              throw new Error(
                                                "Invalid CanDeactivate guard"
                                              );
                                            u = Cn(l(t, e, n, r));
                                          }
                                          return u.pipe(Pi());
                                        })
                                      ).pipe(Js())
                                    : $(!0);
                                })(i.component, i.route, n, e, r)
                              ),
                              Pi((i) => !0 !== i, !0)
                            );
                          })(o, r, i, t).pipe(
                            Le((a) =>
                              a &&
                              (function yP(t) {
                                return "boolean" == typeof t;
                              })(a)
                                ? (function $P(t, e, n, r) {
                                    return Be(e).pipe(
                                      qs((i) =>
                                        qd(
                                          (function qP(t, e) {
                                            return (
                                              null !== t && e && e(new FF(t)),
                                              $(!0)
                                            );
                                          })(i.route.parent, r),
                                          (function GP(t, e) {
                                            return (
                                              null !== t && e && e(new RF(t)),
                                              $(!0)
                                            );
                                          })(i.route, r),
                                          (function WP(t, e, n) {
                                            const r = e[e.length - 1],
                                              s = e
                                                .slice(0, e.length - 1)
                                                .reverse()
                                                .map((o) =>
                                                  (function VP(t) {
                                                    const e = t.routeConfig
                                                      ? t.routeConfig
                                                          .canActivateChild
                                                      : null;
                                                    return e && 0 !== e.length
                                                      ? { node: t, guards: e }
                                                      : null;
                                                  })(o)
                                                )
                                                .filter((o) => null !== o)
                                                .map((o) =>
                                                  Yv(() =>
                                                    $(
                                                      o.guards.map((l) => {
                                                        const u = il(
                                                          l,
                                                          o.node,
                                                          n
                                                        );
                                                        let c;
                                                        if (
                                                          (function DP(t) {
                                                            return (
                                                              t &&
                                                              nr(
                                                                t.canActivateChild
                                                              )
                                                            );
                                                          })(u)
                                                        )
                                                          c = Cn(
                                                            u.canActivateChild(
                                                              r,
                                                              t
                                                            )
                                                          );
                                                        else {
                                                          if (!nr(u))
                                                            throw new Error(
                                                              "Invalid CanActivateChild guard"
                                                            );
                                                          c = Cn(u(r, t));
                                                        }
                                                        return c.pipe(Pi());
                                                      })
                                                    ).pipe(Js())
                                                  )
                                                );
                                            return $(s).pipe(Js());
                                          })(t, i.path, n),
                                          (function zP(t, e, n) {
                                            const r = e.routeConfig
                                              ? e.routeConfig.canActivate
                                              : null;
                                            if (!r || 0 === r.length)
                                              return $(!0);
                                            const i = r.map((s) =>
                                              Yv(() => {
                                                const o = il(s, e, n);
                                                let a;
                                                if (
                                                  (function vP(t) {
                                                    return (
                                                      t && nr(t.canActivate)
                                                    );
                                                  })(o)
                                                )
                                                  a = Cn(o.canActivate(e, t));
                                                else {
                                                  if (!nr(o))
                                                    throw new Error(
                                                      "Invalid CanActivate guard"
                                                    );
                                                  a = Cn(o(e, t));
                                                }
                                                return a.pipe(Pi());
                                              })
                                            );
                                            return $(i).pipe(Js());
                                          })(t, i.route, n)
                                        )
                                      ),
                                      Pi((i) => !0 !== i, !0)
                                    );
                                  })(r, s, t, e)
                                : $(a)
                            ),
                            oe((a) =>
                              Object.assign(Object.assign({}, n), {
                                guardsResult: a,
                              })
                            )
                          );
                    });
                  })(this.ngModule.injector, (a) => this.triggerEvent(a)),
                  vt((a) => {
                    if (Nr(a.guardsResult)) {
                      const u = Qd(
                        `Redirecting to "${this.serializeUrl(a.guardsResult)}"`
                      );
                      throw ((u.url = a.guardsResult), u);
                    }
                    const l = new IF(
                      a.id,
                      this.serializeUrl(a.extractedUrl),
                      this.serializeUrl(a.urlAfterRedirects),
                      a.targetSnapshot,
                      !!a.guardsResult
                    );
                    this.triggerEvent(l);
                  }),
                  Fi(
                    (a) =>
                      !!a.guardsResult ||
                      (this.restoreHistory(a),
                      this.cancelNavigationTransition(a, ""),
                      !1)
                  ),
                  uf((a) => {
                    if (a.guards.canActivateChecks.length)
                      return $(a).pipe(
                        vt((l) => {
                          const u = new NF(
                            l.id,
                            this.serializeUrl(l.extractedUrl),
                            this.serializeUrl(l.urlAfterRedirects),
                            l.targetSnapshot
                          );
                          this.triggerEvent(u);
                        }),
                        Mr((l) => {
                          let u = !1;
                          return $(l).pipe(
                            (function nR(t, e) {
                              return Le((n) => {
                                const {
                                  targetSnapshot: r,
                                  guards: { canActivateChecks: i },
                                } = n;
                                if (!i.length) return $(n);
                                let s = 0;
                                return Be(i).pipe(
                                  qs((o) =>
                                    (function rR(t, e, n, r) {
                                      return (function iR(t, e, n, r) {
                                        const i = zD(t);
                                        if (0 === i.length) return $({});
                                        const s = {};
                                        return Be(i).pipe(
                                          Le((o) =>
                                            (function sR(t, e, n, r) {
                                              const i = il(t, e, r);
                                              return Cn(
                                                i.resolve
                                                  ? i.resolve(e, n)
                                                  : i(e, n)
                                              );
                                            })(t[o], e, n, r).pipe(
                                              vt((a) => {
                                                s[o] = a;
                                              })
                                            )
                                          ),
                                          zd(1),
                                          Le(() =>
                                            zD(s).length === i.length
                                              ? $(s)
                                              : An
                                          )
                                        );
                                      })(t._resolve, t, e, r).pipe(
                                        oe(
                                          (s) => (
                                            (t._resolvedData = s),
                                            (t.data = Object.assign(
                                              Object.assign({}, t.data),
                                              wD(t, n).resolve
                                            )),
                                            null
                                          )
                                        )
                                      );
                                    })(o.route, r, t, e)
                                  ),
                                  vt(() => s++),
                                  zd(1),
                                  Le((o) => (s === i.length ? $(n) : An))
                                );
                              });
                            })(
                              this.paramsInheritanceStrategy,
                              this.ngModule.injector
                            ),
                            vt({
                              next: () => (u = !0),
                              complete: () => {
                                u ||
                                  (this.restoreHistory(l),
                                  this.cancelNavigationTransition(
                                    l,
                                    "At least one route resolver didn't emit any value."
                                  ));
                              },
                            })
                          );
                        }),
                        vt((l) => {
                          const u = new xF(
                            l.id,
                            this.serializeUrl(l.extractedUrl),
                            this.serializeUrl(l.urlAfterRedirects),
                            l.targetSnapshot
                          );
                          this.triggerEvent(u);
                        })
                      );
                  }),
                  uf((a) => {
                    const {
                      targetSnapshot: l,
                      id: u,
                      extractedUrl: c,
                      rawUrl: d,
                      extras: { skipLocationChange: f, replaceUrl: h },
                    } = a;
                    return this.hooks.afterPreactivation(l, {
                      navigationId: u,
                      appliedUrlTree: c,
                      rawUrlTree: d,
                      skipLocationChange: !!f,
                      replaceUrl: !!h,
                    });
                  }),
                  oe((a) => {
                    const l = (function iP(t, e, n) {
                      const r = Ks(t, e._root, n ? n._root : void 0);
                      return new CD(r, e);
                    })(
                      this.routeReuseStrategy,
                      a.targetSnapshot,
                      a.currentRouterState
                    );
                    return Object.assign(Object.assign({}, a), {
                      targetRouterState: l,
                    });
                  }),
                  vt((a) => {
                    (this.currentUrlTree = a.urlAfterRedirects),
                      (this.rawUrlTree = this.urlHandlingStrategy.merge(
                        a.urlAfterRedirects,
                        a.rawUrl
                      )),
                      (this.routerState = a.targetRouterState),
                      "deferred" === this.urlUpdateStrategy &&
                        (a.extras.skipLocationChange ||
                          this.setBrowserUrl(this.rawUrlTree, a),
                        (this.browserUrlTree = a.urlAfterRedirects));
                  }),
                  ((t, e, n) =>
                    oe(
                      (r) => (
                        new gP(
                          e,
                          r.targetRouterState,
                          r.currentRouterState,
                          n
                        ).activate(t),
                        r
                      )
                    ))(this.rootContexts, this.routeReuseStrategy, (a) =>
                    this.triggerEvent(a)
                  ),
                  vt({
                    next() {
                      s = !0;
                    },
                    complete() {
                      s = !0;
                    },
                  }),
                  (function SF(t) {
                    return He((e, n) => {
                      try {
                        e.subscribe(n);
                      } finally {
                        n.add(t);
                      }
                    });
                  })(() => {
                    var a;
                    s ||
                      o ||
                      this.cancelNavigationTransition(
                        i,
                        `Navigation ID ${i.id} is not equal to the current navigation id ${this.navigationId}`
                      ),
                      (null === (a = this.currentNavigation) || void 0 === a
                        ? void 0
                        : a.id) === i.id && (this.currentNavigation = null);
                  }),
                  tr((a) => {
                    if (
                      ((o = !0),
                      (function VF(t) {
                        return t && t[oD];
                      })(a))
                    ) {
                      const l = Nr(a.url);
                      l || ((this.navigated = !0), this.restoreHistory(i, !0));
                      const u = new nD(
                        i.id,
                        this.serializeUrl(i.extractedUrl),
                        a.message
                      );
                      r.next(u),
                        l
                          ? setTimeout(() => {
                              const c = this.urlHandlingStrategy.merge(
                                  a.url,
                                  this.rawUrlTree
                                ),
                                d = {
                                  skipLocationChange:
                                    i.extras.skipLocationChange,
                                  replaceUrl:
                                    "eager" === this.urlUpdateStrategy ||
                                    sl(i.source),
                                };
                              this.scheduleNavigation(
                                c,
                                "imperative",
                                null,
                                d,
                                {
                                  resolve: i.resolve,
                                  reject: i.reject,
                                  promise: i.promise,
                                }
                              );
                            }, 0)
                          : i.resolve(!1);
                    } else {
                      this.restoreHistory(i, !0);
                      const l = new AF(
                        i.id,
                        this.serializeUrl(i.extractedUrl),
                        a
                      );
                      r.next(l);
                      try {
                        i.resolve(this.errorHandler(a));
                      } catch (u) {
                        i.reject(u);
                      }
                    }
                    return An;
                  })
                );
              })
            );
          }
          resetRootComponentType(n) {
            (this.rootComponentType = n),
              (this.routerState.root.component = this.rootComponentType);
          }
          setTransition(n) {
            this.transitions.next(
              Object.assign(Object.assign({}, this.transitions.value), n)
            );
          }
          initialNavigation() {
            this.setUpLocationChangeListener(),
              0 === this.navigationId &&
                this.navigateByUrl(this.location.path(!0), { replaceUrl: !0 });
          }
          setUpLocationChangeListener() {
            this.locationSubscription ||
              (this.locationSubscription = this.location.subscribe((n) => {
                const r = "popstate" === n.type ? "popstate" : "hashchange";
                "popstate" === r &&
                  setTimeout(() => {
                    var i;
                    const s = { replaceUrl: !0 },
                      o = (
                        null === (i = n.state) || void 0 === i
                          ? void 0
                          : i.navigationId
                      )
                        ? n.state
                        : null;
                    if (o) {
                      const l = Object.assign({}, o);
                      delete l.navigationId,
                        delete l.ɵrouterPageId,
                        0 !== Object.keys(l).length && (s.state = l);
                    }
                    const a = this.parseUrl(n.url);
                    this.scheduleNavigation(a, r, o, s);
                  }, 0);
              }));
          }
          get url() {
            return this.serializeUrl(this.currentUrlTree);
          }
          getCurrentNavigation() {
            return this.currentNavigation;
          }
          triggerEvent(n) {
            this.events.next(n);
          }
          resetConfig(n) {
            FD(n),
              (this.config = n.map(af)),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1);
          }
          ngOnDestroy() {
            this.dispose();
          }
          dispose() {
            this.transitions.complete(),
              this.locationSubscription &&
                (this.locationSubscription.unsubscribe(),
                (this.locationSubscription = void 0)),
              (this.disposed = !0);
          }
          createUrlTree(n, r = {}) {
            const {
                relativeTo: i,
                queryParams: s,
                fragment: o,
                queryParamsHandling: a,
                preserveFragment: l,
              } = r,
              u = i || this.routerState.root,
              c = l ? this.currentUrlTree.fragment : o;
            let d = null;
            switch (a) {
              case "merge":
                d = Object.assign(
                  Object.assign({}, this.currentUrlTree.queryParams),
                  s
                );
                break;
              case "preserve":
                d = this.currentUrlTree.queryParams;
                break;
              default:
                d = s || null;
            }
            return (
              null !== d && (d = this.removeEmptyProps(d)),
              (function aP(t, e, n, r, i) {
                if (0 === n.length) return tf(e.root, e.root, e, r, i);
                const s = (function lP(t) {
                  if ("string" == typeof t[0] && 1 === t.length && "/" === t[0])
                    return new MD(!0, 0, t);
                  let e = 0,
                    n = !1;
                  const r = t.reduce((i, s, o) => {
                    if ("object" == typeof s && null != s) {
                      if (s.outlets) {
                        const a = {};
                        return (
                          $e(s.outlets, (l, u) => {
                            a[u] = "string" == typeof l ? l.split("/") : l;
                          }),
                          [...i, { outlets: a }]
                        );
                      }
                      if (s.segmentPath) return [...i, s.segmentPath];
                    }
                    return "string" != typeof s
                      ? [...i, s]
                      : 0 === o
                      ? (s.split("/").forEach((a, l) => {
                          (0 == l && "." === a) ||
                            (0 == l && "" === a
                              ? (n = !0)
                              : ".." === a
                              ? e++
                              : "" != a && i.push(a));
                        }),
                        i)
                      : [...i, s];
                  }, []);
                  return new MD(n, e, r);
                })(n);
                if (s.toRoot()) return tf(e.root, new K([], {}), e, r, i);
                const o = (function uP(t, e, n) {
                    if (t.isAbsolute) return new nf(e.root, !0, 0);
                    if (-1 === n.snapshot._lastPathIndex) {
                      const s = n.snapshot._urlSegment;
                      return new nf(s, s === e.root, 0);
                    }
                    const r = Ya(t.commands[0]) ? 0 : 1;
                    return (function cP(t, e, n) {
                      let r = t,
                        i = e,
                        s = n;
                      for (; s > i; ) {
                        if (((s -= i), (r = r.parent), !r))
                          throw new Error("Invalid number of '../'");
                        i = r.segments.length;
                      }
                      return new nf(r, !1, i - s);
                    })(
                      n.snapshot._urlSegment,
                      n.snapshot._lastPathIndex + r,
                      t.numberOfDoubleDots
                    );
                  })(s, e, t),
                  a = o.processChildren
                    ? Ja(o.segmentGroup, o.index, s.commands)
                    : TD(o.segmentGroup, o.index, s.commands);
                return tf(o.segmentGroup, a, e, r, i);
              })(u, this.currentUrlTree, n, d, null != c ? c : null)
            );
          }
          navigateByUrl(n, r = { skipLocationChange: !1 }) {
            const i = Nr(n) ? n : this.parseUrl(n),
              s = this.urlHandlingStrategy.merge(i, this.rawUrlTree);
            return this.scheduleNavigation(s, "imperative", null, r);
          }
          navigate(n, r = { skipLocationChange: !1 }) {
            return (
              (function gR(t) {
                for (let e = 0; e < t.length; e++) {
                  const n = t[e];
                  if (null == n)
                    throw new Error(
                      `The requested path contains ${n} segment at index ${e}`
                    );
                }
              })(n),
              this.navigateByUrl(this.createUrlTree(n, r), r)
            );
          }
          serializeUrl(n) {
            return this.urlSerializer.serialize(n);
          }
          parseUrl(n) {
            let r;
            try {
              r = this.urlSerializer.parse(n);
            } catch (i) {
              r = this.malformedUriErrorHandler(i, this.urlSerializer, n);
            }
            return r;
          }
          isActive(n, r) {
            let i;
            if (
              ((i =
                !0 === r
                  ? Object.assign({}, hR)
                  : !1 === r
                  ? Object.assign({}, pR)
                  : r),
              Nr(n))
            )
              return dD(this.currentUrlTree, n, i);
            const s = this.parseUrl(n);
            return dD(this.currentUrlTree, s, i);
          }
          removeEmptyProps(n) {
            return Object.keys(n).reduce((r, i) => {
              const s = n[i];
              return null != s && (r[i] = s), r;
            }, {});
          }
          processNavigations() {
            this.navigations.subscribe(
              (n) => {
                (this.navigated = !0),
                  (this.lastSuccessfulId = n.id),
                  (this.currentPageId = n.targetPageId),
                  this.events.next(
                    new zs(
                      n.id,
                      this.serializeUrl(n.extractedUrl),
                      this.serializeUrl(this.currentUrlTree)
                    )
                  ),
                  (this.lastSuccessfulNavigation = this.currentNavigation),
                  n.resolve(!0);
              },
              (n) => {
                this.console.warn(`Unhandled Navigation Error: ${n}`);
              }
            );
          }
          scheduleNavigation(n, r, i, s, o) {
            var a, l, u;
            if (this.disposed) return Promise.resolve(!1);
            const c = this.transitions.value,
              d = sl(r) && c && !sl(c.source),
              f = c.rawUrl.toString() === n.toString(),
              h =
                c.id ===
                (null === (a = this.currentNavigation) || void 0 === a
                  ? void 0
                  : a.id);
            if (d && f && h) return Promise.resolve(!0);
            let g, y, _;
            o
              ? ((g = o.resolve), (y = o.reject), (_ = o.promise))
              : (_ = new Promise((S, B) => {
                  (g = S), (y = B);
                }));
            const m = ++this.navigationId;
            let C;
            return (
              "computed" === this.canceledNavigationResolution
                ? (0 === this.currentPageId && (i = this.location.getState()),
                  (C =
                    i && i.ɵrouterPageId
                      ? i.ɵrouterPageId
                      : s.replaceUrl || s.skipLocationChange
                      ? null !== (l = this.browserPageId) && void 0 !== l
                        ? l
                        : 0
                      : (null !== (u = this.browserPageId) && void 0 !== u
                          ? u
                          : 0) + 1))
                : (C = 0),
              this.setTransition({
                id: m,
                targetPageId: C,
                source: r,
                restoredState: i,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.rawUrlTree,
                rawUrl: n,
                extras: s,
                resolve: g,
                reject: y,
                promise: _,
                currentSnapshot: this.routerState.snapshot,
                currentRouterState: this.routerState,
              }),
              _.catch((S) => Promise.reject(S))
            );
          }
          setBrowserUrl(n, r) {
            const i = this.urlSerializer.serialize(n),
              s = Object.assign(
                Object.assign({}, r.extras.state),
                this.generateNgRouterState(r.id, r.targetPageId)
              );
            this.location.isCurrentPathEqualTo(i) || r.extras.replaceUrl
              ? this.location.replaceState(i, "", s)
              : this.location.go(i, "", s);
          }
          restoreHistory(n, r = !1) {
            var i, s;
            if ("computed" === this.canceledNavigationResolution) {
              const o = this.currentPageId - n.targetPageId;
              ("popstate" !== n.source &&
                "eager" !== this.urlUpdateStrategy &&
                this.currentUrlTree !==
                  (null === (i = this.currentNavigation) || void 0 === i
                    ? void 0
                    : i.finalUrl)) ||
              0 === o
                ? this.currentUrlTree ===
                    (null === (s = this.currentNavigation) || void 0 === s
                      ? void 0
                      : s.finalUrl) &&
                  0 === o &&
                  (this.resetState(n),
                  (this.browserUrlTree = n.currentUrlTree),
                  this.resetUrlToCurrentUrlTree())
                : this.location.historyGo(o);
            } else
              "replace" === this.canceledNavigationResolution &&
                (r && this.resetState(n), this.resetUrlToCurrentUrlTree());
          }
          resetState(n) {
            (this.routerState = n.currentRouterState),
              (this.currentUrlTree = n.currentUrlTree),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                this.currentUrlTree,
                n.rawUrl
              ));
          }
          resetUrlToCurrentUrlTree() {
            this.location.replaceState(
              this.urlSerializer.serialize(this.rawUrlTree),
              "",
              this.generateNgRouterState(
                this.lastSuccessfulId,
                this.currentPageId
              )
            );
          }
          cancelNavigationTransition(n, r) {
            const i = new nD(n.id, this.serializeUrl(n.extractedUrl), r);
            this.triggerEvent(i), n.resolve(!1);
          }
          generateNgRouterState(n, r) {
            return "computed" === this.canceledNavigationResolution
              ? { navigationId: n, ɵrouterPageId: r }
              : { navigationId: n };
          }
        }
        return (
          (t.ɵfac = function (n) {
            Nc();
          }),
          (t.ɵprov = G({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function sl(t) {
        return "imperative" !== t;
      }
      let ol = (() => {
        class t {
          constructor(n, r, i) {
            (this.router = n),
              (this.route = r),
              (this.locationStrategy = i),
              (this.commands = null),
              (this.href = null),
              (this.onChanges = new on()),
              (this.subscription = n.events.subscribe((s) => {
                s instanceof zs && this.updateTargetUrlAndHref();
              }));
          }
          set routerLink(n) {
            this.commands = null != n ? (Array.isArray(n) ? n : [n]) : null;
          }
          ngOnChanges(n) {
            this.updateTargetUrlAndHref(), this.onChanges.next(this);
          }
          ngOnDestroy() {
            this.subscription.unsubscribe();
          }
          onClick(n, r, i, s, o) {
            if (
              0 !== n ||
              r ||
              i ||
              s ||
              o ||
              ("string" == typeof this.target && "_self" != this.target) ||
              null === this.urlTree
            )
              return !0;
            const a = {
              skipLocationChange: Vi(this.skipLocationChange),
              replaceUrl: Vi(this.replaceUrl),
              state: this.state,
            };
            return this.router.navigateByUrl(this.urlTree, a), !1;
          }
          updateTargetUrlAndHref() {
            this.href =
              null !== this.urlTree
                ? this.locationStrategy.prepareExternalUrl(
                    this.router.serializeUrl(this.urlTree)
                  )
                : null;
          }
          get urlTree() {
            return null === this.commands
              ? null
              : this.router.createUrlTree(this.commands, {
                  relativeTo:
                    void 0 !== this.relativeTo ? this.relativeTo : this.route,
                  queryParams: this.queryParams,
                  fragment: this.fragment,
                  queryParamsHandling: this.queryParamsHandling,
                  preserveFragment: Vi(this.preserveFragment),
                });
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(D(Dt), D(ki), D(xi));
          }),
          (t.ɵdir = P({
            type: t,
            selectors: [
              ["a", "routerLink", ""],
              ["area", "routerLink", ""],
            ],
            hostVars: 2,
            hostBindings: function (n, r) {
              1 & n &&
                Ee("click", function (s) {
                  return r.onClick(
                    s.button,
                    s.ctrlKey,
                    s.shiftKey,
                    s.altKey,
                    s.metaKey
                  );
                }),
                2 & n && mn("target", r.target)("href", r.href, Ru);
            },
            inputs: {
              target: "target",
              queryParams: "queryParams",
              fragment: "fragment",
              queryParamsHandling: "queryParamsHandling",
              preserveFragment: "preserveFragment",
              skipLocationChange: "skipLocationChange",
              replaceUrl: "replaceUrl",
              state: "state",
              relativeTo: "relativeTo",
              routerLink: "routerLink",
            },
            features: [Ft],
          })),
          t
        );
      })();
      function Vi(t) {
        return "" === t || !!t;
      }
      class KD {}
      class ZD {
        preload(e, n) {
          return $(null);
        }
      }
      let YD = (() => {
          class t {
            constructor(n, r, i, s) {
              (this.router = n),
                (this.injector = i),
                (this.preloadingStrategy = s),
                (this.loader = new WD(
                  i,
                  r,
                  (l) => n.triggerEvent(new rD(l)),
                  (l) => n.triggerEvent(new iD(l))
                ));
            }
            setUpPreloading() {
              this.subscription = this.router.events
                .pipe(
                  Fi((n) => n instanceof zs),
                  qs(() => this.preload())
                )
                .subscribe(() => {});
            }
            preload() {
              const n = this.injector.get(kn);
              return this.processRoutes(n, this.router.config);
            }
            ngOnDestroy() {
              this.subscription && this.subscription.unsubscribe();
            }
            processRoutes(n, r) {
              const i = [];
              for (const s of r)
                if (s.loadChildren && !s.canLoad && s._loadedConfig) {
                  const o = s._loadedConfig;
                  i.push(this.processRoutes(o.module, o.routes));
                } else
                  s.loadChildren && !s.canLoad
                    ? i.push(this.preloadConfig(n, s))
                    : s.children && i.push(this.processRoutes(n, s.children));
              return Be(i).pipe(
                zi(),
                oe((s) => {})
              );
            }
            preloadConfig(n, r) {
              return this.preloadingStrategy.preload(r, () =>
                (r._loadedConfig
                  ? $(r._loadedConfig)
                  : this.loader.load(n.injector, r)
                ).pipe(
                  Le(
                    (s) => (
                      (r._loadedConfig = s),
                      this.processRoutes(s.module, s.routes)
                    )
                  )
                )
              );
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(T(Dt), T(Ea), T(Qe), T(KD));
            }),
            (t.ɵprov = G({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        ff = (() => {
          class t {
            constructor(n, r, i = {}) {
              (this.router = n),
                (this.viewportScroller = r),
                (this.options = i),
                (this.lastId = 0),
                (this.lastSource = "imperative"),
                (this.restoredId = 0),
                (this.store = {}),
                (i.scrollPositionRestoration =
                  i.scrollPositionRestoration || "disabled"),
                (i.anchorScrolling = i.anchorScrolling || "disabled");
            }
            init() {
              "disabled" !== this.options.scrollPositionRestoration &&
                this.viewportScroller.setHistoryScrollRestoration("manual"),
                (this.routerEventsSubscription = this.createScrollEvents()),
                (this.scrollEventsSubscription = this.consumeScrollEvents());
            }
            createScrollEvents() {
              return this.router.events.subscribe((n) => {
                n instanceof Wd
                  ? ((this.store[this.lastId] =
                      this.viewportScroller.getScrollPosition()),
                    (this.lastSource = n.navigationTrigger),
                    (this.restoredId = n.restoredState
                      ? n.restoredState.navigationId
                      : 0))
                  : n instanceof zs &&
                    ((this.lastId = n.id),
                    this.scheduleScrollEvent(
                      n,
                      this.router.parseUrl(n.urlAfterRedirects).fragment
                    ));
              });
            }
            consumeScrollEvents() {
              return this.router.events.subscribe((n) => {
                n instanceof sD &&
                  (n.position
                    ? "top" === this.options.scrollPositionRestoration
                      ? this.viewportScroller.scrollToPosition([0, 0])
                      : "enabled" === this.options.scrollPositionRestoration &&
                        this.viewportScroller.scrollToPosition(n.position)
                    : n.anchor && "enabled" === this.options.anchorScrolling
                    ? this.viewportScroller.scrollToAnchor(n.anchor)
                    : "disabled" !== this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition([0, 0]));
              });
            }
            scheduleScrollEvent(n, r) {
              this.router.triggerEvent(
                new sD(
                  n,
                  "popstate" === this.lastSource
                    ? this.store[this.restoredId]
                    : null,
                  r
                )
              );
            }
            ngOnDestroy() {
              this.routerEventsSubscription &&
                this.routerEventsSubscription.unsubscribe(),
                this.scrollEventsSubscription &&
                  this.scrollEventsSubscription.unsubscribe();
            }
          }
          return (
            (t.ɵfac = function (n) {
              Nc();
            }),
            (t.ɵprov = G({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      const xr = new q("ROUTER_CONFIGURATION"),
        JD = new q("ROUTER_FORROOT_GUARD"),
        vR = [
          Sd,
          { provide: gD, useClass: mD },
          {
            provide: Dt,
            useFactory: function bR(t, e, n, r, i, s, o = {}, a, l) {
              const u = new Dt(null, t, e, n, r, i, lD(s));
              return (
                a && (u.urlHandlingStrategy = a),
                l && (u.routeReuseStrategy = l),
                (function SR(t, e) {
                  t.errorHandler && (e.errorHandler = t.errorHandler),
                    t.malformedUriErrorHandler &&
                      (e.malformedUriErrorHandler = t.malformedUriErrorHandler),
                    t.onSameUrlNavigation &&
                      (e.onSameUrlNavigation = t.onSameUrlNavigation),
                    t.paramsInheritanceStrategy &&
                      (e.paramsInheritanceStrategy =
                        t.paramsInheritanceStrategy),
                    t.relativeLinkResolution &&
                      (e.relativeLinkResolution = t.relativeLinkResolution),
                    t.urlUpdateStrategy &&
                      (e.urlUpdateStrategy = t.urlUpdateStrategy),
                    t.canceledNavigationResolution &&
                      (e.canceledNavigationResolution =
                        t.canceledNavigationResolution);
                })(o, u),
                o.enableTracing &&
                  u.events.subscribe((c) => {
                    var d, f;
                    null === (d = console.group) ||
                      void 0 === d ||
                      d.call(console, `Router Event: ${c.constructor.name}`),
                      console.log(c.toString()),
                      console.log(c),
                      null === (f = console.groupEnd) ||
                        void 0 === f ||
                        f.call(console);
                  }),
                u
              );
            },
            deps: [
              gD,
              Xs,
              Sd,
              Qe,
              Ea,
              cf,
              xr,
              [class uR {}, new dn()],
              [class oR {}, new dn()],
            ],
          },
          Xs,
          {
            provide: ki,
            useFactory: function AR(t) {
              return t.routerState.root;
            },
            deps: [Dt],
          },
          YD,
          ZD,
          class _R {
            preload(e, n) {
              return n().pipe(tr(() => $(null)));
            }
          },
          { provide: xr, useValue: { enableTracing: !1 } },
        ];
      function DR() {
        return new Y_("Router", Dt);
      }
      let XD = (() => {
        class t {
          constructor(n, r) {}
          static forRoot(n, r) {
            return {
              ngModule: t,
              providers: [
                vR,
                eC(n),
                {
                  provide: JD,
                  useFactory: wR,
                  deps: [[Dt, new dn(), new ti()]],
                },
                { provide: xr, useValue: r || {} },
                {
                  provide: xi,
                  useFactory: ER,
                  deps: [Ar, [new cs(bd), new dn()], xr],
                },
                { provide: ff, useFactory: CR, deps: [Dt, Ax, xr] },
                {
                  provide: KD,
                  useExisting:
                    r && r.preloadingStrategy ? r.preloadingStrategy : ZD,
                },
                { provide: Y_, multi: !0, useFactory: DR },
                [
                  hf,
                  { provide: Ca, multi: !0, useFactory: MR, deps: [hf] },
                  { provide: tC, useFactory: TR, deps: [hf] },
                  { provide: G_, multi: !0, useExisting: tC },
                ],
              ],
            };
          }
          static forChild(n) {
            return { ngModule: t, providers: [eC(n)] };
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(T(JD, 8), T(Dt, 8));
          }),
          (t.ɵmod = Gt({ type: t })),
          (t.ɵinj = Tt({})),
          t
        );
      })();
      function CR(t, e, n) {
        return n.scrollOffset && e.setOffset(n.scrollOffset), new ff(t, e, n);
      }
      function ER(t, e, n = {}) {
        return n.useHash ? new uN(t, e) : new yv(t, e);
      }
      function wR(t) {
        return "guarded";
      }
      function eC(t) {
        return [
          { provide: qb, multi: !0, useValue: t },
          { provide: cf, multi: !0, useValue: t },
        ];
      }
      let hf = (() => {
        class t {
          constructor(n) {
            (this.injector = n),
              (this.initNavigation = !1),
              (this.destroyed = !1),
              (this.resultOfPreactivationDone = new on());
          }
          appInitializer() {
            return this.injector.get(oN, Promise.resolve(null)).then(() => {
              if (this.destroyed) return Promise.resolve(!0);
              let r = null;
              const i = new Promise((a) => (r = a)),
                s = this.injector.get(Dt),
                o = this.injector.get(xr);
              return (
                "disabled" === o.initialNavigation
                  ? (s.setUpLocationChangeListener(), r(!0))
                  : "enabled" === o.initialNavigation ||
                    "enabledBlocking" === o.initialNavigation
                  ? ((s.hooks.afterPreactivation = () =>
                      this.initNavigation
                        ? $(null)
                        : ((this.initNavigation = !0),
                          r(!0),
                          this.resultOfPreactivationDone)),
                    s.initialNavigation())
                  : r(!0),
                i
              );
            });
          }
          bootstrapListener(n) {
            const r = this.injector.get(xr),
              i = this.injector.get(YD),
              s = this.injector.get(ff),
              o = this.injector.get(Dt),
              a = this.injector.get(Vs);
            n === a.components[0] &&
              (("enabledNonBlocking" === r.initialNavigation ||
                void 0 === r.initialNavigation) &&
                o.initialNavigation(),
              i.setUpPreloading(),
              s.init(),
              o.resetRootComponentType(a.componentTypes[0]),
              this.resultOfPreactivationDone.next(null),
              this.resultOfPreactivationDone.complete());
          }
          ngOnDestroy() {
            this.destroyed = !0;
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(T(Qe));
          }),
          (t.ɵprov = G({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function MR(t) {
        return t.appInitializer.bind(t);
      }
      function TR(t) {
        return t.bootstrapListener.bind(t);
      }
      const tC = new q("Router Initializer");
      let pf = (() => {
          class t {
            constructor() {
              this.caisse_subject = new on();
            }
            change_caisse(n) {
              return this.caisse_subject.next(n);
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵprov = G({ token: t, factory: t.ɵfac, providedIn: "root" })),
            t
          );
        })(),
        NR = (() => {
          class t {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵcmp = It({
              type: t,
              selectors: [["app-price"]],
              inputs: {
                total_price: "total_price",
                selected_caisse: "selected_caisse",
              },
              decls: 6,
              vars: 4,
              consts: [
                [
                  1,
                  "relative",
                  "w-full",
                  "h-full",
                  "overflow-hidden",
                  "dark:text-white",
                ],
                [
                  1,
                  "text-center",
                  "inline-block",
                  "mx-auto",
                  "absolute",
                  "right-0",
                  "left-0",
                  "top-1/2",
                  "-translate-y-1/2",
                ],
                [1, "font-digital", "text-responsive-xl", "tracking-widest"],
              ],
              template: function (n, r) {
                1 & n &&
                  (I(0, "div", 0)(1, "div", 1)(2, "span", 2),
                  Y(3),
                  Ps(4, "number"),
                  M(),
                  Y(5, " DA "),
                  M()()),
                  2 & n &&
                    (ee(3),
                    Er(Qc(4, 1, r.total_price[r.selected_caisse], "1.2-2")));
              },
              pipes: [kd],
              styles: [""],
            })),
            t
          );
        })(),
        xR = (() => {
          class t {
            constructor() {}
            ngOnInit() {
              this.get_time(),
                setInterval(() => {
                  this.get_time();
                }, 6e4);
            }
            get_time() {
              let n = new Date().toLocaleString().split(",");
              (this.date = n[0]), (this.time = n[1].substring(0, 5));
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵcmp = It({
              type: t,
              selectors: [["app-date"]],
              decls: 8,
              vars: 2,
              consts: [
                [1, "p-4", "h-full"],
                [1, "w-full", "h-full"],
                [
                  1,
                  "text-responsive-lg",
                  "text-center",
                  "text-gray-700",
                  "font-bold",
                  "leading-tight",
                  "py-2",
                  "dark:text-gray-300",
                ],
                [
                  "href",
                  "",
                  1,
                  "block",
                  "w-full",
                  "mx-auto",
                  "mt-4",
                  "py-2",
                  "px-4",
                  "bg-primary",
                  "text-white",
                  "font-bold",
                  "text-center",
                  "rounded-lg",
                  "bottom-0",
                  "text-responsive-sm",
                  "hover:opacity-75",
                  "transition",
                  "duration-500",
                  "active:translate-y-1",
                  "dark:bg-dark_secondary",
                ],
              ],
              template: function (n, r) {
                1 & n &&
                  (I(0, "div", 0)(1, "div", 1)(2, "div", 2),
                  Y(3),
                  Ce(4, "br"),
                  Y(5),
                  M(),
                  I(6, "a", 3),
                  Y(7, " Voir la recette "),
                  M()()()),
                  2 & n &&
                    (ee(3), yt(" ", r.date, " "), ee(2), yt(" ", r.time, " "));
              },
              styles: [""],
            })),
            t
          );
        })(),
        nC = (() => {
          class t {
            constructor(n, r) {
              (this._renderer = n),
                (this._elementRef = r),
                (this.onChange = (i) => {}),
                (this.onTouched = () => {});
            }
            setProperty(n, r) {
              this._renderer.setProperty(this._elementRef.nativeElement, n, r);
            }
            registerOnTouched(n) {
              this.onTouched = n;
            }
            registerOnChange(n) {
              this.onChange = n;
            }
            setDisabledState(n) {
              this.setProperty("disabled", n);
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(D(On), D(_t));
            }),
            (t.ɵdir = P({ type: t })),
            t
          );
        })(),
        Fr = (() => {
          class t extends nC {}
          return (
            (t.ɵfac = (function () {
              let e;
              return function (r) {
                return (
                  e ||
                  (e = (function ze(t) {
                    return qn(() => {
                      const e = t.prototype.constructor,
                        n = e[Tn] || Du(e),
                        r = Object.prototype;
                      let i = Object.getPrototypeOf(t.prototype).constructor;
                      for (; i && i !== r; ) {
                        const s = i[Tn] || Du(i);
                        if (s && s !== n) return s;
                        i = Object.getPrototypeOf(i);
                      }
                      return (s) => new s();
                    });
                  })(t))
                )(r || t);
              };
            })()),
            (t.ɵdir = P({ type: t, features: [ne] })),
            t
          );
        })();
      const En = new q("NgValueAccessor"),
        RR = { provide: En, useExisting: ae(() => ro), multi: !0 },
        kR = new q("CompositionEventMode");
      let ro = (() => {
        class t extends nC {
          constructor(n, r, i) {
            super(n, r),
              (this._compositionMode = i),
              (this._composing = !1),
              null == this._compositionMode &&
                (this._compositionMode = !(function OR() {
                  const t = vn() ? vn().getUserAgent() : "";
                  return /android (\d+)/.test(t.toLowerCase());
                })());
          }
          writeValue(n) {
            this.setProperty("value", null == n ? "" : n);
          }
          _handleInput(n) {
            (!this._compositionMode ||
              (this._compositionMode && !this._composing)) &&
              this.onChange(n);
          }
          _compositionStart() {
            this._composing = !0;
          }
          _compositionEnd(n) {
            (this._composing = !1), this._compositionMode && this.onChange(n);
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(D(On), D(_t), D(kR, 8));
          }),
          (t.ɵdir = P({
            type: t,
            selectors: [
              ["input", "formControlName", "", 3, "type", "checkbox"],
              ["textarea", "formControlName", ""],
              ["input", "formControl", "", 3, "type", "checkbox"],
              ["textarea", "formControl", ""],
              ["input", "ngModel", "", 3, "type", "checkbox"],
              ["textarea", "ngModel", ""],
              ["", "ngDefaultControl", ""],
            ],
            hostBindings: function (n, r) {
              1 & n &&
                Ee("input", function (s) {
                  return r._handleInput(s.target.value);
                })("blur", function () {
                  return r.onTouched();
                })("compositionstart", function () {
                  return r._compositionStart();
                })("compositionend", function (s) {
                  return r._compositionEnd(s.target.value);
                });
            },
            features: [he([RR]), ne],
          })),
          t
        );
      })();
      const Ze = new q("NgValidators"),
        ir = new q("NgAsyncValidators");
      function hC(t) {
        return null != t;
      }
      function pC(t) {
        const e = ws(t) ? Be(t) : t;
        return Rc(e), e;
      }
      function gC(t) {
        let e = {};
        return (
          t.forEach((n) => {
            e = null != n ? Object.assign(Object.assign({}, e), n) : e;
          }),
          0 === Object.keys(e).length ? null : e
        );
      }
      function mC(t, e) {
        return e.map((n) => n(t));
      }
      function yC(t) {
        return t.map((e) =>
          (function LR(t) {
            return !t.validate;
          })(e)
            ? e
            : (n) => e.validate(n)
        );
      }
      function gf(t) {
        return null != t
          ? (function _C(t) {
              if (!t) return null;
              const e = t.filter(hC);
              return 0 == e.length
                ? null
                : function (n) {
                    return gC(mC(n, e));
                  };
            })(yC(t))
          : null;
      }
      function mf(t) {
        return null != t
          ? (function vC(t) {
              if (!t) return null;
              const e = t.filter(hC);
              return 0 == e.length
                ? null
                : function (n) {
                    return (function FR(...t) {
                      const e = Ph(t),
                        { args: n, keys: r } = Wv(t),
                        i = new ge((s) => {
                          const { length: o } = n;
                          if (!o) return void s.complete();
                          const a = new Array(o);
                          let l = o,
                            u = o;
                          for (let c = 0; c < o; c++) {
                            let d = !1;
                            an(n[c]).subscribe(
                              Ve(
                                s,
                                (f) => {
                                  d || ((d = !0), u--), (a[c] = f);
                                },
                                () => l--,
                                void 0,
                                () => {
                                  (!l || !d) &&
                                    (u || s.next(r ? Kv(r, a) : a),
                                    s.complete());
                                }
                              )
                            );
                          }
                        });
                      return e ? i.pipe(Qv(e)) : i;
                    })(mC(n, e).map(pC)).pipe(oe(gC));
                  };
            })(yC(t))
          : null;
      }
      function DC(t, e) {
        return null === t ? [e] : Array.isArray(t) ? [...t, e] : [t, e];
      }
      function yf(t) {
        return t ? (Array.isArray(t) ? t : [t]) : [];
      }
      function ll(t, e) {
        return Array.isArray(t) ? t.includes(e) : t === e;
      }
      function wC(t, e) {
        const n = yf(e);
        return (
          yf(t).forEach((i) => {
            ll(n, i) || n.push(i);
          }),
          n
        );
      }
      function bC(t, e) {
        return yf(e).filter((n) => !ll(t, n));
      }
      class SC {
        constructor() {
          (this._rawValidators = []),
            (this._rawAsyncValidators = []),
            (this._onDestroyCallbacks = []);
        }
        get value() {
          return this.control ? this.control.value : null;
        }
        get valid() {
          return this.control ? this.control.valid : null;
        }
        get invalid() {
          return this.control ? this.control.invalid : null;
        }
        get pending() {
          return this.control ? this.control.pending : null;
        }
        get disabled() {
          return this.control ? this.control.disabled : null;
        }
        get enabled() {
          return this.control ? this.control.enabled : null;
        }
        get errors() {
          return this.control ? this.control.errors : null;
        }
        get pristine() {
          return this.control ? this.control.pristine : null;
        }
        get dirty() {
          return this.control ? this.control.dirty : null;
        }
        get touched() {
          return this.control ? this.control.touched : null;
        }
        get status() {
          return this.control ? this.control.status : null;
        }
        get untouched() {
          return this.control ? this.control.untouched : null;
        }
        get statusChanges() {
          return this.control ? this.control.statusChanges : null;
        }
        get valueChanges() {
          return this.control ? this.control.valueChanges : null;
        }
        get path() {
          return null;
        }
        _setValidators(e) {
          (this._rawValidators = e || []),
            (this._composedValidatorFn = gf(this._rawValidators));
        }
        _setAsyncValidators(e) {
          (this._rawAsyncValidators = e || []),
            (this._composedAsyncValidatorFn = mf(this._rawAsyncValidators));
        }
        get validator() {
          return this._composedValidatorFn || null;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn || null;
        }
        _registerOnDestroy(e) {
          this._onDestroyCallbacks.push(e);
        }
        _invokeOnDestroyCallbacks() {
          this._onDestroyCallbacks.forEach((e) => e()),
            (this._onDestroyCallbacks = []);
        }
        reset(e) {
          this.control && this.control.reset(e);
        }
        hasError(e, n) {
          return !!this.control && this.control.hasError(e, n);
        }
        getError(e, n) {
          return this.control ? this.control.getError(e, n) : null;
        }
      }
      class sr extends SC {
        constructor() {
          super(...arguments),
            (this._parent = null),
            (this.name = null),
            (this.valueAccessor = null);
        }
      }
      class rt extends SC {
        get formDirective() {
          return null;
        }
        get path() {
          return null;
        }
      }
      class AC {
        constructor(e) {
          this._cd = e;
        }
        is(e) {
          var n, r, i;
          return "submitted" === e
            ? !!(null === (n = this._cd) || void 0 === n ? void 0 : n.submitted)
            : !!(null ===
                (i =
                  null === (r = this._cd) || void 0 === r
                    ? void 0
                    : r.control) || void 0 === i
                ? void 0
                : i[e]);
        }
      }
      let _f = (() => {
          class t extends AC {
            constructor(n) {
              super(n);
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(D(sr, 2));
            }),
            (t.ɵdir = P({
              type: t,
              selectors: [
                ["", "formControlName", ""],
                ["", "ngModel", ""],
                ["", "formControl", ""],
              ],
              hostVars: 14,
              hostBindings: function (n, r) {
                2 & n &&
                  ua("ng-untouched", r.is("untouched"))(
                    "ng-touched",
                    r.is("touched")
                  )("ng-pristine", r.is("pristine"))("ng-dirty", r.is("dirty"))(
                    "ng-valid",
                    r.is("valid")
                  )("ng-invalid", r.is("invalid"))(
                    "ng-pending",
                    r.is("pending")
                  );
              },
              features: [ne],
            })),
            t
          );
        })(),
        vf = (() => {
          class t extends AC {
            constructor(n) {
              super(n);
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(D(rt, 10));
            }),
            (t.ɵdir = P({
              type: t,
              selectors: [
                ["", "formGroupName", ""],
                ["", "formArrayName", ""],
                ["", "ngModelGroup", ""],
                ["", "formGroup", ""],
                ["form", 3, "ngNoForm", ""],
                ["", "ngForm", ""],
              ],
              hostVars: 16,
              hostBindings: function (n, r) {
                2 & n &&
                  ua("ng-untouched", r.is("untouched"))(
                    "ng-touched",
                    r.is("touched")
                  )("ng-pristine", r.is("pristine"))("ng-dirty", r.is("dirty"))(
                    "ng-valid",
                    r.is("valid")
                  )("ng-invalid", r.is("invalid"))(
                    "ng-pending",
                    r.is("pending")
                  )("ng-submitted", r.is("submitted"));
              },
              features: [ne],
            })),
            t
          );
        })();
      function io(t, e) {
        Ef(t, e),
          e.valueAccessor.writeValue(t.value),
          (function zR(t, e) {
            e.valueAccessor.registerOnChange((n) => {
              (t._pendingValue = n),
                (t._pendingChange = !0),
                (t._pendingDirty = !0),
                "change" === t.updateOn && TC(t, e);
            });
          })(t, e),
          (function QR(t, e) {
            const n = (r, i) => {
              e.valueAccessor.writeValue(r), i && e.viewToModelUpdate(r);
            };
            t.registerOnChange(n),
              e._registerOnDestroy(() => {
                t._unregisterOnChange(n);
              });
          })(t, e),
          (function WR(t, e) {
            e.valueAccessor.registerOnTouched(() => {
              (t._pendingTouched = !0),
                "blur" === t.updateOn && t._pendingChange && TC(t, e),
                "submit" !== t.updateOn && t.markAsTouched();
            });
          })(t, e),
          (function qR(t, e) {
            if (e.valueAccessor.setDisabledState) {
              const n = (r) => {
                e.valueAccessor.setDisabledState(r);
              };
              t.registerOnDisabledChange(n),
                e._registerOnDestroy(() => {
                  t._unregisterOnDisabledChange(n);
                });
            }
          })(t, e);
      }
      function fl(t, e) {
        t.forEach((n) => {
          n.registerOnValidatorChange && n.registerOnValidatorChange(e);
        });
      }
      function Ef(t, e) {
        const n = (function CC(t) {
          return t._rawValidators;
        })(t);
        null !== e.validator
          ? t.setValidators(DC(n, e.validator))
          : "function" == typeof n && t.setValidators([n]);
        const r = (function EC(t) {
          return t._rawAsyncValidators;
        })(t);
        null !== e.asyncValidator
          ? t.setAsyncValidators(DC(r, e.asyncValidator))
          : "function" == typeof r && t.setAsyncValidators([r]);
        const i = () => t.updateValueAndValidity();
        fl(e._rawValidators, i), fl(e._rawAsyncValidators, i);
      }
      function TC(t, e) {
        t._pendingDirty && t.markAsDirty(),
          t.setValue(t._pendingValue, { emitModelToViewChange: !1 }),
          e.viewToModelUpdate(t._pendingValue),
          (t._pendingChange = !1);
      }
      function Sf(t, e) {
        const n = t.indexOf(e);
        n > -1 && t.splice(n, 1);
      }
      const so = "VALID",
        pl = "INVALID",
        Li = "PENDING",
        oo = "DISABLED";
      function Mf(t) {
        return (gl(t) ? t.validators : t) || null;
      }
      function xC(t) {
        return Array.isArray(t) ? gf(t) : t || null;
      }
      function Tf(t, e) {
        return (gl(e) ? e.asyncValidators : t) || null;
      }
      function FC(t) {
        return Array.isArray(t) ? mf(t) : t || null;
      }
      function gl(t) {
        return null != t && !Array.isArray(t) && "object" == typeof t;
      }
      const If = (t) => t instanceof xf;
      function RC(t) {
        return ((t) => t instanceof VC)(t) ? t.value : t.getRawValue();
      }
      function OC(t, e) {
        const n = If(t),
          r = t.controls;
        if (!(n ? Object.keys(r) : r).length) throw new b(1e3, "");
        if (!r[e]) throw new b(1001, "");
      }
      function kC(t, e) {
        If(t),
          t._forEachChild((r, i) => {
            if (void 0 === e[i]) throw new b(1002, "");
          });
      }
      class Nf {
        constructor(e, n) {
          (this._pendingDirty = !1),
            (this._hasOwnPendingAsyncValidator = !1),
            (this._pendingTouched = !1),
            (this._onCollectionChange = () => {}),
            (this._parent = null),
            (this.pristine = !0),
            (this.touched = !1),
            (this._onDisabledChange = []),
            (this._rawValidators = e),
            (this._rawAsyncValidators = n),
            (this._composedValidatorFn = xC(this._rawValidators)),
            (this._composedAsyncValidatorFn = FC(this._rawAsyncValidators));
        }
        get validator() {
          return this._composedValidatorFn;
        }
        set validator(e) {
          this._rawValidators = this._composedValidatorFn = e;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn;
        }
        set asyncValidator(e) {
          this._rawAsyncValidators = this._composedAsyncValidatorFn = e;
        }
        get parent() {
          return this._parent;
        }
        get valid() {
          return this.status === so;
        }
        get invalid() {
          return this.status === pl;
        }
        get pending() {
          return this.status == Li;
        }
        get disabled() {
          return this.status === oo;
        }
        get enabled() {
          return this.status !== oo;
        }
        get dirty() {
          return !this.pristine;
        }
        get untouched() {
          return !this.touched;
        }
        get updateOn() {
          return this._updateOn
            ? this._updateOn
            : this.parent
            ? this.parent.updateOn
            : "change";
        }
        setValidators(e) {
          (this._rawValidators = e), (this._composedValidatorFn = xC(e));
        }
        setAsyncValidators(e) {
          (this._rawAsyncValidators = e),
            (this._composedAsyncValidatorFn = FC(e));
        }
        addValidators(e) {
          this.setValidators(wC(e, this._rawValidators));
        }
        addAsyncValidators(e) {
          this.setAsyncValidators(wC(e, this._rawAsyncValidators));
        }
        removeValidators(e) {
          this.setValidators(bC(e, this._rawValidators));
        }
        removeAsyncValidators(e) {
          this.setAsyncValidators(bC(e, this._rawAsyncValidators));
        }
        hasValidator(e) {
          return ll(this._rawValidators, e);
        }
        hasAsyncValidator(e) {
          return ll(this._rawAsyncValidators, e);
        }
        clearValidators() {
          this.validator = null;
        }
        clearAsyncValidators() {
          this.asyncValidator = null;
        }
        markAsTouched(e = {}) {
          (this.touched = !0),
            this._parent && !e.onlySelf && this._parent.markAsTouched(e);
        }
        markAllAsTouched() {
          this.markAsTouched({ onlySelf: !0 }),
            this._forEachChild((e) => e.markAllAsTouched());
        }
        markAsUntouched(e = {}) {
          (this.touched = !1),
            (this._pendingTouched = !1),
            this._forEachChild((n) => {
              n.markAsUntouched({ onlySelf: !0 });
            }),
            this._parent && !e.onlySelf && this._parent._updateTouched(e);
        }
        markAsDirty(e = {}) {
          (this.pristine = !1),
            this._parent && !e.onlySelf && this._parent.markAsDirty(e);
        }
        markAsPristine(e = {}) {
          (this.pristine = !0),
            (this._pendingDirty = !1),
            this._forEachChild((n) => {
              n.markAsPristine({ onlySelf: !0 });
            }),
            this._parent && !e.onlySelf && this._parent._updatePristine(e);
        }
        markAsPending(e = {}) {
          (this.status = Li),
            !1 !== e.emitEvent && this.statusChanges.emit(this.status),
            this._parent && !e.onlySelf && this._parent.markAsPending(e);
        }
        disable(e = {}) {
          const n = this._parentMarkedDirty(e.onlySelf);
          (this.status = oo),
            (this.errors = null),
            this._forEachChild((r) => {
              r.disable(Object.assign(Object.assign({}, e), { onlySelf: !0 }));
            }),
            this._updateValue(),
            !1 !== e.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._updateAncestors(
              Object.assign(Object.assign({}, e), { skipPristineCheck: n })
            ),
            this._onDisabledChange.forEach((r) => r(!0));
        }
        enable(e = {}) {
          const n = this._parentMarkedDirty(e.onlySelf);
          (this.status = so),
            this._forEachChild((r) => {
              r.enable(Object.assign(Object.assign({}, e), { onlySelf: !0 }));
            }),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: e.emitEvent,
            }),
            this._updateAncestors(
              Object.assign(Object.assign({}, e), { skipPristineCheck: n })
            ),
            this._onDisabledChange.forEach((r) => r(!1));
        }
        _updateAncestors(e) {
          this._parent &&
            !e.onlySelf &&
            (this._parent.updateValueAndValidity(e),
            e.skipPristineCheck || this._parent._updatePristine(),
            this._parent._updateTouched());
        }
        setParent(e) {
          this._parent = e;
        }
        updateValueAndValidity(e = {}) {
          this._setInitialStatus(),
            this._updateValue(),
            this.enabled &&
              (this._cancelExistingSubscription(),
              (this.errors = this._runValidator()),
              (this.status = this._calculateStatus()),
              (this.status === so || this.status === Li) &&
                this._runAsyncValidator(e.emitEvent)),
            !1 !== e.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._parent &&
              !e.onlySelf &&
              this._parent.updateValueAndValidity(e);
        }
        _updateTreeValidity(e = { emitEvent: !0 }) {
          this._forEachChild((n) => n._updateTreeValidity(e)),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: e.emitEvent,
            });
        }
        _setInitialStatus() {
          this.status = this._allControlsDisabled() ? oo : so;
        }
        _runValidator() {
          return this.validator ? this.validator(this) : null;
        }
        _runAsyncValidator(e) {
          if (this.asyncValidator) {
            (this.status = Li), (this._hasOwnPendingAsyncValidator = !0);
            const n = pC(this.asyncValidator(this));
            this._asyncValidationSubscription = n.subscribe((r) => {
              (this._hasOwnPendingAsyncValidator = !1),
                this.setErrors(r, { emitEvent: e });
            });
          }
        }
        _cancelExistingSubscription() {
          this._asyncValidationSubscription &&
            (this._asyncValidationSubscription.unsubscribe(),
            (this._hasOwnPendingAsyncValidator = !1));
        }
        setErrors(e, n = {}) {
          (this.errors = e), this._updateControlsErrors(!1 !== n.emitEvent);
        }
        get(e) {
          return (function JR(t, e, n) {
            if (
              null == e ||
              (Array.isArray(e) || (e = e.split(n)),
              Array.isArray(e) && 0 === e.length)
            )
              return null;
            let r = t;
            return (
              e.forEach((i) => {
                r = If(r)
                  ? r.controls.hasOwnProperty(i)
                    ? r.controls[i]
                    : null
                  : (((t) => t instanceof eO)(r) && r.at(i)) || null;
              }),
              r
            );
          })(this, e, ".");
        }
        getError(e, n) {
          const r = n ? this.get(n) : this;
          return r && r.errors ? r.errors[e] : null;
        }
        hasError(e, n) {
          return !!this.getError(e, n);
        }
        get root() {
          let e = this;
          for (; e._parent; ) e = e._parent;
          return e;
        }
        _updateControlsErrors(e) {
          (this.status = this._calculateStatus()),
            e && this.statusChanges.emit(this.status),
            this._parent && this._parent._updateControlsErrors(e);
        }
        _initObservables() {
          (this.valueChanges = new be()), (this.statusChanges = new be());
        }
        _calculateStatus() {
          return this._allControlsDisabled()
            ? oo
            : this.errors
            ? pl
            : this._hasOwnPendingAsyncValidator ||
              this._anyControlsHaveStatus(Li)
            ? Li
            : this._anyControlsHaveStatus(pl)
            ? pl
            : so;
        }
        _anyControlsHaveStatus(e) {
          return this._anyControls((n) => n.status === e);
        }
        _anyControlsDirty() {
          return this._anyControls((e) => e.dirty);
        }
        _anyControlsTouched() {
          return this._anyControls((e) => e.touched);
        }
        _updatePristine(e = {}) {
          (this.pristine = !this._anyControlsDirty()),
            this._parent && !e.onlySelf && this._parent._updatePristine(e);
        }
        _updateTouched(e = {}) {
          (this.touched = this._anyControlsTouched()),
            this._parent && !e.onlySelf && this._parent._updateTouched(e);
        }
        _isBoxedValue(e) {
          return (
            "object" == typeof e &&
            null !== e &&
            2 === Object.keys(e).length &&
            "value" in e &&
            "disabled" in e
          );
        }
        _registerOnCollectionChange(e) {
          this._onCollectionChange = e;
        }
        _setUpdateStrategy(e) {
          gl(e) && null != e.updateOn && (this._updateOn = e.updateOn);
        }
        _parentMarkedDirty(e) {
          return (
            !e &&
            !(!this._parent || !this._parent.dirty) &&
            !this._parent._anyControlsDirty()
          );
        }
      }
      class VC extends Nf {
        constructor(e = null, n, r) {
          super(Mf(n), Tf(r, n)),
            (this.defaultValue = null),
            (this._onChange = []),
            (this._pendingChange = !1),
            this._applyFormState(e),
            this._setUpdateStrategy(n),
            this._initObservables(),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: !!this.asyncValidator,
            }),
            gl(n) &&
              n.initialValueIsDefault &&
              (this.defaultValue = this._isBoxedValue(e) ? e.value : e);
        }
        setValue(e, n = {}) {
          (this.value = this._pendingValue = e),
            this._onChange.length &&
              !1 !== n.emitModelToViewChange &&
              this._onChange.forEach((r) =>
                r(this.value, !1 !== n.emitViewToModelChange)
              ),
            this.updateValueAndValidity(n);
        }
        patchValue(e, n = {}) {
          this.setValue(e, n);
        }
        reset(e = this.defaultValue, n = {}) {
          this._applyFormState(e),
            this.markAsPristine(n),
            this.markAsUntouched(n),
            this.setValue(this.value, n),
            (this._pendingChange = !1);
        }
        _updateValue() {}
        _anyControls(e) {
          return !1;
        }
        _allControlsDisabled() {
          return this.disabled;
        }
        registerOnChange(e) {
          this._onChange.push(e);
        }
        _unregisterOnChange(e) {
          Sf(this._onChange, e);
        }
        registerOnDisabledChange(e) {
          this._onDisabledChange.push(e);
        }
        _unregisterOnDisabledChange(e) {
          Sf(this._onDisabledChange, e);
        }
        _forEachChild(e) {}
        _syncPendingControls() {
          return !(
            "submit" !== this.updateOn ||
            (this._pendingDirty && this.markAsDirty(),
            this._pendingTouched && this.markAsTouched(),
            !this._pendingChange) ||
            (this.setValue(this._pendingValue, {
              onlySelf: !0,
              emitModelToViewChange: !1,
            }),
            0)
          );
        }
        _applyFormState(e) {
          this._isBoxedValue(e)
            ? ((this.value = this._pendingValue = e.value),
              e.disabled
                ? this.disable({ onlySelf: !0, emitEvent: !1 })
                : this.enable({ onlySelf: !0, emitEvent: !1 }))
            : (this.value = this._pendingValue = e);
        }
      }
      class xf extends Nf {
        constructor(e, n, r) {
          super(Mf(n), Tf(r, n)),
            (this.controls = e),
            this._initObservables(),
            this._setUpdateStrategy(n),
            this._setUpControls(),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: !!this.asyncValidator,
            });
        }
        registerControl(e, n) {
          return this.controls[e]
            ? this.controls[e]
            : ((this.controls[e] = n),
              n.setParent(this),
              n._registerOnCollectionChange(this._onCollectionChange),
              n);
        }
        addControl(e, n, r = {}) {
          this.registerControl(e, n),
            this.updateValueAndValidity({ emitEvent: r.emitEvent }),
            this._onCollectionChange();
        }
        removeControl(e, n = {}) {
          this.controls[e] &&
            this.controls[e]._registerOnCollectionChange(() => {}),
            delete this.controls[e],
            this.updateValueAndValidity({ emitEvent: n.emitEvent }),
            this._onCollectionChange();
        }
        setControl(e, n, r = {}) {
          this.controls[e] &&
            this.controls[e]._registerOnCollectionChange(() => {}),
            delete this.controls[e],
            n && this.registerControl(e, n),
            this.updateValueAndValidity({ emitEvent: r.emitEvent }),
            this._onCollectionChange();
        }
        contains(e) {
          return this.controls.hasOwnProperty(e) && this.controls[e].enabled;
        }
        setValue(e, n = {}) {
          kC(this, e),
            Object.keys(e).forEach((r) => {
              OC(this, r),
                this.controls[r].setValue(e[r], {
                  onlySelf: !0,
                  emitEvent: n.emitEvent,
                });
            }),
            this.updateValueAndValidity(n);
        }
        patchValue(e, n = {}) {
          null != e &&
            (Object.keys(e).forEach((r) => {
              this.controls[r] &&
                this.controls[r].patchValue(e[r], {
                  onlySelf: !0,
                  emitEvent: n.emitEvent,
                });
            }),
            this.updateValueAndValidity(n));
        }
        reset(e = {}, n = {}) {
          this._forEachChild((r, i) => {
            r.reset(e[i], { onlySelf: !0, emitEvent: n.emitEvent });
          }),
            this._updatePristine(n),
            this._updateTouched(n),
            this.updateValueAndValidity(n);
        }
        getRawValue() {
          return this._reduceChildren({}, (e, n, r) => ((e[r] = RC(n)), e));
        }
        _syncPendingControls() {
          let e = this._reduceChildren(
            !1,
            (n, r) => !!r._syncPendingControls() || n
          );
          return e && this.updateValueAndValidity({ onlySelf: !0 }), e;
        }
        _forEachChild(e) {
          Object.keys(this.controls).forEach((n) => {
            const r = this.controls[n];
            r && e(r, n);
          });
        }
        _setUpControls() {
          this._forEachChild((e) => {
            e.setParent(this),
              e._registerOnCollectionChange(this._onCollectionChange);
          });
        }
        _updateValue() {
          this.value = this._reduceValue();
        }
        _anyControls(e) {
          for (const n of Object.keys(this.controls)) {
            const r = this.controls[n];
            if (this.contains(n) && e(r)) return !0;
          }
          return !1;
        }
        _reduceValue() {
          return this._reduceChildren(
            {},
            (e, n, r) => ((n.enabled || this.disabled) && (e[r] = n.value), e)
          );
        }
        _reduceChildren(e, n) {
          let r = e;
          return (
            this._forEachChild((i, s) => {
              r = n(r, i, s);
            }),
            r
          );
        }
        _allControlsDisabled() {
          for (const e of Object.keys(this.controls))
            if (this.controls[e].enabled) return !1;
          return Object.keys(this.controls).length > 0 || this.disabled;
        }
      }
      class eO extends Nf {
        constructor(e, n, r) {
          super(Mf(n), Tf(r, n)),
            (this.controls = e),
            this._initObservables(),
            this._setUpdateStrategy(n),
            this._setUpControls(),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: !!this.asyncValidator,
            });
        }
        at(e) {
          return this.controls[e];
        }
        push(e, n = {}) {
          this.controls.push(e),
            this._registerControl(e),
            this.updateValueAndValidity({ emitEvent: n.emitEvent }),
            this._onCollectionChange();
        }
        insert(e, n, r = {}) {
          this.controls.splice(e, 0, n),
            this._registerControl(n),
            this.updateValueAndValidity({ emitEvent: r.emitEvent });
        }
        removeAt(e, n = {}) {
          this.controls[e] &&
            this.controls[e]._registerOnCollectionChange(() => {}),
            this.controls.splice(e, 1),
            this.updateValueAndValidity({ emitEvent: n.emitEvent });
        }
        setControl(e, n, r = {}) {
          this.controls[e] &&
            this.controls[e]._registerOnCollectionChange(() => {}),
            this.controls.splice(e, 1),
            n && (this.controls.splice(e, 0, n), this._registerControl(n)),
            this.updateValueAndValidity({ emitEvent: r.emitEvent }),
            this._onCollectionChange();
        }
        get length() {
          return this.controls.length;
        }
        setValue(e, n = {}) {
          kC(this, e),
            e.forEach((r, i) => {
              OC(this, i),
                this.at(i).setValue(r, {
                  onlySelf: !0,
                  emitEvent: n.emitEvent,
                });
            }),
            this.updateValueAndValidity(n);
        }
        patchValue(e, n = {}) {
          null != e &&
            (e.forEach((r, i) => {
              this.at(i) &&
                this.at(i).patchValue(r, {
                  onlySelf: !0,
                  emitEvent: n.emitEvent,
                });
            }),
            this.updateValueAndValidity(n));
        }
        reset(e = [], n = {}) {
          this._forEachChild((r, i) => {
            r.reset(e[i], { onlySelf: !0, emitEvent: n.emitEvent });
          }),
            this._updatePristine(n),
            this._updateTouched(n),
            this.updateValueAndValidity(n);
        }
        getRawValue() {
          return this.controls.map((e) => RC(e));
        }
        clear(e = {}) {
          this.controls.length < 1 ||
            (this._forEachChild((n) => n._registerOnCollectionChange(() => {})),
            this.controls.splice(0),
            this.updateValueAndValidity({ emitEvent: e.emitEvent }));
        }
        _syncPendingControls() {
          let e = this.controls.reduce(
            (n, r) => !!r._syncPendingControls() || n,
            !1
          );
          return e && this.updateValueAndValidity({ onlySelf: !0 }), e;
        }
        _forEachChild(e) {
          this.controls.forEach((n, r) => {
            e(n, r);
          });
        }
        _updateValue() {
          this.value = this.controls
            .filter((e) => e.enabled || this.disabled)
            .map((e) => e.value);
        }
        _anyControls(e) {
          return this.controls.some((n) => n.enabled && e(n));
        }
        _setUpControls() {
          this._forEachChild((e) => this._registerControl(e));
        }
        _allControlsDisabled() {
          for (const e of this.controls) if (e.enabled) return !1;
          return this.controls.length > 0 || this.disabled;
        }
        _registerControl(e) {
          e.setParent(this),
            e._registerOnCollectionChange(this._onCollectionChange);
        }
      }
      const tO = { provide: rt, useExisting: ae(() => lo) },
        ao = (() => Promise.resolve(null))();
      let lo = (() => {
        class t extends rt {
          constructor(n, r) {
            super(),
              (this.submitted = !1),
              (this._directives = new Set()),
              (this.ngSubmit = new be()),
              (this.form = new xf({}, gf(n), mf(r)));
          }
          ngAfterViewInit() {
            this._setUpdateStrategy();
          }
          get formDirective() {
            return this;
          }
          get control() {
            return this.form;
          }
          get path() {
            return [];
          }
          get controls() {
            return this.form.controls;
          }
          addControl(n) {
            ao.then(() => {
              const r = this._findContainer(n.path);
              (n.control = r.registerControl(n.name, n.control)),
                io(n.control, n),
                n.control.updateValueAndValidity({ emitEvent: !1 }),
                this._directives.add(n);
            });
          }
          getControl(n) {
            return this.form.get(n.path);
          }
          removeControl(n) {
            ao.then(() => {
              const r = this._findContainer(n.path);
              r && r.removeControl(n.name), this._directives.delete(n);
            });
          }
          addFormGroup(n) {
            ao.then(() => {
              const r = this._findContainer(n.path),
                i = new xf({});
              (function IC(t, e) {
                Ef(t, e);
              })(i, n),
                r.registerControl(n.name, i),
                i.updateValueAndValidity({ emitEvent: !1 });
            });
          }
          removeFormGroup(n) {
            ao.then(() => {
              const r = this._findContainer(n.path);
              r && r.removeControl(n.name);
            });
          }
          getFormGroup(n) {
            return this.form.get(n.path);
          }
          updateModel(n, r) {
            ao.then(() => {
              this.form.get(n.path).setValue(r);
            });
          }
          setValue(n) {
            this.control.setValue(n);
          }
          onSubmit(n) {
            return (
              (this.submitted = !0),
              (function NC(t, e) {
                t._syncPendingControls(),
                  e.forEach((n) => {
                    const r = n.control;
                    "submit" === r.updateOn &&
                      r._pendingChange &&
                      (n.viewToModelUpdate(r._pendingValue),
                      (r._pendingChange = !1));
                  });
              })(this.form, this._directives),
              this.ngSubmit.emit(n),
              !1
            );
          }
          onReset() {
            this.resetForm();
          }
          resetForm(n) {
            this.form.reset(n), (this.submitted = !1);
          }
          _setUpdateStrategy() {
            this.options &&
              null != this.options.updateOn &&
              (this.form._updateOn = this.options.updateOn);
          }
          _findContainer(n) {
            return n.pop(), n.length ? this.form.get(n) : this.form;
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(D(Ze, 10), D(ir, 10));
          }),
          (t.ɵdir = P({
            type: t,
            selectors: [
              ["form", 3, "ngNoForm", "", 3, "formGroup", ""],
              ["ng-form"],
              ["", "ngForm", ""],
            ],
            hostBindings: function (n, r) {
              1 & n &&
                Ee("submit", function (s) {
                  return r.onSubmit(s);
                })("reset", function () {
                  return r.onReset();
                });
            },
            inputs: { options: ["ngFormOptions", "options"] },
            outputs: { ngSubmit: "ngSubmit" },
            exportAs: ["ngForm"],
            features: [he([tO]), ne],
          })),
          t
        );
      })();
      const rO = { provide: sr, useExisting: ae(() => ml) },
        jC = (() => Promise.resolve(null))();
      let ml = (() => {
          class t extends sr {
            constructor(n, r, i, s, o) {
              super(),
                (this._changeDetectorRef = o),
                (this.control = new VC()),
                (this._registered = !1),
                (this.update = new be()),
                (this._parent = n),
                this._setValidators(r),
                this._setAsyncValidators(i),
                (this.valueAccessor = (function bf(t, e) {
                  if (!e) return null;
                  let n, r, i;
                  return (
                    Array.isArray(e),
                    e.forEach((s) => {
                      s.constructor === ro
                        ? (n = s)
                        : (function YR(t) {
                            return Object.getPrototypeOf(t.constructor) === Fr;
                          })(s)
                        ? (r = s)
                        : (i = s);
                    }),
                    i || r || n || null
                  );
                })(0, s));
            }
            ngOnChanges(n) {
              if ((this._checkForErrors(), !this._registered || "name" in n)) {
                if (
                  this._registered &&
                  (this._checkName(), this.formDirective)
                ) {
                  const r = n.name.previousValue;
                  this.formDirective.removeControl({
                    name: r,
                    path: this._getPath(r),
                  });
                }
                this._setUpControl();
              }
              "isDisabled" in n && this._updateDisabled(n),
                (function wf(t, e) {
                  if (!t.hasOwnProperty("model")) return !1;
                  const n = t.model;
                  return !!n.isFirstChange() || !Object.is(e, n.currentValue);
                })(n, this.viewModel) &&
                  (this._updateValue(this.model),
                  (this.viewModel = this.model));
            }
            ngOnDestroy() {
              this.formDirective && this.formDirective.removeControl(this);
            }
            get path() {
              return this._getPath(this.name);
            }
            get formDirective() {
              return this._parent ? this._parent.formDirective : null;
            }
            viewToModelUpdate(n) {
              (this.viewModel = n), this.update.emit(n);
            }
            _setUpControl() {
              this._setUpdateStrategy(),
                this._isStandalone()
                  ? this._setUpStandalone()
                  : this.formDirective.addControl(this),
                (this._registered = !0);
            }
            _setUpdateStrategy() {
              this.options &&
                null != this.options.updateOn &&
                (this.control._updateOn = this.options.updateOn);
            }
            _isStandalone() {
              return (
                !this._parent || !(!this.options || !this.options.standalone)
              );
            }
            _setUpStandalone() {
              io(this.control, this),
                this.control.updateValueAndValidity({ emitEvent: !1 });
            }
            _checkForErrors() {
              this._isStandalone() || this._checkParentType(),
                this._checkName();
            }
            _checkParentType() {}
            _checkName() {
              this.options &&
                this.options.name &&
                (this.name = this.options.name),
                this._isStandalone();
            }
            _updateValue(n) {
              jC.then(() => {
                var r;
                this.control.setValue(n, { emitViewToModelChange: !1 }),
                  null === (r = this._changeDetectorRef) ||
                    void 0 === r ||
                    r.markForCheck();
              });
            }
            _updateDisabled(n) {
              const r = n.isDisabled.currentValue,
                i = "" === r || (r && "false" !== r);
              jC.then(() => {
                var s;
                i && !this.control.disabled
                  ? this.control.disable()
                  : !i && this.control.disabled && this.control.enable(),
                  null === (s = this._changeDetectorRef) ||
                    void 0 === s ||
                    s.markForCheck();
              });
            }
            _getPath(n) {
              return this._parent
                ? (function cl(t, e) {
                    return [...e.path, t];
                  })(n, this._parent)
                : [n];
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(
                D(rt, 9),
                D(Ze, 10),
                D(ir, 10),
                D(En, 10),
                D(wa, 8)
              );
            }),
            (t.ɵdir = P({
              type: t,
              selectors: [
                [
                  "",
                  "ngModel",
                  "",
                  3,
                  "formControlName",
                  "",
                  3,
                  "formControl",
                  "",
                ],
              ],
              inputs: {
                name: "name",
                isDisabled: ["disabled", "isDisabled"],
                model: ["ngModel", "model"],
                options: ["ngModelOptions", "options"],
              },
              outputs: { update: "ngModelChange" },
              exportAs: ["ngModel"],
              features: [he([rO]), ne, Ft],
            })),
            t
          );
        })(),
        Ff = (() => {
          class t {}
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵdir = P({
              type: t,
              selectors: [
                ["form", 3, "ngNoForm", "", 3, "ngNativeValidate", ""],
              ],
              hostAttrs: ["novalidate", ""],
            })),
            t
          );
        })(),
        HC = (() => {
          class t {}
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵmod = Gt({ type: t })),
            (t.ɵinj = Tt({})),
            t
          );
        })(),
        TO = (() => {
          class t {}
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵmod = Gt({ type: t })),
            (t.ɵinj = Tt({ imports: [[HC]] })),
            t
          );
        })(),
        IO = (() => {
          class t {}
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵmod = Gt({ type: t })),
            (t.ɵinj = Tt({ imports: [TO] })),
            t
          );
        })();
      function NO(t, e) {
        if (1 & t) {
          const n = Cr();
          I(0, "div", 10)(1, "div", 11),
            Y(2),
            M(),
            I(3, "div", 12),
            Y(4),
            Ps(5, "titlecase"),
            M(),
            I(6, "div", 11)(7, "span", 13),
            Y(8),
            Ps(9, "number"),
            M()(),
            I(10, "div"),
            Ce(11, "input", 14),
            M(),
            I(12, "div", 15)(13, "span", 16),
            Ee("click", function () {
              const s = In(n).$implicit,
                o = at(),
                a = oa(11);
              return o.delete_product(s.id, a);
            }),
            Ce(14, "i", 17),
            M()()();
        }
        if (2 & t) {
          const n = e.$implicit,
            r = e.index;
          ee(2),
            yt("", r + 1, "."),
            ee(2),
            yt(" ", Wc(5, 4, n.nom), " "),
            ee(4),
            Er(Qc(9, 6, n.prix, "1.2-2")),
            ee(3),
            la("value", n.quantite);
        }
      }
      const xO = function (t) {
        return { "bg-gray-200 dark:bg-gray-700": t };
      };
      function FO(t, e) {
        if (1 & t) {
          const n = Cr();
          I(0, "div", 20),
            Ee("click", function () {
              const s = In(n).$implicit;
              return at(2).select_suggestion(s.id);
            }),
            I(1, "div"),
            Y(2),
            M(),
            I(3, "div", 21),
            Y(4),
            Ps(5, "titlecase"),
            M(),
            I(6, "div")(7, "span", 22),
            Y(8),
            M(),
            Y(9, " DA "),
            M(),
            I(10, "div")(11, "span", 23),
            Y(12),
            M()(),
            Ce(13, "div", 24),
            M();
        }
        if (2 & t) {
          const n = e.$implicit,
            r = e.index,
            i = at(2);
          Ne("ngClass", br(7, xO, i.selected_suggestions[n.id])),
            ee(2),
            yt("", r + 1, "."),
            ee(2),
            yt(" ", Wc(5, 5, n.nom), " "),
            ee(4),
            Er(n.prix),
            ee(4),
            Er(n.stock);
        }
      }
      function PO(t, e) {
        if (
          (1 & t && (I(0, "div", 18), Rn(1, FO, 14, 9, "div", 19), M()), 2 & t)
        ) {
          const n = at();
          ee(1), Ne("ngForOf", n.suggestions_products);
        }
      }
      let RO = (() => {
        class t {
          constructor() {
            (this.all_products = []),
              (this.show_suggestions = !1),
              (this.selected_suggestions = {}),
              (this.sold_products = []),
              (this.suggestions_products = []),
              (this.searched_product = []);
          }
          ngOnInit() {}
          add_to_sold_products(n) {
            this.sold_products.includes(n)
              ? this.sold_products.find((r) => r.id == n.id).quantite++
              : (this.sold_products.push(n), (this.show_suggestions = !1)),
              (this.show_suggestions = !1);
          }
          suggestions_show(n) {
            n.value.input_search.length > 0
              ? (this.all_products.forEach((r) => {
                  if (r.code_bar == n.value.input_search)
                    return (
                      n.reset(),
                      (this.show_suggestions = !1),
                      void this.add_to_sold_products(r)
                    );
                }),
                (this.suggestions_products = this.all_products.filter(
                  (r) =>
                    !!(
                      r.nom.startsWith(n.value.input_search) ||
                      r.nom.toLowerCase().startsWith(n.value.input_search) ||
                      r.nom.toUpperCase().startsWith(n.value.input_search)
                    )
                )),
                (this.show_suggestions = !0))
              : (this.show_suggestions = !1);
          }
          submit_search(n) {
            let r = this.all_products.find(
              (i) => i.id == this.suggestion_selected_id
            );
            this.add_to_sold_products(r), n.reset();
          }
          select_suggestion(n) {
            (this.selected_suggestions = {}),
              (this.suggestion_selected_id = n),
              (this.selected_suggestions[n] = !0);
          }
          delete_product(n, r) {
            (this.sold_products = this.sold_products.filter((i) => i.id !== n)),
              r.reset();
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)();
          }),
          (t.ɵcmp = It({
            type: t,
            selectors: [["app-products"]],
            inputs: { all_products: "all_products" },
            decls: 19,
            vars: 2,
            consts: [
              [1, "h-full", "relative", "dark:text-gray-200"],
              [
                1,
                "py-3",
                "product_grid",
                "text-responsive-sm",
                "shadow-md",
                "bg-primary",
                "text-white",
                "font-semibold",
                "dark:bg-dark_primary",
              ],
              [
                1,
                "h-16",
                "flex",
                "shadow-md",
                "relative",
                "dark:bg-dark_third",
                "dark:shadow-xl",
              ],
              ["f", "ngForm"],
              [1, "w-3/4"],
              [
                "name",
                "input_search",
                "ngModel",
                "",
                "type",
                "text",
                "placeholder",
                "Chercher un produit...",
                1,
                "block",
                "w-full",
                "h-full",
                "bg-transparent",
                "px-8",
                "text-responsive-sm",
                "focus:outline-none",
                3,
                "input",
              ],
              [
                "type",
                "submit",
                1,
                "block",
                "w-1/4",
                "text-center",
                "bg-secondary",
                "text-responsive-sm",
                "font-bold",
                "text-white",
                "hover:opacity-75",
                "transition",
                "duration-500",
                "dark:bg-dark_secondary",
                3,
                "click",
              ],
              [1, "h-3/4", "overflow-auto", "pt-6", "relative"],
              [
                "class",
                "product_grid py-2 px-6 text-lg border-b border-dashed border-gray-200 text-responsive-sm dark:border-gray-700",
                4,
                "ngFor",
                "ngForOf",
              ],
              [
                "class",
                "bg-white shadow-lg absolute top-0 w-full h-fit z-40 dark:bg-dark_secondary",
                4,
                "ngIf",
              ],
              [
                1,
                "product_grid",
                "py-2",
                "px-6",
                "text-lg",
                "border-b",
                "border-dashed",
                "border-gray-200",
                "text-responsive-sm",
                "dark:border-gray-700",
              ],
              [1, "pt-3"],
              [1, "font-bold", "overflow-x-hidden", "pt-3"],
              [
                1,
                "bg-secondary",
                "text-white",
                "rounded-full",
                "py-1",
                "px-3",
                "font-bold",
                "overflow-x-hidden",
                "dark:bg-dark_third",
              ],
              [
                "type",
                "number",
                1,
                "rounded-md",
                "border",
                "border-gray-300",
                "w-36",
                "py-2",
                "px-4",
                "font-bold",
                "overflow-x-hidden",
                "focus:outline-none",
                "focus:border-cyan-800",
                "dark:border-gray-700",
                "dark:bg-gray-900",
                "dark:focus:border-gray-600",
                3,
                "value",
              ],
              [1, "text-center", "pt-1"],
              [3, "click"],
              [
                1,
                "fas",
                "fa-trash",
                "fa-lg",
                "p-1",
                "h-6",
                "w-6",
                "text-red-500",
                "mx-4",
                "cursor-pointer",
                "rounded-full",
                "hover:bg-red-700",
                "hover:text-white",
                "transition",
                "duration-500",
                "active:translate-y-1",
                "dark:text-red-900",
                "dark:hover:text-gray-200",
                "dark:hover:bg-red-900",
              ],
              [
                1,
                "bg-white",
                "shadow-lg",
                "absolute",
                "top-0",
                "w-full",
                "h-fit",
                "z-40",
                "dark:bg-dark_secondary",
              ],
              [
                "class",
                "product_grid py-4 px-8 text-lg border-t border-dashed border-gray-200 cursor-pointer hover:bg-gray-200 dark:border-gray-700 text-responsive-sm hover:dark:bg-gray-700",
                3,
                "ngClass",
                "click",
                4,
                "ngFor",
                "ngForOf",
              ],
              [
                1,
                "product_grid",
                "py-4",
                "px-8",
                "text-lg",
                "border-t",
                "border-dashed",
                "border-gray-200",
                "cursor-pointer",
                "hover:bg-gray-200",
                "dark:border-gray-700",
                "text-responsive-sm",
                "hover:dark:bg-gray-700",
                3,
                "ngClass",
                "click",
              ],
              [1, "font-bold", "overflow-x-hidden"],
              [
                1,
                "bg-fifth",
                "rounded-full",
                "py-1",
                "px-2",
                "font-bold",
                "overflow-x-hidden",
                "dark:bg-dark_third",
              ],
              [
                1,
                "bg-fourth",
                "rounded-full",
                "py-1",
                "px-2",
                "font-bold",
                "overflow-x-hidden",
                "dark:bg-cyan-900",
              ],
              [1, "text-center"],
            ],
            template: function (n, r) {
              if (1 & n) {
                const i = Cr();
                I(0, "div", 0)(1, "div", 1),
                  Ce(2, "div"),
                  I(3, "div"),
                  Y(4, "Article"),
                  M(),
                  I(5, "div"),
                  Y(6, "Prix"),
                  M(),
                  I(7, "div"),
                  Y(8, "Quantit\xe9"),
                  M(),
                  Ce(9, "div"),
                  M(),
                  I(10, "form", 2, 3)(12, "div", 4)(13, "input", 5),
                  Ee("input", function () {
                    In(i);
                    const o = oa(11);
                    return r.suggestions_show(o);
                  }),
                  M()(),
                  I(14, "button", 6),
                  Ee("click", function () {
                    In(i);
                    const o = oa(11);
                    return r.submit_search(o);
                  }),
                  Y(15, " Confirmer "),
                  M()(),
                  I(16, "div", 7),
                  Rn(17, NO, 15, 9, "div", 8),
                  Rn(18, PO, 2, 1, "div", 9),
                  M()();
              }
              2 & n &&
                (ee(17),
                Ne("ngForOf", r.sold_products),
                ee(1),
                Ne("ngIf", r.show_suggestions));
            },
            directives: [Ff, vf, lo, ro, _f, ml, Hs, La, Us],
            pipes: [Nv, kd],
            styles: [
              ".product_grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:5% 30% 25% 20% 20%}",
            ],
          })),
          t
        );
      })();
      const OO = function (t) {
          return {
            "bg-secondary border-none dark:bg-dark_secondary -translate-y-1": t,
          };
        },
        oE = function (t) {
          return { "text-gray-100 ": t };
        };
      function kO(t, e) {
        if (1 & t) {
          const n = Cr();
          I(0, "div", 2),
            Ee("click", function () {
              const s = In(n).$implicit;
              return at().change_caisse(s.name);
            }),
            I(1, "span", 3),
            Ce(2, "i", 4),
            M(),
            Ce(3, "br"),
            I(4, "span", 5),
            Y(5),
            M()();
        }
        if (2 & t) {
          const n = e.$implicit,
            r = e.index,
            i = at();
          Ne("ngClass", br(4, OO, i.selected_caisse == n.name)),
            ee(1),
            Ne("ngClass", br(6, oE, i.selected_caisse == n.name)),
            ee(3),
            Ne("ngClass", br(8, oE, i.selected_caisse == n.name)),
            ee(1),
            yt("Caisse ", r + 1, "");
        }
      }
      let VO = (() => {
        class t {
          constructor(n) {
            this.shared = n;
          }
          ngOnInit() {}
          change_caisse(n) {
            this.shared.change_caisse(n);
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(D(pf));
          }),
          (t.ɵcmp = It({
            type: t,
            selectors: [["app-caisses"]],
            inputs: {
              total_caisses: "total_caisses",
              selected_caisse: "selected_caisse",
            },
            decls: 2,
            vars: 1,
            consts: [
              [1, "p-2", "h-fit", "flex", "gap-2"],
              [
                "class",
                "h-full w-1/4 py-3 border-2 border-fifth text-center text-primary text-responsive-md font-bold rounded-md cursor-pointer active:translate-y-1 transition duration-500 dark:text-gray-300 dark:border-gray-800",
                3,
                "ngClass",
                "click",
                4,
                "ngFor",
                "ngForOf",
              ],
              [
                1,
                "h-full",
                "w-1/4",
                "py-3",
                "border-2",
                "border-fifth",
                "text-center",
                "text-primary",
                "text-responsive-md",
                "font-bold",
                "rounded-md",
                "cursor-pointer",
                "active:translate-y-1",
                "transition",
                "duration-500",
                "dark:text-gray-300",
                "dark:border-gray-800",
                3,
                "ngClass",
                "click",
              ],
              [1, "", 3, "ngClass"],
              [1, "fas", "fa-cash-register", "fa-2xl"],
              [1, "text-responsive-sm", 3, "ngClass"],
            ],
            template: function (n, r) {
              1 & n && (I(0, "div", 0), Rn(1, kO, 6, 10, "div", 1), M()),
                2 & n && (ee(1), Ne("ngForOf", r.total_caisses));
            },
            directives: [Hs, Us],
            styles: [""],
          })),
          t
        );
      })();
      const LO = function (t) {
        return { "bg-gray-300 dark:bg-gray-700": t };
      };
      function BO(t, e) {
        if (1 & t) {
          const n = Cr();
          I(0, "div", 12),
            Ee("click", function () {
              const s = In(n).$implicit;
              return at(2).select_client(s.id);
            }),
            I(1, "div", 13),
            Y(2),
            M(),
            I(3, "div", 14),
            Y(4),
            M(),
            I(5, "div", 15),
            Y(6),
            M()();
        }
        if (2 & t) {
          const n = e.$implicit,
            r = at(2);
          Ne("ngClass", br(4, LO, r.selected_client[n.id])),
            ee(2),
            yt("", n.id, "."),
            ee(2),
            yt(" ", n.nom, " "),
            ee(2),
            yt(" ", n.num_tel, " ");
        }
      }
      function jO(t, e) {
        if (
          (1 & t && (I(0, "div", 10), Rn(1, BO, 7, 6, "div", 11), M()), 2 & t)
        ) {
          const n = at();
          ee(1), Ne("ngForOf", n.all_clients);
        }
      }
      let UO = (() => {
          class t {
            constructor() {
              (this.all_clients = [
                {
                  id: 1,
                  nom: "Kamel Mustapha",
                  produits: 25,
                  total: 3500,
                  remise: 500,
                  num_tel: "0672447580",
                },
                {
                  id: 2,
                  nom: "Kamel Mustapha",
                  produits: 25,
                  total: 3500,
                  remise: 500,
                  num_tel: "0672447580",
                },
                {
                  id: 3,
                  nom: "Kamel Mustapha",
                  produits: 25,
                  total: 3500,
                  remise: 500,
                  num_tel: "0672447580",
                },
              ]),
                (this.selected_client = {}),
                (this.is_client = !1);
            }
            ngOnInit() {}
            select_client(n) {
              (this.selected_client = {}), (this.selected_client[n] = !0);
            }
            show_client() {
              this.client_search.length >= 1
                ? (this.is_client = !0)
                : ((this.is_client = !1), (this.selected_client = {}));
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵcmp = It({
              type: t,
              selectors: [["app-clients"]],
              decls: 26,
              vars: 2,
              consts: [
                [
                  1,
                  "h-14",
                  "flex",
                  "dark:text-gray-200",
                  "border-b",
                  "border-gray-100",
                  "dark:border-gray-800",
                ],
                [1, "w-3/4"],
                [
                  "name",
                  "serch_client",
                  "type",
                  "text",
                  "placeholder",
                  "Chercher un client...",
                  1,
                  "block",
                  "w-full",
                  "h-full",
                  "bg-transparent",
                  "px-8",
                  "focus:outline-none",
                  "text-responsive-sm",
                  "dark:bg-dark_third",
                  3,
                  "ngModel",
                  "ngModelChange",
                  "input",
                ],
                [
                  "type",
                  "submit",
                  1,
                  "block",
                  "w-1/4",
                  "text-center",
                  "bg-primary",
                  "text-responsive-sm",
                  "font-bold",
                  "text-white",
                  "hover:opacity-75",
                  "transition",
                  "duration-500",
                  "dark:bg-dark_secondary",
                ],
                [
                  1,
                  "px-6",
                  "h-full",
                  "flex",
                  "flex-col",
                  "overflow-auto",
                  "text-gray-600",
                  "dark:text-gray-200",
                  "relative",
                ],
                [1, "py-1"],
                [1, "my-2", "text-responsive-sm", "overflow-x-auto"],
                [1, "font-bold"],
                [
                  "href",
                  "",
                  1,
                  "block",
                  "w-full",
                  "mx-auto",
                  "py-2",
                  "px-4",
                  "bg-primary",
                  "text-white",
                  "font-bold",
                  "text-center",
                  "rounded-lg",
                  "bottom-0",
                  "text-responsive-sm",
                  "hover:opacity-75",
                  "transition",
                  "duration-500",
                  "active:translate-y-1",
                  "dark:bg-dark_secondary",
                ],
                [
                  "class",
                  "absolute bg-white top-0 left-0 w-full h-fit shadow-lg dark:bg-dark_secondary",
                  4,
                  "ngIf",
                ],
                [
                  1,
                  "absolute",
                  "bg-white",
                  "top-0",
                  "left-0",
                  "w-full",
                  "h-fit",
                  "shadow-lg",
                  "dark:bg-dark_secondary",
                ],
                [
                  "class",
                  "w-full flex px-10 py-3 border-t border-gray-300 border-dashed cursor-pointer hover:bg-gray-300 dark:border-gray-700 dark:hover:bg-gray-700",
                  3,
                  "ngClass",
                  "click",
                  4,
                  "ngFor",
                  "ngForOf",
                ],
                [
                  1,
                  "w-full",
                  "flex",
                  "px-10",
                  "py-3",
                  "border-t",
                  "border-gray-300",
                  "border-dashed",
                  "cursor-pointer",
                  "hover:bg-gray-300",
                  "dark:border-gray-700",
                  "dark:hover:bg-gray-700",
                  3,
                  "ngClass",
                  "click",
                ],
                [1, "w-1/12"],
                [1, "w-6/12"],
                [1, "w-5/12"],
              ],
              template: function (n, r) {
                1 & n &&
                  (I(0, "div", 0)(1, "div", 1)(2, "input", 2),
                  Ee("ngModelChange", function (s) {
                    return (r.client_search = s);
                  })("input", function () {
                    return r.show_client();
                  }),
                  M()(),
                  I(3, "button", 3),
                  Y(4, "Confirmer"),
                  M()(),
                  I(5, "div", 4)(6, "div", 5)(7, "div", 6)(8, "span", 7),
                  Y(9, "Nom"),
                  M(),
                  Y(10, " :"),
                  M(),
                  I(11, "div", 6)(12, "span", 7),
                  Y(13, "Produits achet\xe9s"),
                  M(),
                  Y(14, " :"),
                  M(),
                  I(15, "div", 6)(16, "span", 7),
                  Y(17, "Total depens\xe9"),
                  M(),
                  Y(18, " :"),
                  M(),
                  I(19, "div", 6)(20, "span", 7),
                  Y(21, "Remise"),
                  M(),
                  Y(22, " :"),
                  M()(),
                  I(23, "a", 8),
                  Y(24, " Voir les clients "),
                  M(),
                  Rn(25, jO, 2, 1, "div", 9),
                  M()),
                  2 & n &&
                    (ee(2),
                    Ne("ngModel", r.client_search),
                    ee(23),
                    Ne("ngIf", r.is_client));
              },
              directives: [ro, _f, ml, La, Hs, Us],
              styles: [""],
            })),
            t
          );
        })(),
        HO = (() => {
          class t {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵcmp = It({
              type: t,
              selectors: [["app-confirm"]],
              decls: 9,
              vars: 0,
              consts: [
                ["action", "", 1, "p-4", "h-full"],
                [1, "flex", "gap-2"],
                [
                  "type",
                  "number",
                  "placeholder",
                  "Versement",
                  1,
                  "w-full",
                  "px-4",
                  "py-2",
                  "my-2",
                  "border",
                  "border-gray-300",
                  "rounded-md",
                  "text-responsive-sm",
                  "focus:outline-none",
                  "dark:bg-gray-900",
                  "dark:border-gray-600",
                  "dark:text-white",
                ],
                [
                  "type",
                  "number",
                  "placeholder",
                  "Remise",
                  1,
                  "w-full",
                  "px-4",
                  "py-2",
                  "my-2",
                  "border",
                  "border-gray-300",
                  "rounded-md",
                  "text-responsive-sm",
                  "focus:outline-none",
                  "dark:bg-gray-900",
                  "dark:border-gray-600",
                  "dark:text-white",
                ],
                [
                  1,
                  "bg-secondary",
                  "w-full",
                  "text-white",
                  "rounded-md",
                  "py-3",
                  "text-responsive-sm",
                  "font-semibold",
                  "hover:opacity-75",
                  "transition",
                  "duration-500",
                  "active:translate-y-1",
                  "dark:bg-dark_primary",
                ],
                [
                  1,
                  "bg-primary",
                  "w-full",
                  "text-white",
                  "rounded-md",
                  "py-3",
                  "text-responsive-sm",
                  "font-semibold",
                  "hover:opacity-75",
                  "transition",
                  "duration-500",
                  "active:translate-y-1",
                  "dark:bg-dark_secondary",
                ],
              ],
              template: function (n, r) {
                1 & n &&
                  (I(0, "form", 0)(1, "div", 1),
                  Ce(2, "input", 2)(3, "input", 3),
                  M(),
                  I(4, "div", 1)(5, "button", 4),
                  Y(6, " Imprimer (F4) "),
                  M(),
                  I(7, "button", 5),
                  Y(8, " Valider vente (F2) "),
                  M()()());
              },
              directives: [Ff, vf, lo],
              styles: [""],
            })),
            t
          );
        })();
      const $O = [
        {
          path: "",
          component: (() => {
            class t {
              constructor(n) {
                (this.shared = n),
                  (this.total_caisses = [
                    { name: "caisse_1" },
                    { name: "caisse_2" },
                    { name: "caisse_3" },
                    { name: "caisse_4" },
                  ]),
                  (this.total_price = {
                    caisse_1: 10,
                    caisse_2: 20,
                    caisse_3: 30,
                    caisse_4: 40,
                  }),
                  (this.selected_caisse = "caisse_1"),
                  (this.all_products = [
                    {
                      id: 1,
                      nom: "Fromage",
                      prix: 120,
                      code_bar: 2099986688782,
                      stock: 200,
                      quantite: 1,
                    },
                    {
                      id: 2,
                      nom: "Yaourt",
                      prix: 120,
                      code_bar: 6133522011064,
                      stock: 200,
                      quantite: 1,
                    },
                    {
                      id: 3,
                      nom: "Jus",
                      prix: 120,
                      code_bar: 2099941688782,
                      stock: 200,
                      quantite: 1,
                    },
                  ]);
              }
              ngOnInit() {
                this.shared.caisse_subject.subscribe((n) => {
                  this.selected_caisse = n;
                });
              }
            }
            return (
              (t.ɵfac = function (n) {
                return new (n || t)(D(pf));
              }),
              (t.ɵcmp = It({
                type: t,
                selectors: [["app-acceuil"]],
                decls: 15,
                vars: 5,
                consts: [
                  [
                    1,
                    "content",
                    "m-4",
                    "h-1/4",
                    "flex",
                    "justify-between",
                    "gap-4",
                  ],
                  [
                    1,
                    "w-3/4",
                    "bg-white",
                    "rounded-lg",
                    "shadow-lg",
                    "dark:bg-gray-900",
                  ],
                  [3, "total_price", "selected_caisse"],
                  [1, "w-1/4", "bg-white", "rounded-lg", "dark:bg-gray-900"],
                  [
                    1,
                    "content",
                    "m-4",
                    "h-4/6",
                    "flex",
                    "justify-between",
                    "gap-4",
                  ],
                  [
                    1,
                    "w-3/4",
                    "h-full",
                    "bg-white",
                    "rounded-lg",
                    "shadow-lg",
                    "overflow-hidden",
                    "dark:bg-gray-900",
                  ],
                  [3, "all_products"],
                  [1, "w-1/4", "flex", "flex-col", "gap-4", "overflow-hidden"],
                  [1, "h-1/2", "rounded-lg"],
                  [3, "selected_caisse", "total_caisses"],
                  [1, "h-full", "bg-white", "rounded-lg", "dark:bg-gray-900"],
                  [1, "h-1/2", "bg-white", "rounded-lg", "dark:bg-gray-900"],
                ],
                template: function (n, r) {
                  1 & n &&
                    (I(0, "div", 0)(1, "div", 1),
                    Ce(2, "app-price", 2),
                    M(),
                    I(3, "div", 3),
                    Ce(4, "app-date"),
                    M()(),
                    I(5, "div", 4)(6, "div", 5),
                    Ce(7, "app-products", 6),
                    M(),
                    I(8, "div", 7)(9, "div", 8),
                    Ce(10, "app-caisses", 9),
                    M(),
                    I(11, "div", 10),
                    Ce(12, "app-clients"),
                    M(),
                    I(13, "div", 11),
                    Ce(14, "app-confirm"),
                    M()()()),
                    2 & n &&
                      (ee(2),
                      Ne("total_price", r.total_price)(
                        "selected_caisse",
                        r.selected_caisse
                      ),
                      ee(5),
                      Ne("all_products", r.all_products),
                      ee(3),
                      Ne("selected_caisse", r.selected_caisse)(
                        "total_caisses",
                        r.total_caisses
                      ));
                },
                directives: [NR, xR, RO, VO, UO, HO],
                styles: [""],
              })),
              t
            );
          })(),
        },
        {
          path: "settings",
          component: (() => {
            class t {
              constructor() {}
              ngOnInit() {}
            }
            return (
              (t.ɵfac = function (n) {
                return new (n || t)();
              }),
              (t.ɵcmp = It({
                type: t,
                selectors: [["app-reglages"]],
                decls: 2,
                vars: 0,
                consts: [
                  [1, "relative", "w-full", "h-full"],
                  [
                    1,
                    "bg-white",
                    "w-1/2",
                    "h-3/4",
                    "rounded-lg",
                    "absolute",
                    "right-0",
                    "left-0",
                    "top-1/2",
                    "-translate-y-1/2",
                    "m-auto",
                    "shadow-lg",
                    "dark:bg-gray-900",
                  ],
                ],
                template: function (n, r) {
                  1 & n && (I(0, "div", 0), Ce(1, "div", 1), M());
                },
                styles: [""],
              })),
              t
            );
          })(),
        },
      ];
      let GO = (() => {
        class t {}
        return (
          (t.ɵfac = function (n) {
            return new (n || t)();
          }),
          (t.ɵmod = Gt({ type: t })),
          (t.ɵinj = Tt({ imports: [[XD.forRoot($O)], XD] })),
          t
        );
      })();
      class aE {}
      const Hn = "*";
      function zO(t, e) {
        return { type: 7, name: t, definitions: e, options: {} };
      }
      function lE(t, e = null) {
        return { type: 4, styles: e, timings: t };
      }
      function uE(t, e = null) {
        return { type: 2, steps: t, options: e };
      }
      function yl(t) {
        return { type: 6, styles: t, offset: null };
      }
      function cE(t, e, n = null) {
        return { type: 1, expr: t, animation: e, options: n };
      }
      function dE(t) {
        Promise.resolve(null).then(t);
      }
      class uo {
        constructor(e = 0, n = 0) {
          (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._started = !1),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._position = 0),
            (this.parentPlayer = null),
            (this.totalTime = e + n);
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((e) => e()),
            (this._onDoneFns = []));
        }
        onStart(e) {
          this._onStartFns.push(e);
        }
        onDone(e) {
          this._onDoneFns.push(e);
        }
        onDestroy(e) {
          this._onDestroyFns.push(e);
        }
        hasStarted() {
          return this._started;
        }
        init() {}
        play() {
          this.hasStarted() || (this._onStart(), this.triggerMicrotask()),
            (this._started = !0);
        }
        triggerMicrotask() {
          dE(() => this._onFinish());
        }
        _onStart() {
          this._onStartFns.forEach((e) => e()), (this._onStartFns = []);
        }
        pause() {}
        restart() {}
        finish() {
          this._onFinish();
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this.hasStarted() || this._onStart(),
            this.finish(),
            this._onDestroyFns.forEach((e) => e()),
            (this._onDestroyFns = []));
        }
        reset() {
          this._started = !1;
        }
        setPosition(e) {
          this._position = this.totalTime ? e * this.totalTime : 1;
        }
        getPosition() {
          return this.totalTime ? this._position / this.totalTime : 1;
        }
        triggerCallback(e) {
          const n = "start" == e ? this._onStartFns : this._onDoneFns;
          n.forEach((r) => r()), (n.length = 0);
        }
      }
      class fE {
        constructor(e) {
          (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this._onDestroyFns = []),
            (this.parentPlayer = null),
            (this.totalTime = 0),
            (this.players = e);
          let n = 0,
            r = 0,
            i = 0;
          const s = this.players.length;
          0 == s
            ? dE(() => this._onFinish())
            : this.players.forEach((o) => {
                o.onDone(() => {
                  ++n == s && this._onFinish();
                }),
                  o.onDestroy(() => {
                    ++r == s && this._onDestroy();
                  }),
                  o.onStart(() => {
                    ++i == s && this._onStart();
                  });
              }),
            (this.totalTime = this.players.reduce(
              (o, a) => Math.max(o, a.totalTime),
              0
            ));
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((e) => e()),
            (this._onDoneFns = []));
        }
        init() {
          this.players.forEach((e) => e.init());
        }
        onStart(e) {
          this._onStartFns.push(e);
        }
        _onStart() {
          this.hasStarted() ||
            ((this._started = !0),
            this._onStartFns.forEach((e) => e()),
            (this._onStartFns = []));
        }
        onDone(e) {
          this._onDoneFns.push(e);
        }
        onDestroy(e) {
          this._onDestroyFns.push(e);
        }
        hasStarted() {
          return this._started;
        }
        play() {
          this.parentPlayer || this.init(),
            this._onStart(),
            this.players.forEach((e) => e.play());
        }
        pause() {
          this.players.forEach((e) => e.pause());
        }
        restart() {
          this.players.forEach((e) => e.restart());
        }
        finish() {
          this._onFinish(), this.players.forEach((e) => e.finish());
        }
        destroy() {
          this._onDestroy();
        }
        _onDestroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this._onFinish(),
            this.players.forEach((e) => e.destroy()),
            this._onDestroyFns.forEach((e) => e()),
            (this._onDestroyFns = []));
        }
        reset() {
          this.players.forEach((e) => e.reset()),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._started = !1);
        }
        setPosition(e) {
          const n = e * this.totalTime;
          this.players.forEach((r) => {
            const i = r.totalTime ? Math.min(1, n / r.totalTime) : 1;
            r.setPosition(i);
          });
        }
        getPosition() {
          const e = this.players.reduce(
            (n, r) => (null === n || r.totalTime > n.totalTime ? r : n),
            null
          );
          return null != e ? e.getPosition() : 0;
        }
        beforeDestroy() {
          this.players.forEach((e) => {
            e.beforeDestroy && e.beforeDestroy();
          });
        }
        triggerCallback(e) {
          const n = "start" == e ? this._onStartFns : this._onDoneFns;
          n.forEach((r) => r()), (n.length = 0);
        }
      }
      function WO(t, e) {
        if ((1 & t && (I(0, "span", 9), Y(1), M()), 2 & t)) {
          const n = at().$implicit;
          ee(1), Er(n.name);
        }
      }
      function QO(t, e) {
        if (1 & t) {
          const n = Cr();
          I(0, "a", 7),
            Ee("mouseover", function () {
              const s = In(n).$implicit;
              return at().show_aria(s.name);
            })("mouseout", function () {
              const s = In(n).$implicit;
              return at().hide_aria(s.name);
            }),
            Ce(1, "i"),
            Rn(2, WO, 2, 1, "span", 8),
            M();
        }
        if (2 & t) {
          const n = e.$implicit,
            r = at();
          la("routerLink", n.link),
            ee(1),
            Cy(
              "fa-solid fa-",
              n.icon,
              " fa-xl text-primary block mx-auto cursor-pointer hover:text-cyan-700 active:translate-y-1 transition duration-500 dark:text-gray-300"
            ),
            ee(1),
            Ne("ngIf", r.aria[n.name]);
        }
      }
      const KO = function (t) {
        return { dark: t };
      };
      let ZO = (() => {
        class t {
          constructor() {
            (this.aria = {}),
              (this.dark_mode = !1),
              (this.navbar_elements = [
                { name: "Acceuil", icon: "house-chimney", link: "" },
                { name: "R\xe9glages", icon: "gear", link: "settings" },
                { name: "Administration", icon: "screwdriver-wrench" },
              ]);
          }
          show_aria(n) {
            this.aria[n] = !0;
          }
          hide_aria(n) {
            this.aria[n] = !1;
          }
          enable_dark_mode() {
            this.dark_mode = !this.dark_mode;
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)();
          }),
          (t.ɵcmp = It({
            type: t,
            selectors: [["app-root"]],
            decls: 8,
            vars: 4,
            consts: [
              [3, "ngClass"],
              [
                1,
                "content",
                "w-screen",
                "h-screen",
                "flex",
                "flex-row",
                "bg-cover",
                "dark:bg-main-dark",
              ],
              [
                1,
                "w-14",
                "h-full",
                "bg-white",
                "shadow-2xl",
                "relative",
                "dark:bg-dark_primary",
              ],
              [
                "class",
                "relative block cursor-pointer my-6 py-2 hover:bg-gray-200 transition duration-500 dark:hover:bg-gray-800",
                3,
                "routerLink",
                "mouseover",
                "mouseout",
                4,
                "ngFor",
                "ngForOf",
              ],
              [
                1,
                "absolute",
                "bottom-0",
                "left-0",
                "right-0",
                "block",
                "cursor-pointer",
                "my-6",
                "py-2",
                "hover:bg-gray-200",
                "transition",
                "duration-500",
                "dark:hover:bg-gray-800",
                3,
                "click",
              ],
              [
                1,
                "fa-solid",
                "fa-moon",
                "fa-xl",
                "text-primary",
                "block",
                "mx-auto",
                "cursor-pointer",
                "hover:text-cyan-700",
                "active:translate-y-1",
                "transition",
                "duration-500",
                "dark:text-gray-300",
              ],
              [1, "w-full", "h-full", "overflow-y-auto"],
              [
                1,
                "relative",
                "block",
                "cursor-pointer",
                "my-6",
                "py-2",
                "hover:bg-gray-200",
                "transition",
                "duration-500",
                "dark:hover:bg-gray-800",
                3,
                "routerLink",
                "mouseover",
                "mouseout",
              ],
              [
                "class",
                "absolute top-0 left-16 bg-white rounded-lg px-2 py-1 font-bold shadow-xl z-50 dark:bg-black dark:text-white",
                4,
                "ngIf",
              ],
              [
                1,
                "absolute",
                "top-0",
                "left-16",
                "bg-white",
                "rounded-lg",
                "px-2",
                "py-1",
                "font-bold",
                "shadow-xl",
                "z-50",
                "dark:bg-black",
                "dark:text-white",
              ],
            ],
            template: function (n, r) {
              1 & n &&
                (I(0, "div", 0)(1, "div", 1)(2, "div", 2),
                Rn(3, QO, 3, 5, "a", 3),
                I(4, "span", 4),
                Ee("click", function () {
                  return r.enable_dark_mode();
                }),
                Ce(5, "i", 5),
                M()(),
                I(6, "div", 6),
                Ce(7, "router-outlet"),
                M()()()),
                2 & n &&
                  (Ne("ngClass", br(2, KO, r.dark_mode)),
                  ee(3),
                  Ne("ngForOf", r.navbar_elements));
            },
            directives: [Us, Hs, ol, La, of],
            styles: [""],
            data: {
              animation: [
                zO("fade", [
                  cE("void => *", [yl({ opacity: 0 }), lE(200)]),
                  cE("* => void", [lE(200, yl({ opacity: 0 }))]),
                ]),
              ],
            },
          })),
          t
        );
      })();
      const Z = !1;
      function hE(t) {
        return new b(3e3, Z);
      }
      function xk() {
        return "undefined" != typeof window && void 0 !== window.document;
      }
      function jf() {
        return (
          "undefined" != typeof process &&
          "[object process]" === {}.toString.call(process)
        );
      }
      function or(t) {
        switch (t.length) {
          case 0:
            return new uo();
          case 1:
            return t[0];
          default:
            return new fE(t);
        }
      }
      function pE(t, e, n, r, i = {}, s = {}) {
        const o = [],
          a = [];
        let l = -1,
          u = null;
        if (
          (r.forEach((c) => {
            const d = c.offset,
              f = d == l,
              h = (f && u) || {};
            Object.keys(c).forEach((p) => {
              let g = p,
                y = c[p];
              if ("offset" !== p)
                switch (((g = e.normalizePropertyName(g, o)), y)) {
                  case "!":
                    y = i[p];
                    break;
                  case Hn:
                    y = s[p];
                    break;
                  default:
                    y = e.normalizeStyleValue(p, g, y, o);
                }
              h[g] = y;
            }),
              f || a.push(h),
              (u = h),
              (l = d);
          }),
          o.length)
        )
          throw (function Dk(t) {
            return new b(3502, Z);
          })();
        return a;
      }
      function Uf(t, e, n, r) {
        switch (e) {
          case "start":
            t.onStart(() => r(n && Hf(n, "start", t)));
            break;
          case "done":
            t.onDone(() => r(n && Hf(n, "done", t)));
            break;
          case "destroy":
            t.onDestroy(() => r(n && Hf(n, "destroy", t)));
        }
      }
      function Hf(t, e, n) {
        const r = n.totalTime,
          s = $f(
            t.element,
            t.triggerName,
            t.fromState,
            t.toState,
            e || t.phaseName,
            null == r ? t.totalTime : r,
            !!n.disabled
          ),
          o = t._data;
        return null != o && (s._data = o), s;
      }
      function $f(t, e, n, r, i = "", s = 0, o) {
        return {
          element: t,
          triggerName: e,
          fromState: n,
          toState: r,
          phaseName: i,
          totalTime: s,
          disabled: !!o,
        };
      }
      function Ct(t, e, n) {
        let r;
        return (
          t instanceof Map
            ? ((r = t.get(e)), r || t.set(e, (r = n)))
            : ((r = t[e]), r || (r = t[e] = n)),
          r
        );
      }
      function gE(t) {
        const e = t.indexOf(":");
        return [t.substring(1, e), t.substr(e + 1)];
      }
      let Gf = (t, e) => !1,
        mE = (t, e, n) => [],
        yE = null;
      function qf(t) {
        const e = t.parentNode || t.host;
        return e === yE ? null : e;
      }
      (jf() || "undefined" != typeof Element) &&
        (xk()
          ? ((yE = (() => document.documentElement)()),
            (Gf = (t, e) => {
              for (; e; ) {
                if (e === t) return !0;
                e = qf(e);
              }
              return !1;
            }))
          : (Gf = (t, e) => t.contains(e)),
        (mE = (t, e, n) => {
          if (n) return Array.from(t.querySelectorAll(e));
          const r = t.querySelector(e);
          return r ? [r] : [];
        }));
      let Rr = null,
        _E = !1;
      function vE(t) {
        Rr ||
          ((Rr =
            (function Pk() {
              return "undefined" != typeof document ? document.body : null;
            })() || {}),
          (_E = !!Rr.style && "WebkitAppearance" in Rr.style));
        let e = !0;
        return (
          Rr.style &&
            !(function Fk(t) {
              return "ebkit" == t.substring(1, 6);
            })(t) &&
            ((e = t in Rr.style),
            !e &&
              _E &&
              (e =
                "Webkit" + t.charAt(0).toUpperCase() + t.substr(1) in
                Rr.style)),
          e
        );
      }
      const DE = Gf,
        CE = mE;
      let EE = (() => {
          class t {
            validateStyleProperty(n) {
              return vE(n);
            }
            matchesElement(n, r) {
              return !1;
            }
            containsElement(n, r) {
              return DE(n, r);
            }
            getParentElement(n) {
              return qf(n);
            }
            query(n, r, i) {
              return CE(n, r, i);
            }
            computeStyle(n, r, i) {
              return i || "";
            }
            animate(n, r, i, s, o, a = [], l) {
              return new uo(i, s);
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵprov = G({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        zf = (() => {
          class t {}
          return (t.NOOP = new EE()), t;
        })();
      const Wf = "ng-enter",
        vl = "ng-leave",
        Dl = "ng-trigger",
        Cl = ".ng-trigger",
        bE = "ng-animating",
        Qf = ".ng-animating";
      function Or(t) {
        if ("number" == typeof t) return t;
        const e = t.match(/^(-?[\.\d]+)(m?s)/);
        return !e || e.length < 2 ? 0 : Kf(parseFloat(e[1]), e[2]);
      }
      function Kf(t, e) {
        return "s" === e ? 1e3 * t : t;
      }
      function El(t, e, n) {
        return t.hasOwnProperty("duration")
          ? t
          : (function kk(t, e, n) {
              let i,
                s = 0,
                o = "";
              if ("string" == typeof t) {
                const a = t.match(
                  /^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i
                );
                if (null === a)
                  return e.push(hE()), { duration: 0, delay: 0, easing: "" };
                i = Kf(parseFloat(a[1]), a[2]);
                const l = a[3];
                null != l && (s = Kf(parseFloat(l), a[4]));
                const u = a[5];
                u && (o = u);
              } else i = t;
              if (!n) {
                let a = !1,
                  l = e.length;
                i < 0 &&
                  (e.push(
                    (function YO() {
                      return new b(3100, Z);
                    })()
                  ),
                  (a = !0)),
                  s < 0 &&
                    (e.push(
                      (function JO() {
                        return new b(3101, Z);
                      })()
                    ),
                    (a = !0)),
                  a && e.splice(l, 0, hE());
              }
              return { duration: i, delay: s, easing: o };
            })(t, e, n);
      }
      function Bi(t, e = {}) {
        return (
          Object.keys(t).forEach((n) => {
            e[n] = t[n];
          }),
          e
        );
      }
      function ar(t, e, n = {}) {
        if (e) for (let r in t) n[r] = t[r];
        else Bi(t, n);
        return n;
      }
      function AE(t, e, n) {
        return n ? e + ":" + n + ";" : "";
      }
      function ME(t) {
        let e = "";
        for (let n = 0; n < t.style.length; n++) {
          const r = t.style.item(n);
          e += AE(0, r, t.style.getPropertyValue(r));
        }
        for (const n in t.style)
          t.style.hasOwnProperty(n) &&
            !n.startsWith("_") &&
            (e += AE(0, Bk(n), t.style[n]));
        t.setAttribute("style", e);
      }
      function wn(t, e, n) {
        t.style &&
          (Object.keys(e).forEach((r) => {
            const i = Yf(r);
            n && !n.hasOwnProperty(r) && (n[r] = t.style[i]),
              (t.style[i] = e[r]);
          }),
          jf() && ME(t));
      }
      function kr(t, e) {
        t.style &&
          (Object.keys(e).forEach((n) => {
            const r = Yf(n);
            t.style[r] = "";
          }),
          jf() && ME(t));
      }
      function co(t) {
        return Array.isArray(t) ? (1 == t.length ? t[0] : uE(t)) : t;
      }
      const Zf = new RegExp("{{\\s*(.+?)\\s*}}", "g");
      function TE(t) {
        let e = [];
        if ("string" == typeof t) {
          let n;
          for (; (n = Zf.exec(t)); ) e.push(n[1]);
          Zf.lastIndex = 0;
        }
        return e;
      }
      function wl(t, e, n) {
        const r = t.toString(),
          i = r.replace(Zf, (s, o) => {
            let a = e[o];
            return (
              e.hasOwnProperty(o) ||
                (n.push(
                  (function ek(t) {
                    return new b(3003, Z);
                  })()
                ),
                (a = "")),
              a.toString()
            );
          });
        return i == r ? t : i;
      }
      function bl(t) {
        const e = [];
        let n = t.next();
        for (; !n.done; ) e.push(n.value), (n = t.next());
        return e;
      }
      const Lk = /-+([a-z0-9])/g;
      function Yf(t) {
        return t.replace(Lk, (...e) => e[1].toUpperCase());
      }
      function Bk(t) {
        return t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
      }
      function Et(t, e, n) {
        switch (e.type) {
          case 7:
            return t.visitTrigger(e, n);
          case 0:
            return t.visitState(e, n);
          case 1:
            return t.visitTransition(e, n);
          case 2:
            return t.visitSequence(e, n);
          case 3:
            return t.visitGroup(e, n);
          case 4:
            return t.visitAnimate(e, n);
          case 5:
            return t.visitKeyframes(e, n);
          case 6:
            return t.visitStyle(e, n);
          case 8:
            return t.visitReference(e, n);
          case 9:
            return t.visitAnimateChild(e, n);
          case 10:
            return t.visitAnimateRef(e, n);
          case 11:
            return t.visitQuery(e, n);
          case 12:
            return t.visitStagger(e, n);
          default:
            throw (function tk(t) {
              return new b(3004, Z);
            })();
        }
      }
      function IE(t, e) {
        return window.getComputedStyle(t)[e];
      }
      function Hk(t, e) {
        const n = [];
        return (
          "string" == typeof t
            ? t.split(/\s*,\s*/).forEach((r) =>
                (function $k(t, e, n) {
                  if (":" == t[0]) {
                    const l = (function Gk(t, e) {
                      switch (t) {
                        case ":enter":
                          return "void => *";
                        case ":leave":
                          return "* => void";
                        case ":increment":
                          return (n, r) => parseFloat(r) > parseFloat(n);
                        case ":decrement":
                          return (n, r) => parseFloat(r) < parseFloat(n);
                        default:
                          return (
                            e.push(
                              (function mk(t) {
                                return new b(3016, Z);
                              })()
                            ),
                            "* => *"
                          );
                      }
                    })(t, n);
                    if ("function" == typeof l) return void e.push(l);
                    t = l;
                  }
                  const r = t.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
                  if (null == r || r.length < 4)
                    return (
                      n.push(
                        (function gk(t) {
                          return new b(3015, Z);
                        })()
                      ),
                      e
                    );
                  const i = r[1],
                    s = r[2],
                    o = r[3];
                  e.push(NE(i, o));
                  "<" == s[0] && !("*" == i && "*" == o) && e.push(NE(o, i));
                })(r, n, e)
              )
            : n.push(t),
          n
        );
      }
      const Al = new Set(["true", "1"]),
        Ml = new Set(["false", "0"]);
      function NE(t, e) {
        const n = Al.has(t) || Ml.has(t),
          r = Al.has(e) || Ml.has(e);
        return (i, s) => {
          let o = "*" == t || t == i,
            a = "*" == e || e == s;
          return (
            !o && n && "boolean" == typeof i && (o = i ? Al.has(t) : Ml.has(t)),
            !a && r && "boolean" == typeof s && (a = s ? Al.has(e) : Ml.has(e)),
            o && a
          );
        };
      }
      const qk = new RegExp("s*:selfs*,?", "g");
      function Jf(t, e, n) {
        return new zk(t).build(e, n);
      }
      class zk {
        constructor(e) {
          this._driver = e;
        }
        build(e, n) {
          const r = new Kk(n);
          return this._resetContextStyleTimingState(r), Et(this, co(e), r);
        }
        _resetContextStyleTimingState(e) {
          (e.currentQuerySelector = ""),
            (e.collectedStyles = {}),
            (e.collectedStyles[""] = {}),
            (e.currentTime = 0);
        }
        visitTrigger(e, n) {
          let r = (n.queryCount = 0),
            i = (n.depCount = 0);
          const s = [],
            o = [];
          return (
            "@" == e.name.charAt(0) &&
              n.errors.push(
                (function rk() {
                  return new b(3006, Z);
                })()
              ),
            e.definitions.forEach((a) => {
              if ((this._resetContextStyleTimingState(n), 0 == a.type)) {
                const l = a,
                  u = l.name;
                u
                  .toString()
                  .split(/\s*,\s*/)
                  .forEach((c) => {
                    (l.name = c), s.push(this.visitState(l, n));
                  }),
                  (l.name = u);
              } else if (1 == a.type) {
                const l = this.visitTransition(a, n);
                (r += l.queryCount), (i += l.depCount), o.push(l);
              } else
                n.errors.push(
                  (function ik() {
                    return new b(3007, Z);
                  })()
                );
            }),
            {
              type: 7,
              name: e.name,
              states: s,
              transitions: o,
              queryCount: r,
              depCount: i,
              options: null,
            }
          );
        }
        visitState(e, n) {
          const r = this.visitStyle(e.styles, n),
            i = (e.options && e.options.params) || null;
          if (r.containsDynamicStyles) {
            const s = new Set(),
              o = i || {};
            r.styles.forEach((a) => {
              if (Tl(a)) {
                const l = a;
                Object.keys(l).forEach((u) => {
                  TE(l[u]).forEach((c) => {
                    o.hasOwnProperty(c) || s.add(c);
                  });
                });
              }
            }),
              s.size &&
                (bl(s.values()),
                n.errors.push(
                  (function sk(t, e) {
                    return new b(3008, Z);
                  })()
                ));
          }
          return {
            type: 0,
            name: e.name,
            style: r,
            options: i ? { params: i } : null,
          };
        }
        visitTransition(e, n) {
          (n.queryCount = 0), (n.depCount = 0);
          const r = Et(this, co(e.animation), n);
          return {
            type: 1,
            matchers: Hk(e.expr, n.errors),
            animation: r,
            queryCount: n.queryCount,
            depCount: n.depCount,
            options: Vr(e.options),
          };
        }
        visitSequence(e, n) {
          return {
            type: 2,
            steps: e.steps.map((r) => Et(this, r, n)),
            options: Vr(e.options),
          };
        }
        visitGroup(e, n) {
          const r = n.currentTime;
          let i = 0;
          const s = e.steps.map((o) => {
            n.currentTime = r;
            const a = Et(this, o, n);
            return (i = Math.max(i, n.currentTime)), a;
          });
          return (
            (n.currentTime = i), { type: 3, steps: s, options: Vr(e.options) }
          );
        }
        visitAnimate(e, n) {
          const r = (function Yk(t, e) {
            let n = null;
            if (t.hasOwnProperty("duration")) n = t;
            else if ("number" == typeof t) return Xf(El(t, e).duration, 0, "");
            const r = t;
            if (
              r
                .split(/\s+/)
                .some((s) => "{" == s.charAt(0) && "{" == s.charAt(1))
            ) {
              const s = Xf(0, 0, "");
              return (s.dynamic = !0), (s.strValue = r), s;
            }
            return (n = n || El(r, e)), Xf(n.duration, n.delay, n.easing);
          })(e.timings, n.errors);
          n.currentAnimateTimings = r;
          let i,
            s = e.styles ? e.styles : yl({});
          if (5 == s.type) i = this.visitKeyframes(s, n);
          else {
            let o = e.styles,
              a = !1;
            if (!o) {
              a = !0;
              const u = {};
              r.easing && (u.easing = r.easing), (o = yl(u));
            }
            n.currentTime += r.duration + r.delay;
            const l = this.visitStyle(o, n);
            (l.isEmptyStep = a), (i = l);
          }
          return (
            (n.currentAnimateTimings = null),
            { type: 4, timings: r, style: i, options: null }
          );
        }
        visitStyle(e, n) {
          const r = this._makeStyleAst(e, n);
          return this._validateStyleAst(r, n), r;
        }
        _makeStyleAst(e, n) {
          const r = [];
          Array.isArray(e.styles)
            ? e.styles.forEach((o) => {
                "string" == typeof o
                  ? o == Hn
                    ? r.push(o)
                    : n.errors.push(
                        (function ok(t) {
                          return new b(3002, Z);
                        })()
                      )
                  : r.push(o);
              })
            : r.push(e.styles);
          let i = !1,
            s = null;
          return (
            r.forEach((o) => {
              if (Tl(o)) {
                const a = o,
                  l = a.easing;
                if ((l && ((s = l), delete a.easing), !i))
                  for (let u in a)
                    if (a[u].toString().indexOf("{{") >= 0) {
                      i = !0;
                      break;
                    }
              }
            }),
            {
              type: 6,
              styles: r,
              easing: s,
              offset: e.offset,
              containsDynamicStyles: i,
              options: null,
            }
          );
        }
        _validateStyleAst(e, n) {
          const r = n.currentAnimateTimings;
          let i = n.currentTime,
            s = n.currentTime;
          r && s > 0 && (s -= r.duration + r.delay),
            e.styles.forEach((o) => {
              "string" != typeof o &&
                Object.keys(o).forEach((a) => {
                  if (!this._driver.validateStyleProperty(a))
                    return void n.errors.push(
                      (function ak(t) {
                        return new b(3009, Z);
                      })()
                    );
                  const l = n.collectedStyles[n.currentQuerySelector],
                    u = l[a];
                  let c = !0;
                  u &&
                    (s != i &&
                      s >= u.startTime &&
                      i <= u.endTime &&
                      (n.errors.push(
                        (function lk(t, e, n, r, i) {
                          return new b(3010, Z);
                        })()
                      ),
                      (c = !1)),
                    (s = u.startTime)),
                    c && (l[a] = { startTime: s, endTime: i }),
                    n.options &&
                      (function Vk(t, e, n) {
                        const r = e.params || {},
                          i = TE(t);
                        i.length &&
                          i.forEach((s) => {
                            r.hasOwnProperty(s) ||
                              n.push(
                                (function XO(t) {
                                  return new b(3001, Z);
                                })()
                              );
                          });
                      })(o[a], n.options, n.errors);
                });
            });
        }
        visitKeyframes(e, n) {
          const r = { type: 5, styles: [], options: null };
          if (!n.currentAnimateTimings)
            return (
              n.errors.push(
                (function uk() {
                  return new b(3011, Z);
                })()
              ),
              r
            );
          let s = 0;
          const o = [];
          let a = !1,
            l = !1,
            u = 0;
          const c = e.steps.map((_) => {
            const m = this._makeStyleAst(_, n);
            let C =
                null != m.offset
                  ? m.offset
                  : (function Zk(t) {
                      if ("string" == typeof t) return null;
                      let e = null;
                      if (Array.isArray(t))
                        t.forEach((n) => {
                          if (Tl(n) && n.hasOwnProperty("offset")) {
                            const r = n;
                            (e = parseFloat(r.offset)), delete r.offset;
                          }
                        });
                      else if (Tl(t) && t.hasOwnProperty("offset")) {
                        const n = t;
                        (e = parseFloat(n.offset)), delete n.offset;
                      }
                      return e;
                    })(m.styles),
              S = 0;
            return (
              null != C && (s++, (S = m.offset = C)),
              (l = l || S < 0 || S > 1),
              (a = a || S < u),
              (u = S),
              o.push(S),
              m
            );
          });
          l &&
            n.errors.push(
              (function ck() {
                return new b(3012, Z);
              })()
            ),
            a &&
              n.errors.push(
                (function dk() {
                  return new b(3200, Z);
                })()
              );
          const d = e.steps.length;
          let f = 0;
          s > 0 && s < d
            ? n.errors.push(
                (function fk() {
                  return new b(3202, Z);
                })()
              )
            : 0 == s && (f = 1 / (d - 1));
          const h = d - 1,
            p = n.currentTime,
            g = n.currentAnimateTimings,
            y = g.duration;
          return (
            c.forEach((_, m) => {
              const C = f > 0 ? (m == h ? 1 : f * m) : o[m],
                S = C * y;
              (n.currentTime = p + g.delay + S),
                (g.duration = S),
                this._validateStyleAst(_, n),
                (_.offset = C),
                r.styles.push(_);
            }),
            r
          );
        }
        visitReference(e, n) {
          return {
            type: 8,
            animation: Et(this, co(e.animation), n),
            options: Vr(e.options),
          };
        }
        visitAnimateChild(e, n) {
          return n.depCount++, { type: 9, options: Vr(e.options) };
        }
        visitAnimateRef(e, n) {
          return {
            type: 10,
            animation: this.visitReference(e.animation, n),
            options: Vr(e.options),
          };
        }
        visitQuery(e, n) {
          const r = n.currentQuerySelector,
            i = e.options || {};
          n.queryCount++, (n.currentQuery = e);
          const [s, o] = (function Wk(t) {
            const e = !!t.split(/\s*,\s*/).find((n) => ":self" == n);
            return (
              e && (t = t.replace(qk, "")),
              (t = t
                .replace(/@\*/g, Cl)
                .replace(/@\w+/g, (n) => Cl + "-" + n.substr(1))
                .replace(/:animating/g, Qf)),
              [t, e]
            );
          })(e.selector);
          (n.currentQuerySelector = r.length ? r + " " + s : s),
            Ct(n.collectedStyles, n.currentQuerySelector, {});
          const a = Et(this, co(e.animation), n);
          return (
            (n.currentQuery = null),
            (n.currentQuerySelector = r),
            {
              type: 11,
              selector: s,
              limit: i.limit || 0,
              optional: !!i.optional,
              includeSelf: o,
              animation: a,
              originalSelector: e.selector,
              options: Vr(e.options),
            }
          );
        }
        visitStagger(e, n) {
          n.currentQuery ||
            n.errors.push(
              (function hk() {
                return new b(3013, Z);
              })()
            );
          const r =
            "full" === e.timings
              ? { duration: 0, delay: 0, easing: "full" }
              : El(e.timings, n.errors, !0);
          return {
            type: 12,
            animation: Et(this, co(e.animation), n),
            timings: r,
            options: null,
          };
        }
      }
      class Kk {
        constructor(e) {
          (this.errors = e),
            (this.queryCount = 0),
            (this.depCount = 0),
            (this.currentTransition = null),
            (this.currentQuery = null),
            (this.currentQuerySelector = null),
            (this.currentAnimateTimings = null),
            (this.currentTime = 0),
            (this.collectedStyles = {}),
            (this.options = null);
        }
      }
      function Tl(t) {
        return !Array.isArray(t) && "object" == typeof t;
      }
      function Vr(t) {
        return (
          t
            ? (t = Bi(t)).params &&
              (t.params = (function Qk(t) {
                return t ? Bi(t) : null;
              })(t.params))
            : (t = {}),
          t
        );
      }
      function Xf(t, e, n) {
        return { duration: t, delay: e, easing: n };
      }
      function eh(t, e, n, r, i, s, o = null, a = !1) {
        return {
          type: 1,
          element: t,
          keyframes: e,
          preStyleProps: n,
          postStyleProps: r,
          duration: i,
          delay: s,
          totalTime: i + s,
          easing: o,
          subTimeline: a,
        };
      }
      class Il {
        constructor() {
          this._map = new Map();
        }
        get(e) {
          return this._map.get(e) || [];
        }
        append(e, n) {
          let r = this._map.get(e);
          r || this._map.set(e, (r = [])), r.push(...n);
        }
        has(e) {
          return this._map.has(e);
        }
        clear() {
          this._map.clear();
        }
      }
      const eV = new RegExp(":enter", "g"),
        nV = new RegExp(":leave", "g");
      function th(t, e, n, r, i, s = {}, o = {}, a, l, u = []) {
        return new rV().buildKeyframes(t, e, n, r, i, s, o, a, l, u);
      }
      class rV {
        buildKeyframes(e, n, r, i, s, o, a, l, u, c = []) {
          u = u || new Il();
          const d = new nh(e, n, u, i, s, c, []);
          (d.options = l),
            d.currentTimeline.setStyles([o], null, d.errors, l),
            Et(this, r, d);
          const f = d.timelines.filter((h) => h.containsAnimation());
          if (Object.keys(a).length) {
            let h;
            for (let p = f.length - 1; p >= 0; p--) {
              const g = f[p];
              if (g.element === n) {
                h = g;
                break;
              }
            }
            h &&
              !h.allowOnlyTimelineStyles() &&
              h.setStyles([a], null, d.errors, l);
          }
          return f.length
            ? f.map((h) => h.buildKeyframes())
            : [eh(n, [], [], [], 0, 0, "", !1)];
        }
        visitTrigger(e, n) {}
        visitState(e, n) {}
        visitTransition(e, n) {}
        visitAnimateChild(e, n) {
          const r = n.subInstructions.get(n.element);
          if (r) {
            const i = n.createSubContext(e.options),
              s = n.currentTimeline.currentTime,
              o = this._visitSubInstructions(r, i, i.options);
            s != o && n.transformIntoNewTimeline(o);
          }
          n.previousNode = e;
        }
        visitAnimateRef(e, n) {
          const r = n.createSubContext(e.options);
          r.transformIntoNewTimeline(),
            this.visitReference(e.animation, r),
            n.transformIntoNewTimeline(r.currentTimeline.currentTime),
            (n.previousNode = e);
        }
        _visitSubInstructions(e, n, r) {
          let s = n.currentTimeline.currentTime;
          const o = null != r.duration ? Or(r.duration) : null,
            a = null != r.delay ? Or(r.delay) : null;
          return (
            0 !== o &&
              e.forEach((l) => {
                const u = n.appendInstructionToTimeline(l, o, a);
                s = Math.max(s, u.duration + u.delay);
              }),
            s
          );
        }
        visitReference(e, n) {
          n.updateOptions(e.options, !0),
            Et(this, e.animation, n),
            (n.previousNode = e);
        }
        visitSequence(e, n) {
          const r = n.subContextCount;
          let i = n;
          const s = e.options;
          if (
            s &&
            (s.params || s.delay) &&
            ((i = n.createSubContext(s)),
            i.transformIntoNewTimeline(),
            null != s.delay)
          ) {
            6 == i.previousNode.type &&
              (i.currentTimeline.snapshotCurrentStyles(),
              (i.previousNode = Nl));
            const o = Or(s.delay);
            i.delayNextStep(o);
          }
          e.steps.length &&
            (e.steps.forEach((o) => Et(this, o, i)),
            i.currentTimeline.applyStylesToKeyframe(),
            i.subContextCount > r && i.transformIntoNewTimeline()),
            (n.previousNode = e);
        }
        visitGroup(e, n) {
          const r = [];
          let i = n.currentTimeline.currentTime;
          const s = e.options && e.options.delay ? Or(e.options.delay) : 0;
          e.steps.forEach((o) => {
            const a = n.createSubContext(e.options);
            s && a.delayNextStep(s),
              Et(this, o, a),
              (i = Math.max(i, a.currentTimeline.currentTime)),
              r.push(a.currentTimeline);
          }),
            r.forEach((o) => n.currentTimeline.mergeTimelineCollectedStyles(o)),
            n.transformIntoNewTimeline(i),
            (n.previousNode = e);
        }
        _visitTiming(e, n) {
          if (e.dynamic) {
            const r = e.strValue;
            return El(n.params ? wl(r, n.params, n.errors) : r, n.errors);
          }
          return { duration: e.duration, delay: e.delay, easing: e.easing };
        }
        visitAnimate(e, n) {
          const r = (n.currentAnimateTimings = this._visitTiming(e.timings, n)),
            i = n.currentTimeline;
          r.delay && (n.incrementTime(r.delay), i.snapshotCurrentStyles());
          const s = e.style;
          5 == s.type
            ? this.visitKeyframes(s, n)
            : (n.incrementTime(r.duration),
              this.visitStyle(s, n),
              i.applyStylesToKeyframe()),
            (n.currentAnimateTimings = null),
            (n.previousNode = e);
        }
        visitStyle(e, n) {
          const r = n.currentTimeline,
            i = n.currentAnimateTimings;
          !i && r.getCurrentStyleProperties().length && r.forwardFrame();
          const s = (i && i.easing) || e.easing;
          e.isEmptyStep
            ? r.applyEmptyStep(s)
            : r.setStyles(e.styles, s, n.errors, n.options),
            (n.previousNode = e);
        }
        visitKeyframes(e, n) {
          const r = n.currentAnimateTimings,
            i = n.currentTimeline.duration,
            s = r.duration,
            a = n.createSubContext().currentTimeline;
          (a.easing = r.easing),
            e.styles.forEach((l) => {
              a.forwardTime((l.offset || 0) * s),
                a.setStyles(l.styles, l.easing, n.errors, n.options),
                a.applyStylesToKeyframe();
            }),
            n.currentTimeline.mergeTimelineCollectedStyles(a),
            n.transformIntoNewTimeline(i + s),
            (n.previousNode = e);
        }
        visitQuery(e, n) {
          const r = n.currentTimeline.currentTime,
            i = e.options || {},
            s = i.delay ? Or(i.delay) : 0;
          s &&
            (6 === n.previousNode.type ||
              (0 == r &&
                n.currentTimeline.getCurrentStyleProperties().length)) &&
            (n.currentTimeline.snapshotCurrentStyles(), (n.previousNode = Nl));
          let o = r;
          const a = n.invokeQuery(
            e.selector,
            e.originalSelector,
            e.limit,
            e.includeSelf,
            !!i.optional,
            n.errors
          );
          n.currentQueryTotal = a.length;
          let l = null;
          a.forEach((u, c) => {
            n.currentQueryIndex = c;
            const d = n.createSubContext(e.options, u);
            s && d.delayNextStep(s),
              u === n.element && (l = d.currentTimeline),
              Et(this, e.animation, d),
              d.currentTimeline.applyStylesToKeyframe(),
              (o = Math.max(o, d.currentTimeline.currentTime));
          }),
            (n.currentQueryIndex = 0),
            (n.currentQueryTotal = 0),
            n.transformIntoNewTimeline(o),
            l &&
              (n.currentTimeline.mergeTimelineCollectedStyles(l),
              n.currentTimeline.snapshotCurrentStyles()),
            (n.previousNode = e);
        }
        visitStagger(e, n) {
          const r = n.parentContext,
            i = n.currentTimeline,
            s = e.timings,
            o = Math.abs(s.duration),
            a = o * (n.currentQueryTotal - 1);
          let l = o * n.currentQueryIndex;
          switch (s.duration < 0 ? "reverse" : s.easing) {
            case "reverse":
              l = a - l;
              break;
            case "full":
              l = r.currentStaggerTime;
          }
          const c = n.currentTimeline;
          l && c.delayNextStep(l);
          const d = c.currentTime;
          Et(this, e.animation, n),
            (n.previousNode = e),
            (r.currentStaggerTime =
              i.currentTime - d + (i.startTime - r.currentTimeline.startTime));
        }
      }
      const Nl = {};
      class nh {
        constructor(e, n, r, i, s, o, a, l) {
          (this._driver = e),
            (this.element = n),
            (this.subInstructions = r),
            (this._enterClassName = i),
            (this._leaveClassName = s),
            (this.errors = o),
            (this.timelines = a),
            (this.parentContext = null),
            (this.currentAnimateTimings = null),
            (this.previousNode = Nl),
            (this.subContextCount = 0),
            (this.options = {}),
            (this.currentQueryIndex = 0),
            (this.currentQueryTotal = 0),
            (this.currentStaggerTime = 0),
            (this.currentTimeline = l || new xl(this._driver, n, 0)),
            a.push(this.currentTimeline);
        }
        get params() {
          return this.options.params;
        }
        updateOptions(e, n) {
          if (!e) return;
          const r = e;
          let i = this.options;
          null != r.duration && (i.duration = Or(r.duration)),
            null != r.delay && (i.delay = Or(r.delay));
          const s = r.params;
          if (s) {
            let o = i.params;
            o || (o = this.options.params = {}),
              Object.keys(s).forEach((a) => {
                (!n || !o.hasOwnProperty(a)) &&
                  (o[a] = wl(s[a], o, this.errors));
              });
          }
        }
        _copyOptions() {
          const e = {};
          if (this.options) {
            const n = this.options.params;
            if (n) {
              const r = (e.params = {});
              Object.keys(n).forEach((i) => {
                r[i] = n[i];
              });
            }
          }
          return e;
        }
        createSubContext(e = null, n, r) {
          const i = n || this.element,
            s = new nh(
              this._driver,
              i,
              this.subInstructions,
              this._enterClassName,
              this._leaveClassName,
              this.errors,
              this.timelines,
              this.currentTimeline.fork(i, r || 0)
            );
          return (
            (s.previousNode = this.previousNode),
            (s.currentAnimateTimings = this.currentAnimateTimings),
            (s.options = this._copyOptions()),
            s.updateOptions(e),
            (s.currentQueryIndex = this.currentQueryIndex),
            (s.currentQueryTotal = this.currentQueryTotal),
            (s.parentContext = this),
            this.subContextCount++,
            s
          );
        }
        transformIntoNewTimeline(e) {
          return (
            (this.previousNode = Nl),
            (this.currentTimeline = this.currentTimeline.fork(this.element, e)),
            this.timelines.push(this.currentTimeline),
            this.currentTimeline
          );
        }
        appendInstructionToTimeline(e, n, r) {
          const i = {
              duration: null != n ? n : e.duration,
              delay:
                this.currentTimeline.currentTime +
                (null != r ? r : 0) +
                e.delay,
              easing: "",
            },
            s = new iV(
              this._driver,
              e.element,
              e.keyframes,
              e.preStyleProps,
              e.postStyleProps,
              i,
              e.stretchStartingKeyframe
            );
          return this.timelines.push(s), i;
        }
        incrementTime(e) {
          this.currentTimeline.forwardTime(this.currentTimeline.duration + e);
        }
        delayNextStep(e) {
          e > 0 && this.currentTimeline.delayNextStep(e);
        }
        invokeQuery(e, n, r, i, s, o) {
          let a = [];
          if ((i && a.push(this.element), e.length > 0)) {
            e = (e = e.replace(eV, "." + this._enterClassName)).replace(
              nV,
              "." + this._leaveClassName
            );
            let u = this._driver.query(this.element, e, 1 != r);
            0 !== r &&
              (u = r < 0 ? u.slice(u.length + r, u.length) : u.slice(0, r)),
              a.push(...u);
          }
          return (
            !s &&
              0 == a.length &&
              o.push(
                (function pk(t) {
                  return new b(3014, Z);
                })()
              ),
            a
          );
        }
      }
      class xl {
        constructor(e, n, r, i) {
          (this._driver = e),
            (this.element = n),
            (this.startTime = r),
            (this._elementTimelineStylesLookup = i),
            (this.duration = 0),
            (this._previousKeyframe = {}),
            (this._currentKeyframe = {}),
            (this._keyframes = new Map()),
            (this._styleSummary = {}),
            (this._pendingStyles = {}),
            (this._backFill = {}),
            (this._currentEmptyStepKeyframe = null),
            this._elementTimelineStylesLookup ||
              (this._elementTimelineStylesLookup = new Map()),
            (this._localTimelineStyles = Object.create(this._backFill, {})),
            (this._globalTimelineStyles =
              this._elementTimelineStylesLookup.get(n)),
            this._globalTimelineStyles ||
              ((this._globalTimelineStyles = this._localTimelineStyles),
              this._elementTimelineStylesLookup.set(
                n,
                this._localTimelineStyles
              )),
            this._loadKeyframe();
        }
        containsAnimation() {
          switch (this._keyframes.size) {
            case 0:
              return !1;
            case 1:
              return this.getCurrentStyleProperties().length > 0;
            default:
              return !0;
          }
        }
        getCurrentStyleProperties() {
          return Object.keys(this._currentKeyframe);
        }
        get currentTime() {
          return this.startTime + this.duration;
        }
        delayNextStep(e) {
          const n =
            1 == this._keyframes.size &&
            Object.keys(this._pendingStyles).length;
          this.duration || n
            ? (this.forwardTime(this.currentTime + e),
              n && this.snapshotCurrentStyles())
            : (this.startTime += e);
        }
        fork(e, n) {
          return (
            this.applyStylesToKeyframe(),
            new xl(
              this._driver,
              e,
              n || this.currentTime,
              this._elementTimelineStylesLookup
            )
          );
        }
        _loadKeyframe() {
          this._currentKeyframe &&
            (this._previousKeyframe = this._currentKeyframe),
            (this._currentKeyframe = this._keyframes.get(this.duration)),
            this._currentKeyframe ||
              ((this._currentKeyframe = Object.create(this._backFill, {})),
              this._keyframes.set(this.duration, this._currentKeyframe));
        }
        forwardFrame() {
          (this.duration += 1), this._loadKeyframe();
        }
        forwardTime(e) {
          this.applyStylesToKeyframe(),
            (this.duration = e),
            this._loadKeyframe();
        }
        _updateStyle(e, n) {
          (this._localTimelineStyles[e] = n),
            (this._globalTimelineStyles[e] = n),
            (this._styleSummary[e] = { time: this.currentTime, value: n });
        }
        allowOnlyTimelineStyles() {
          return this._currentEmptyStepKeyframe !== this._currentKeyframe;
        }
        applyEmptyStep(e) {
          e && (this._previousKeyframe.easing = e),
            Object.keys(this._globalTimelineStyles).forEach((n) => {
              (this._backFill[n] = this._globalTimelineStyles[n] || Hn),
                (this._currentKeyframe[n] = Hn);
            }),
            (this._currentEmptyStepKeyframe = this._currentKeyframe);
        }
        setStyles(e, n, r, i) {
          n && (this._previousKeyframe.easing = n);
          const s = (i && i.params) || {},
            o = (function sV(t, e) {
              const n = {};
              let r;
              return (
                t.forEach((i) => {
                  "*" === i
                    ? ((r = r || Object.keys(e)),
                      r.forEach((s) => {
                        n[s] = Hn;
                      }))
                    : ar(i, !1, n);
                }),
                n
              );
            })(e, this._globalTimelineStyles);
          Object.keys(o).forEach((a) => {
            const l = wl(o[a], s, r);
            (this._pendingStyles[a] = l),
              this._localTimelineStyles.hasOwnProperty(a) ||
                (this._backFill[a] = this._globalTimelineStyles.hasOwnProperty(
                  a
                )
                  ? this._globalTimelineStyles[a]
                  : Hn),
              this._updateStyle(a, l);
          });
        }
        applyStylesToKeyframe() {
          const e = this._pendingStyles,
            n = Object.keys(e);
          0 != n.length &&
            ((this._pendingStyles = {}),
            n.forEach((r) => {
              this._currentKeyframe[r] = e[r];
            }),
            Object.keys(this._localTimelineStyles).forEach((r) => {
              this._currentKeyframe.hasOwnProperty(r) ||
                (this._currentKeyframe[r] = this._localTimelineStyles[r]);
            }));
        }
        snapshotCurrentStyles() {
          Object.keys(this._localTimelineStyles).forEach((e) => {
            const n = this._localTimelineStyles[e];
            (this._pendingStyles[e] = n), this._updateStyle(e, n);
          });
        }
        getFinalKeyframe() {
          return this._keyframes.get(this.duration);
        }
        get properties() {
          const e = [];
          for (let n in this._currentKeyframe) e.push(n);
          return e;
        }
        mergeTimelineCollectedStyles(e) {
          Object.keys(e._styleSummary).forEach((n) => {
            const r = this._styleSummary[n],
              i = e._styleSummary[n];
            (!r || i.time > r.time) && this._updateStyle(n, i.value);
          });
        }
        buildKeyframes() {
          this.applyStylesToKeyframe();
          const e = new Set(),
            n = new Set(),
            r = 1 === this._keyframes.size && 0 === this.duration;
          let i = [];
          this._keyframes.forEach((a, l) => {
            const u = ar(a, !0);
            Object.keys(u).forEach((c) => {
              const d = u[c];
              "!" == d ? e.add(c) : d == Hn && n.add(c);
            }),
              r || (u.offset = l / this.duration),
              i.push(u);
          });
          const s = e.size ? bl(e.values()) : [],
            o = n.size ? bl(n.values()) : [];
          if (r) {
            const a = i[0],
              l = Bi(a);
            (a.offset = 0), (l.offset = 1), (i = [a, l]);
          }
          return eh(
            this.element,
            i,
            s,
            o,
            this.duration,
            this.startTime,
            this.easing,
            !1
          );
        }
      }
      class iV extends xl {
        constructor(e, n, r, i, s, o, a = !1) {
          super(e, n, o.delay),
            (this.keyframes = r),
            (this.preStyleProps = i),
            (this.postStyleProps = s),
            (this._stretchStartingKeyframe = a),
            (this.timings = {
              duration: o.duration,
              delay: o.delay,
              easing: o.easing,
            });
        }
        containsAnimation() {
          return this.keyframes.length > 1;
        }
        buildKeyframes() {
          let e = this.keyframes,
            { delay: n, duration: r, easing: i } = this.timings;
          if (this._stretchStartingKeyframe && n) {
            const s = [],
              o = r + n,
              a = n / o,
              l = ar(e[0], !1);
            (l.offset = 0), s.push(l);
            const u = ar(e[0], !1);
            (u.offset = PE(a)), s.push(u);
            const c = e.length - 1;
            for (let d = 1; d <= c; d++) {
              let f = ar(e[d], !1);
              (f.offset = PE((n + f.offset * r) / o)), s.push(f);
            }
            (r = o), (n = 0), (i = ""), (e = s);
          }
          return eh(
            this.element,
            e,
            this.preStyleProps,
            this.postStyleProps,
            r,
            n,
            i,
            !0
          );
        }
      }
      function PE(t, e = 3) {
        const n = Math.pow(10, e - 1);
        return Math.round(t * n) / n;
      }
      class rh {}
      class oV extends rh {
        normalizePropertyName(e, n) {
          return Yf(e);
        }
        normalizeStyleValue(e, n, r, i) {
          let s = "";
          const o = r.toString().trim();
          if (aV[n] && 0 !== r && "0" !== r)
            if ("number" == typeof r) s = "px";
            else {
              const a = r.match(/^[+-]?[\d\.]+([a-z]*)$/);
              a &&
                0 == a[1].length &&
                i.push(
                  (function nk(t, e) {
                    return new b(3005, Z);
                  })()
                );
            }
          return o + s;
        }
      }
      const aV = (() =>
        (function lV(t) {
          const e = {};
          return t.forEach((n) => (e[n] = !0)), e;
        })(
          "width,height,minWidth,minHeight,maxWidth,maxHeight,left,top,bottom,right,fontSize,outlineWidth,outlineOffset,paddingTop,paddingLeft,paddingBottom,paddingRight,marginTop,marginLeft,marginBottom,marginRight,borderRadius,borderWidth,borderTopWidth,borderLeftWidth,borderRightWidth,borderBottomWidth,textIndent,perspective".split(
            ","
          )
        ))();
      function RE(t, e, n, r, i, s, o, a, l, u, c, d, f) {
        return {
          type: 0,
          element: t,
          triggerName: e,
          isRemovalTransition: i,
          fromState: n,
          fromStyles: s,
          toState: r,
          toStyles: o,
          timelines: a,
          queriedElements: l,
          preStyleProps: u,
          postStyleProps: c,
          totalTime: d,
          errors: f,
        };
      }
      const ih = {};
      class OE {
        constructor(e, n, r) {
          (this._triggerName = e), (this.ast = n), (this._stateStyles = r);
        }
        match(e, n, r, i) {
          return (function uV(t, e, n, r, i) {
            return t.some((s) => s(e, n, r, i));
          })(this.ast.matchers, e, n, r, i);
        }
        buildStyles(e, n, r) {
          const i = this._stateStyles["*"],
            s = this._stateStyles[e],
            o = i ? i.buildStyles(n, r) : {};
          return s ? s.buildStyles(n, r) : o;
        }
        build(e, n, r, i, s, o, a, l, u, c) {
          const d = [],
            f = (this.ast.options && this.ast.options.params) || ih,
            p = this.buildStyles(r, (a && a.params) || ih, d),
            g = (l && l.params) || ih,
            y = this.buildStyles(i, g, d),
            _ = new Set(),
            m = new Map(),
            C = new Map(),
            S = "void" === i,
            B = { params: Object.assign(Object.assign({}, f), g) },
            pe = c ? [] : th(e, n, this.ast.animation, s, o, p, y, B, u, d);
          let ye = 0;
          if (
            (pe.forEach((bt) => {
              ye = Math.max(bt.duration + bt.delay, ye);
            }),
            d.length)
          )
            return RE(n, this._triggerName, r, i, S, p, y, [], [], m, C, ye, d);
          pe.forEach((bt) => {
            const St = bt.element,
              Ui = Ct(m, St, {});
            bt.preStyleProps.forEach((sn) => (Ui[sn] = !0));
            const $n = Ct(C, St, {});
            bt.postStyleProps.forEach((sn) => ($n[sn] = !0)),
              St !== n && _.add(St);
          });
          const wt = bl(_.values());
          return RE(n, this._triggerName, r, i, S, p, y, pe, wt, m, C, ye);
        }
      }
      class cV {
        constructor(e, n, r) {
          (this.styles = e), (this.defaultParams = n), (this.normalizer = r);
        }
        buildStyles(e, n) {
          const r = {},
            i = Bi(this.defaultParams);
          return (
            Object.keys(e).forEach((s) => {
              const o = e[s];
              null != o && (i[s] = o);
            }),
            this.styles.styles.forEach((s) => {
              if ("string" != typeof s) {
                const o = s;
                Object.keys(o).forEach((a) => {
                  let l = o[a];
                  l.length > 1 && (l = wl(l, i, n));
                  const u = this.normalizer.normalizePropertyName(a, n);
                  (l = this.normalizer.normalizeStyleValue(a, u, l, n)),
                    (r[u] = l);
                });
              }
            }),
            r
          );
        }
      }
      class fV {
        constructor(e, n, r) {
          (this.name = e),
            (this.ast = n),
            (this._normalizer = r),
            (this.transitionFactories = []),
            (this.states = {}),
            n.states.forEach((i) => {
              this.states[i.name] = new cV(
                i.style,
                (i.options && i.options.params) || {},
                r
              );
            }),
            kE(this.states, "true", "1"),
            kE(this.states, "false", "0"),
            n.transitions.forEach((i) => {
              this.transitionFactories.push(new OE(e, i, this.states));
            }),
            (this.fallbackTransition = (function hV(t, e, n) {
              return new OE(
                t,
                {
                  type: 1,
                  animation: { type: 2, steps: [], options: null },
                  matchers: [(o, a) => !0],
                  options: null,
                  queryCount: 0,
                  depCount: 0,
                },
                e
              );
            })(e, this.states));
        }
        get containsQueries() {
          return this.ast.queryCount > 0;
        }
        matchTransition(e, n, r, i) {
          return (
            this.transitionFactories.find((o) => o.match(e, n, r, i)) || null
          );
        }
        matchStyles(e, n, r) {
          return this.fallbackTransition.buildStyles(e, n, r);
        }
      }
      function kE(t, e, n) {
        t.hasOwnProperty(e)
          ? t.hasOwnProperty(n) || (t[n] = t[e])
          : t.hasOwnProperty(n) && (t[e] = t[n]);
      }
      const pV = new Il();
      class gV {
        constructor(e, n, r) {
          (this.bodyNode = e),
            (this._driver = n),
            (this._normalizer = r),
            (this._animations = {}),
            (this._playersById = {}),
            (this.players = []);
        }
        register(e, n) {
          const r = [],
            i = Jf(this._driver, n, r);
          if (r.length)
            throw (function Ck(t) {
              return new b(3503, Z);
            })();
          this._animations[e] = i;
        }
        _buildPlayer(e, n, r) {
          const i = e.element,
            s = pE(0, this._normalizer, 0, e.keyframes, n, r);
          return this._driver.animate(
            i,
            s,
            e.duration,
            e.delay,
            e.easing,
            [],
            !0
          );
        }
        create(e, n, r = {}) {
          const i = [],
            s = this._animations[e];
          let o;
          const a = new Map();
          if (
            (s
              ? ((o = th(this._driver, n, s, Wf, vl, {}, {}, r, pV, i)),
                o.forEach((c) => {
                  const d = Ct(a, c.element, {});
                  c.postStyleProps.forEach((f) => (d[f] = null));
                }))
              : (i.push(
                  (function Ek() {
                    return new b(3300, Z);
                  })()
                ),
                (o = [])),
            i.length)
          )
            throw (function wk(t) {
              return new b(3504, Z);
            })();
          a.forEach((c, d) => {
            Object.keys(c).forEach((f) => {
              c[f] = this._driver.computeStyle(d, f, Hn);
            });
          });
          const u = or(
            o.map((c) => {
              const d = a.get(c.element);
              return this._buildPlayer(c, {}, d);
            })
          );
          return (
            (this._playersById[e] = u),
            u.onDestroy(() => this.destroy(e)),
            this.players.push(u),
            u
          );
        }
        destroy(e) {
          const n = this._getPlayer(e);
          n.destroy(), delete this._playersById[e];
          const r = this.players.indexOf(n);
          r >= 0 && this.players.splice(r, 1);
        }
        _getPlayer(e) {
          const n = this._playersById[e];
          if (!n)
            throw (function bk(t) {
              return new b(3301, Z);
            })();
          return n;
        }
        listen(e, n, r, i) {
          const s = $f(n, "", "", "");
          return Uf(this._getPlayer(e), r, s, i), () => {};
        }
        command(e, n, r, i) {
          if ("register" == r) return void this.register(e, i[0]);
          if ("create" == r) return void this.create(e, n, i[0] || {});
          const s = this._getPlayer(e);
          switch (r) {
            case "play":
              s.play();
              break;
            case "pause":
              s.pause();
              break;
            case "reset":
              s.reset();
              break;
            case "restart":
              s.restart();
              break;
            case "finish":
              s.finish();
              break;
            case "init":
              s.init();
              break;
            case "setPosition":
              s.setPosition(parseFloat(i[0]));
              break;
            case "destroy":
              this.destroy(e);
          }
        }
      }
      const VE = "ng-animate-queued",
        sh = "ng-animate-disabled",
        DV = [],
        LE = {
          namespaceId: "",
          setForRemoval: !1,
          setForMove: !1,
          hasAnimation: !1,
          removedBeforeQueried: !1,
        },
        CV = {
          namespaceId: "",
          setForMove: !1,
          setForRemoval: !1,
          hasAnimation: !1,
          removedBeforeQueried: !0,
        },
        jt = "__ng_removed";
      class oh {
        constructor(e, n = "") {
          this.namespaceId = n;
          const r = e && e.hasOwnProperty("value");
          if (
            ((this.value = (function SV(t) {
              return null != t ? t : null;
            })(r ? e.value : e)),
            r)
          ) {
            const s = Bi(e);
            delete s.value, (this.options = s);
          } else this.options = {};
          this.options.params || (this.options.params = {});
        }
        get params() {
          return this.options.params;
        }
        absorbOptions(e) {
          const n = e.params;
          if (n) {
            const r = this.options.params;
            Object.keys(n).forEach((i) => {
              null == r[i] && (r[i] = n[i]);
            });
          }
        }
      }
      const fo = "void",
        ah = new oh(fo);
      class EV {
        constructor(e, n, r) {
          (this.id = e),
            (this.hostElement = n),
            (this._engine = r),
            (this.players = []),
            (this._triggers = {}),
            (this._queue = []),
            (this._elementListeners = new Map()),
            (this._hostClassName = "ng-tns-" + e),
            Ut(n, this._hostClassName);
        }
        listen(e, n, r, i) {
          if (!this._triggers.hasOwnProperty(n))
            throw (function Sk(t, e) {
              return new b(3302, Z);
            })();
          if (null == r || 0 == r.length)
            throw (function Ak(t) {
              return new b(3303, Z);
            })();
          if (
            !(function AV(t) {
              return "start" == t || "done" == t;
            })(r)
          )
            throw (function Mk(t, e) {
              return new b(3400, Z);
            })();
          const s = Ct(this._elementListeners, e, []),
            o = { name: n, phase: r, callback: i };
          s.push(o);
          const a = Ct(this._engine.statesByElement, e, {});
          return (
            a.hasOwnProperty(n) ||
              (Ut(e, Dl), Ut(e, Dl + "-" + n), (a[n] = ah)),
            () => {
              this._engine.afterFlush(() => {
                const l = s.indexOf(o);
                l >= 0 && s.splice(l, 1), this._triggers[n] || delete a[n];
              });
            }
          );
        }
        register(e, n) {
          return !this._triggers[e] && ((this._triggers[e] = n), !0);
        }
        _getTrigger(e) {
          const n = this._triggers[e];
          if (!n)
            throw (function Tk(t) {
              return new b(3401, Z);
            })();
          return n;
        }
        trigger(e, n, r, i = !0) {
          const s = this._getTrigger(n),
            o = new lh(this.id, n, e);
          let a = this._engine.statesByElement.get(e);
          a ||
            (Ut(e, Dl),
            Ut(e, Dl + "-" + n),
            this._engine.statesByElement.set(e, (a = {})));
          let l = a[n];
          const u = new oh(r, this.id);
          if (
            (!(r && r.hasOwnProperty("value")) &&
              l &&
              u.absorbOptions(l.options),
            (a[n] = u),
            l || (l = ah),
            u.value !== fo && l.value === u.value)
          ) {
            if (
              !(function IV(t, e) {
                const n = Object.keys(t),
                  r = Object.keys(e);
                if (n.length != r.length) return !1;
                for (let i = 0; i < n.length; i++) {
                  const s = n[i];
                  if (!e.hasOwnProperty(s) || t[s] !== e[s]) return !1;
                }
                return !0;
              })(l.params, u.params)
            ) {
              const g = [],
                y = s.matchStyles(l.value, l.params, g),
                _ = s.matchStyles(u.value, u.params, g);
              g.length
                ? this._engine.reportError(g)
                : this._engine.afterFlush(() => {
                    kr(e, y), wn(e, _);
                  });
            }
            return;
          }
          const f = Ct(this._engine.playersByElement, e, []);
          f.forEach((g) => {
            g.namespaceId == this.id &&
              g.triggerName == n &&
              g.queued &&
              g.destroy();
          });
          let h = s.matchTransition(l.value, u.value, e, u.params),
            p = !1;
          if (!h) {
            if (!i) return;
            (h = s.fallbackTransition), (p = !0);
          }
          return (
            this._engine.totalQueuedPlayers++,
            this._queue.push({
              element: e,
              triggerName: n,
              transition: h,
              fromState: l,
              toState: u,
              player: o,
              isFallbackTransition: p,
            }),
            p ||
              (Ut(e, VE),
              o.onStart(() => {
                ji(e, VE);
              })),
            o.onDone(() => {
              let g = this.players.indexOf(o);
              g >= 0 && this.players.splice(g, 1);
              const y = this._engine.playersByElement.get(e);
              if (y) {
                let _ = y.indexOf(o);
                _ >= 0 && y.splice(_, 1);
              }
            }),
            this.players.push(o),
            f.push(o),
            o
          );
        }
        deregister(e) {
          delete this._triggers[e],
            this._engine.statesByElement.forEach((n, r) => {
              delete n[e];
            }),
            this._elementListeners.forEach((n, r) => {
              this._elementListeners.set(
                r,
                n.filter((i) => i.name != e)
              );
            });
        }
        clearElementCache(e) {
          this._engine.statesByElement.delete(e),
            this._elementListeners.delete(e);
          const n = this._engine.playersByElement.get(e);
          n &&
            (n.forEach((r) => r.destroy()),
            this._engine.playersByElement.delete(e));
        }
        _signalRemovalForInnerTriggers(e, n) {
          const r = this._engine.driver.query(e, Cl, !0);
          r.forEach((i) => {
            if (i[jt]) return;
            const s = this._engine.fetchNamespacesByElement(i);
            s.size
              ? s.forEach((o) => o.triggerLeaveAnimation(i, n, !1, !0))
              : this.clearElementCache(i);
          }),
            this._engine.afterFlushAnimationsDone(() =>
              r.forEach((i) => this.clearElementCache(i))
            );
        }
        triggerLeaveAnimation(e, n, r, i) {
          const s = this._engine.statesByElement.get(e),
            o = new Map();
          if (s) {
            const a = [];
            if (
              (Object.keys(s).forEach((l) => {
                if ((o.set(l, s[l].value), this._triggers[l])) {
                  const u = this.trigger(e, l, fo, i);
                  u && a.push(u);
                }
              }),
              a.length)
            )
              return (
                this._engine.markElementAsRemoved(this.id, e, !0, n, o),
                r && or(a).onDone(() => this._engine.processLeaveNode(e)),
                !0
              );
          }
          return !1;
        }
        prepareLeaveAnimationListeners(e) {
          const n = this._elementListeners.get(e),
            r = this._engine.statesByElement.get(e);
          if (n && r) {
            const i = new Set();
            n.forEach((s) => {
              const o = s.name;
              if (i.has(o)) return;
              i.add(o);
              const l = this._triggers[o].fallbackTransition,
                u = r[o] || ah,
                c = new oh(fo),
                d = new lh(this.id, o, e);
              this._engine.totalQueuedPlayers++,
                this._queue.push({
                  element: e,
                  triggerName: o,
                  transition: l,
                  fromState: u,
                  toState: c,
                  player: d,
                  isFallbackTransition: !0,
                });
            });
          }
        }
        removeNode(e, n) {
          const r = this._engine;
          if (
            (e.childElementCount && this._signalRemovalForInnerTriggers(e, n),
            this.triggerLeaveAnimation(e, n, !0))
          )
            return;
          let i = !1;
          if (r.totalAnimations) {
            const s = r.players.length ? r.playersByQueriedElement.get(e) : [];
            if (s && s.length) i = !0;
            else {
              let o = e;
              for (; (o = o.parentNode); )
                if (r.statesByElement.get(o)) {
                  i = !0;
                  break;
                }
            }
          }
          if ((this.prepareLeaveAnimationListeners(e), i))
            r.markElementAsRemoved(this.id, e, !1, n);
          else {
            const s = e[jt];
            (!s || s === LE) &&
              (r.afterFlush(() => this.clearElementCache(e)),
              r.destroyInnerAnimations(e),
              r._onRemovalComplete(e, n));
          }
        }
        insertNode(e, n) {
          Ut(e, this._hostClassName);
        }
        drainQueuedTransitions(e) {
          const n = [];
          return (
            this._queue.forEach((r) => {
              const i = r.player;
              if (i.destroyed) return;
              const s = r.element,
                o = this._elementListeners.get(s);
              o &&
                o.forEach((a) => {
                  if (a.name == r.triggerName) {
                    const l = $f(
                      s,
                      r.triggerName,
                      r.fromState.value,
                      r.toState.value
                    );
                    (l._data = e), Uf(r.player, a.phase, l, a.callback);
                  }
                }),
                i.markedForDestroy
                  ? this._engine.afterFlush(() => {
                      i.destroy();
                    })
                  : n.push(r);
            }),
            (this._queue = []),
            n.sort((r, i) => {
              const s = r.transition.ast.depCount,
                o = i.transition.ast.depCount;
              return 0 == s || 0 == o
                ? s - o
                : this._engine.driver.containsElement(r.element, i.element)
                ? 1
                : -1;
            })
          );
        }
        destroy(e) {
          this.players.forEach((n) => n.destroy()),
            this._signalRemovalForInnerTriggers(this.hostElement, e);
        }
        elementContainsData(e) {
          let n = !1;
          return (
            this._elementListeners.has(e) && (n = !0),
            (n = !!this._queue.find((r) => r.element === e) || n),
            n
          );
        }
      }
      class wV {
        constructor(e, n, r) {
          (this.bodyNode = e),
            (this.driver = n),
            (this._normalizer = r),
            (this.players = []),
            (this.newHostElements = new Map()),
            (this.playersByElement = new Map()),
            (this.playersByQueriedElement = new Map()),
            (this.statesByElement = new Map()),
            (this.disabledNodes = new Set()),
            (this.totalAnimations = 0),
            (this.totalQueuedPlayers = 0),
            (this._namespaceLookup = {}),
            (this._namespaceList = []),
            (this._flushFns = []),
            (this._whenQuietFns = []),
            (this.namespacesByHostElement = new Map()),
            (this.collectedEnterElements = []),
            (this.collectedLeaveElements = []),
            (this.onRemovalComplete = (i, s) => {});
        }
        _onRemovalComplete(e, n) {
          this.onRemovalComplete(e, n);
        }
        get queuedPlayers() {
          const e = [];
          return (
            this._namespaceList.forEach((n) => {
              n.players.forEach((r) => {
                r.queued && e.push(r);
              });
            }),
            e
          );
        }
        createNamespace(e, n) {
          const r = new EV(e, n, this);
          return (
            this.bodyNode && this.driver.containsElement(this.bodyNode, n)
              ? this._balanceNamespaceList(r, n)
              : (this.newHostElements.set(n, r), this.collectEnterElement(n)),
            (this._namespaceLookup[e] = r)
          );
        }
        _balanceNamespaceList(e, n) {
          const r = this._namespaceList,
            i = this.namespacesByHostElement,
            s = r.length - 1;
          if (s >= 0) {
            let o = !1;
            if (void 0 !== this.driver.getParentElement) {
              let a = this.driver.getParentElement(n);
              for (; a; ) {
                const l = i.get(a);
                if (l) {
                  const u = r.indexOf(l);
                  r.splice(u + 1, 0, e), (o = !0);
                  break;
                }
                a = this.driver.getParentElement(a);
              }
            } else
              for (let a = s; a >= 0; a--)
                if (this.driver.containsElement(r[a].hostElement, n)) {
                  r.splice(a + 1, 0, e), (o = !0);
                  break;
                }
            o || r.unshift(e);
          } else r.push(e);
          return i.set(n, e), e;
        }
        register(e, n) {
          let r = this._namespaceLookup[e];
          return r || (r = this.createNamespace(e, n)), r;
        }
        registerTrigger(e, n, r) {
          let i = this._namespaceLookup[e];
          i && i.register(n, r) && this.totalAnimations++;
        }
        destroy(e, n) {
          if (!e) return;
          const r = this._fetchNamespace(e);
          this.afterFlush(() => {
            this.namespacesByHostElement.delete(r.hostElement),
              delete this._namespaceLookup[e];
            const i = this._namespaceList.indexOf(r);
            i >= 0 && this._namespaceList.splice(i, 1);
          }),
            this.afterFlushAnimationsDone(() => r.destroy(n));
        }
        _fetchNamespace(e) {
          return this._namespaceLookup[e];
        }
        fetchNamespacesByElement(e) {
          const n = new Set(),
            r = this.statesByElement.get(e);
          if (r) {
            const i = Object.keys(r);
            for (let s = 0; s < i.length; s++) {
              const o = r[i[s]].namespaceId;
              if (o) {
                const a = this._fetchNamespace(o);
                a && n.add(a);
              }
            }
          }
          return n;
        }
        trigger(e, n, r, i) {
          if (Fl(n)) {
            const s = this._fetchNamespace(e);
            if (s) return s.trigger(n, r, i), !0;
          }
          return !1;
        }
        insertNode(e, n, r, i) {
          if (!Fl(n)) return;
          const s = n[jt];
          if (s && s.setForRemoval) {
            (s.setForRemoval = !1), (s.setForMove = !0);
            const o = this.collectedLeaveElements.indexOf(n);
            o >= 0 && this.collectedLeaveElements.splice(o, 1);
          }
          if (e) {
            const o = this._fetchNamespace(e);
            o && o.insertNode(n, r);
          }
          i && this.collectEnterElement(n);
        }
        collectEnterElement(e) {
          this.collectedEnterElements.push(e);
        }
        markElementAsDisabled(e, n) {
          n
            ? this.disabledNodes.has(e) ||
              (this.disabledNodes.add(e), Ut(e, sh))
            : this.disabledNodes.has(e) &&
              (this.disabledNodes.delete(e), ji(e, sh));
        }
        removeNode(e, n, r, i) {
          if (Fl(n)) {
            const s = e ? this._fetchNamespace(e) : null;
            if (
              (s ? s.removeNode(n, i) : this.markElementAsRemoved(e, n, !1, i),
              r)
            ) {
              const o = this.namespacesByHostElement.get(n);
              o && o.id !== e && o.removeNode(n, i);
            }
          } else this._onRemovalComplete(n, i);
        }
        markElementAsRemoved(e, n, r, i, s) {
          this.collectedLeaveElements.push(n),
            (n[jt] = {
              namespaceId: e,
              setForRemoval: i,
              hasAnimation: r,
              removedBeforeQueried: !1,
              previousTriggersValues: s,
            });
        }
        listen(e, n, r, i, s) {
          return Fl(n) ? this._fetchNamespace(e).listen(n, r, i, s) : () => {};
        }
        _buildInstruction(e, n, r, i, s) {
          return e.transition.build(
            this.driver,
            e.element,
            e.fromState.value,
            e.toState.value,
            r,
            i,
            e.fromState.options,
            e.toState.options,
            n,
            s
          );
        }
        destroyInnerAnimations(e) {
          let n = this.driver.query(e, Cl, !0);
          n.forEach((r) => this.destroyActiveAnimationsForElement(r)),
            0 != this.playersByQueriedElement.size &&
              ((n = this.driver.query(e, Qf, !0)),
              n.forEach((r) => this.finishActiveQueriedAnimationOnElement(r)));
        }
        destroyActiveAnimationsForElement(e) {
          const n = this.playersByElement.get(e);
          n &&
            n.forEach((r) => {
              r.queued ? (r.markedForDestroy = !0) : r.destroy();
            });
        }
        finishActiveQueriedAnimationOnElement(e) {
          const n = this.playersByQueriedElement.get(e);
          n && n.forEach((r) => r.finish());
        }
        whenRenderingDone() {
          return new Promise((e) => {
            if (this.players.length) return or(this.players).onDone(() => e());
            e();
          });
        }
        processLeaveNode(e) {
          var n;
          const r = e[jt];
          if (r && r.setForRemoval) {
            if (((e[jt] = LE), r.namespaceId)) {
              this.destroyInnerAnimations(e);
              const i = this._fetchNamespace(r.namespaceId);
              i && i.clearElementCache(e);
            }
            this._onRemovalComplete(e, r.setForRemoval);
          }
          (null === (n = e.classList) || void 0 === n
            ? void 0
            : n.contains(sh)) && this.markElementAsDisabled(e, !1),
            this.driver.query(e, ".ng-animate-disabled", !0).forEach((i) => {
              this.markElementAsDisabled(i, !1);
            });
        }
        flush(e = -1) {
          let n = [];
          if (
            (this.newHostElements.size &&
              (this.newHostElements.forEach((r, i) =>
                this._balanceNamespaceList(r, i)
              ),
              this.newHostElements.clear()),
            this.totalAnimations && this.collectedEnterElements.length)
          )
            for (let r = 0; r < this.collectedEnterElements.length; r++)
              Ut(this.collectedEnterElements[r], "ng-star-inserted");
          if (
            this._namespaceList.length &&
            (this.totalQueuedPlayers || this.collectedLeaveElements.length)
          ) {
            const r = [];
            try {
              n = this._flushAnimations(r, e);
            } finally {
              for (let i = 0; i < r.length; i++) r[i]();
            }
          } else
            for (let r = 0; r < this.collectedLeaveElements.length; r++)
              this.processLeaveNode(this.collectedLeaveElements[r]);
          if (
            ((this.totalQueuedPlayers = 0),
            (this.collectedEnterElements.length = 0),
            (this.collectedLeaveElements.length = 0),
            this._flushFns.forEach((r) => r()),
            (this._flushFns = []),
            this._whenQuietFns.length)
          ) {
            const r = this._whenQuietFns;
            (this._whenQuietFns = []),
              n.length
                ? or(n).onDone(() => {
                    r.forEach((i) => i());
                  })
                : r.forEach((i) => i());
          }
        }
        reportError(e) {
          throw (function Ik(t) {
            return new b(3402, Z);
          })();
        }
        _flushAnimations(e, n) {
          const r = new Il(),
            i = [],
            s = new Map(),
            o = [],
            a = new Map(),
            l = new Map(),
            u = new Map(),
            c = new Set();
          this.disabledNodes.forEach((A) => {
            c.add(A);
            const N = this.driver.query(A, ".ng-animate-queued", !0);
            for (let R = 0; R < N.length; R++) c.add(N[R]);
          });
          const d = this.bodyNode,
            f = Array.from(this.statesByElement.keys()),
            h = UE(f, this.collectedEnterElements),
            p = new Map();
          let g = 0;
          h.forEach((A, N) => {
            const R = Wf + g++;
            p.set(N, R), A.forEach((X) => Ut(X, R));
          });
          const y = [],
            _ = new Set(),
            m = new Set();
          for (let A = 0; A < this.collectedLeaveElements.length; A++) {
            const N = this.collectedLeaveElements[A],
              R = N[jt];
            R &&
              R.setForRemoval &&
              (y.push(N),
              _.add(N),
              R.hasAnimation
                ? this.driver
                    .query(N, ".ng-star-inserted", !0)
                    .forEach((X) => _.add(X))
                : m.add(N));
          }
          const C = new Map(),
            S = UE(f, Array.from(_));
          S.forEach((A, N) => {
            const R = vl + g++;
            C.set(N, R), A.forEach((X) => Ut(X, R));
          }),
            e.push(() => {
              h.forEach((A, N) => {
                const R = p.get(N);
                A.forEach((X) => ji(X, R));
              }),
                S.forEach((A, N) => {
                  const R = C.get(N);
                  A.forEach((X) => ji(X, R));
                }),
                y.forEach((A) => {
                  this.processLeaveNode(A);
                });
            });
          const B = [],
            pe = [];
          for (let A = this._namespaceList.length - 1; A >= 0; A--)
            this._namespaceList[A].drainQueuedTransitions(n).forEach((R) => {
              const X = R.player,
                Ue = R.element;
              if ((B.push(X), this.collectedEnterElements.length)) {
                const it = Ue[jt];
                if (it && it.setForMove) {
                  if (
                    it.previousTriggersValues &&
                    it.previousTriggersValues.has(R.triggerName)
                  ) {
                    const Lr = it.previousTriggersValues.get(R.triggerName),
                      ur = this.statesByElement.get(R.element);
                    ur && ur[R.triggerName] && (ur[R.triggerName].value = Lr);
                  }
                  return void X.destroy();
                }
              }
              const bn = !d || !this.driver.containsElement(d, Ue),
                At = C.get(Ue),
                lr = p.get(Ue),
                _e = this._buildInstruction(R, r, lr, At, bn);
              if (_e.errors && _e.errors.length) return void pe.push(_e);
              if (bn)
                return (
                  X.onStart(() => kr(Ue, _e.fromStyles)),
                  X.onDestroy(() => wn(Ue, _e.toStyles)),
                  void i.push(X)
                );
              if (R.isFallbackTransition)
                return (
                  X.onStart(() => kr(Ue, _e.fromStyles)),
                  X.onDestroy(() => wn(Ue, _e.toStyles)),
                  void i.push(X)
                );
              const YE = [];
              _e.timelines.forEach((it) => {
                (it.stretchStartingKeyframe = !0),
                  this.disabledNodes.has(it.element) || YE.push(it);
              }),
                (_e.timelines = YE),
                r.append(Ue, _e.timelines),
                o.push({ instruction: _e, player: X, element: Ue }),
                _e.queriedElements.forEach((it) => Ct(a, it, []).push(X)),
                _e.preStyleProps.forEach((it, Lr) => {
                  const ur = Object.keys(it);
                  if (ur.length) {
                    let Br = l.get(Lr);
                    Br || l.set(Lr, (Br = new Set())),
                      ur.forEach((ch) => Br.add(ch));
                  }
                }),
                _e.postStyleProps.forEach((it, Lr) => {
                  const ur = Object.keys(it);
                  let Br = u.get(Lr);
                  Br || u.set(Lr, (Br = new Set())),
                    ur.forEach((ch) => Br.add(ch));
                });
            });
          if (pe.length) {
            const A = [];
            pe.forEach((N) => {
              A.push(
                (function Nk(t, e) {
                  return new b(3505, Z);
                })()
              );
            }),
              B.forEach((N) => N.destroy()),
              this.reportError(A);
          }
          const ye = new Map(),
            wt = new Map();
          o.forEach((A) => {
            const N = A.element;
            r.has(N) &&
              (wt.set(N, N),
              this._beforeAnimationBuild(
                A.player.namespaceId,
                A.instruction,
                ye
              ));
          }),
            i.forEach((A) => {
              const N = A.element;
              this._getPreviousPlayers(
                N,
                !1,
                A.namespaceId,
                A.triggerName,
                null
              ).forEach((X) => {
                Ct(ye, N, []).push(X), X.destroy();
              });
            });
          const bt = y.filter((A) => $E(A, l, u)),
            St = new Map();
          jE(St, this.driver, m, u, Hn).forEach((A) => {
            $E(A, l, u) && bt.push(A);
          });
          const $n = new Map();
          h.forEach((A, N) => {
            jE($n, this.driver, new Set(A), l, "!");
          }),
            bt.forEach((A) => {
              const N = St.get(A),
                R = $n.get(A);
              St.set(A, Object.assign(Object.assign({}, N), R));
            });
          const sn = [],
            Hi = [],
            $i = {};
          o.forEach((A) => {
            const { element: N, player: R, instruction: X } = A;
            if (r.has(N)) {
              if (c.has(N))
                return (
                  R.onDestroy(() => wn(N, X.toStyles)),
                  (R.disabled = !0),
                  R.overrideTotalTime(X.totalTime),
                  void i.push(R)
                );
              let Ue = $i;
              if (wt.size > 1) {
                let At = N;
                const lr = [];
                for (; (At = At.parentNode); ) {
                  const _e = wt.get(At);
                  if (_e) {
                    Ue = _e;
                    break;
                  }
                  lr.push(At);
                }
                lr.forEach((_e) => wt.set(_e, Ue));
              }
              const bn = this._buildAnimation(R.namespaceId, X, ye, s, $n, St);
              if ((R.setRealPlayer(bn), Ue === $i)) sn.push(R);
              else {
                const At = this.playersByElement.get(Ue);
                At && At.length && (R.parentPlayer = or(At)), i.push(R);
              }
            } else
              kr(N, X.fromStyles),
                R.onDestroy(() => wn(N, X.toStyles)),
                Hi.push(R),
                c.has(N) && i.push(R);
          }),
            Hi.forEach((A) => {
              const N = s.get(A.element);
              if (N && N.length) {
                const R = or(N);
                A.setRealPlayer(R);
              }
            }),
            i.forEach((A) => {
              A.parentPlayer ? A.syncPlayerEvents(A.parentPlayer) : A.destroy();
            });
          for (let A = 0; A < y.length; A++) {
            const N = y[A],
              R = N[jt];
            if ((ji(N, vl), R && R.hasAnimation)) continue;
            let X = [];
            if (a.size) {
              let bn = a.get(N);
              bn && bn.length && X.push(...bn);
              let At = this.driver.query(N, Qf, !0);
              for (let lr = 0; lr < At.length; lr++) {
                let _e = a.get(At[lr]);
                _e && _e.length && X.push(..._e);
              }
            }
            const Ue = X.filter((bn) => !bn.destroyed);
            Ue.length ? MV(this, N, Ue) : this.processLeaveNode(N);
          }
          return (
            (y.length = 0),
            sn.forEach((A) => {
              this.players.push(A),
                A.onDone(() => {
                  A.destroy();
                  const N = this.players.indexOf(A);
                  this.players.splice(N, 1);
                }),
                A.play();
            }),
            sn
          );
        }
        elementContainsData(e, n) {
          let r = !1;
          const i = n[jt];
          return (
            i && i.setForRemoval && (r = !0),
            this.playersByElement.has(n) && (r = !0),
            this.playersByQueriedElement.has(n) && (r = !0),
            this.statesByElement.has(n) && (r = !0),
            this._fetchNamespace(e).elementContainsData(n) || r
          );
        }
        afterFlush(e) {
          this._flushFns.push(e);
        }
        afterFlushAnimationsDone(e) {
          this._whenQuietFns.push(e);
        }
        _getPreviousPlayers(e, n, r, i, s) {
          let o = [];
          if (n) {
            const a = this.playersByQueriedElement.get(e);
            a && (o = a);
          } else {
            const a = this.playersByElement.get(e);
            if (a) {
              const l = !s || s == fo;
              a.forEach((u) => {
                u.queued || (!l && u.triggerName != i) || o.push(u);
              });
            }
          }
          return (
            (r || i) &&
              (o = o.filter(
                (a) => !((r && r != a.namespaceId) || (i && i != a.triggerName))
              )),
            o
          );
        }
        _beforeAnimationBuild(e, n, r) {
          const s = n.element,
            o = n.isRemovalTransition ? void 0 : e,
            a = n.isRemovalTransition ? void 0 : n.triggerName;
          for (const l of n.timelines) {
            const u = l.element,
              c = u !== s,
              d = Ct(r, u, []);
            this._getPreviousPlayers(u, c, o, a, n.toState).forEach((h) => {
              const p = h.getRealPlayer();
              p.beforeDestroy && p.beforeDestroy(), h.destroy(), d.push(h);
            });
          }
          kr(s, n.fromStyles);
        }
        _buildAnimation(e, n, r, i, s, o) {
          const a = n.triggerName,
            l = n.element,
            u = [],
            c = new Set(),
            d = new Set(),
            f = n.timelines.map((p) => {
              const g = p.element;
              c.add(g);
              const y = g[jt];
              if (y && y.removedBeforeQueried)
                return new uo(p.duration, p.delay);
              const _ = g !== l,
                m = (function TV(t) {
                  const e = [];
                  return HE(t, e), e;
                })((r.get(g) || DV).map((ye) => ye.getRealPlayer())).filter(
                  (ye) => !!ye.element && ye.element === g
                ),
                C = s.get(g),
                S = o.get(g),
                B = pE(0, this._normalizer, 0, p.keyframes, C, S),
                pe = this._buildPlayer(p, B, m);
              if ((p.subTimeline && i && d.add(g), _)) {
                const ye = new lh(e, a, g);
                ye.setRealPlayer(pe), u.push(ye);
              }
              return pe;
            });
          u.forEach((p) => {
            Ct(this.playersByQueriedElement, p.element, []).push(p),
              p.onDone(() =>
                (function bV(t, e, n) {
                  let r;
                  if (t instanceof Map) {
                    if (((r = t.get(e)), r)) {
                      if (r.length) {
                        const i = r.indexOf(n);
                        r.splice(i, 1);
                      }
                      0 == r.length && t.delete(e);
                    }
                  } else if (((r = t[e]), r)) {
                    if (r.length) {
                      const i = r.indexOf(n);
                      r.splice(i, 1);
                    }
                    0 == r.length && delete t[e];
                  }
                  return r;
                })(this.playersByQueriedElement, p.element, p)
              );
          }),
            c.forEach((p) => Ut(p, bE));
          const h = or(f);
          return (
            h.onDestroy(() => {
              c.forEach((p) => ji(p, bE)), wn(l, n.toStyles);
            }),
            d.forEach((p) => {
              Ct(i, p, []).push(h);
            }),
            h
          );
        }
        _buildPlayer(e, n, r) {
          return n.length > 0
            ? this.driver.animate(
                e.element,
                n,
                e.duration,
                e.delay,
                e.easing,
                r
              )
            : new uo(e.duration, e.delay);
        }
      }
      class lh {
        constructor(e, n, r) {
          (this.namespaceId = e),
            (this.triggerName = n),
            (this.element = r),
            (this._player = new uo()),
            (this._containsRealPlayer = !1),
            (this._queuedCallbacks = {}),
            (this.destroyed = !1),
            (this.markedForDestroy = !1),
            (this.disabled = !1),
            (this.queued = !0),
            (this.totalTime = 0);
        }
        setRealPlayer(e) {
          this._containsRealPlayer ||
            ((this._player = e),
            Object.keys(this._queuedCallbacks).forEach((n) => {
              this._queuedCallbacks[n].forEach((r) => Uf(e, n, void 0, r));
            }),
            (this._queuedCallbacks = {}),
            (this._containsRealPlayer = !0),
            this.overrideTotalTime(e.totalTime),
            (this.queued = !1));
        }
        getRealPlayer() {
          return this._player;
        }
        overrideTotalTime(e) {
          this.totalTime = e;
        }
        syncPlayerEvents(e) {
          const n = this._player;
          n.triggerCallback && e.onStart(() => n.triggerCallback("start")),
            e.onDone(() => this.finish()),
            e.onDestroy(() => this.destroy());
        }
        _queueEvent(e, n) {
          Ct(this._queuedCallbacks, e, []).push(n);
        }
        onDone(e) {
          this.queued && this._queueEvent("done", e), this._player.onDone(e);
        }
        onStart(e) {
          this.queued && this._queueEvent("start", e), this._player.onStart(e);
        }
        onDestroy(e) {
          this.queued && this._queueEvent("destroy", e),
            this._player.onDestroy(e);
        }
        init() {
          this._player.init();
        }
        hasStarted() {
          return !this.queued && this._player.hasStarted();
        }
        play() {
          !this.queued && this._player.play();
        }
        pause() {
          !this.queued && this._player.pause();
        }
        restart() {
          !this.queued && this._player.restart();
        }
        finish() {
          this._player.finish();
        }
        destroy() {
          (this.destroyed = !0), this._player.destroy();
        }
        reset() {
          !this.queued && this._player.reset();
        }
        setPosition(e) {
          this.queued || this._player.setPosition(e);
        }
        getPosition() {
          return this.queued ? 0 : this._player.getPosition();
        }
        triggerCallback(e) {
          const n = this._player;
          n.triggerCallback && n.triggerCallback(e);
        }
      }
      function Fl(t) {
        return t && 1 === t.nodeType;
      }
      function BE(t, e) {
        const n = t.style.display;
        return (t.style.display = null != e ? e : "none"), n;
      }
      function jE(t, e, n, r, i) {
        const s = [];
        n.forEach((l) => s.push(BE(l)));
        const o = [];
        r.forEach((l, u) => {
          const c = {};
          l.forEach((d) => {
            const f = (c[d] = e.computeStyle(u, d, i));
            (!f || 0 == f.length) && ((u[jt] = CV), o.push(u));
          }),
            t.set(u, c);
        });
        let a = 0;
        return n.forEach((l) => BE(l, s[a++])), o;
      }
      function UE(t, e) {
        const n = new Map();
        if ((t.forEach((a) => n.set(a, [])), 0 == e.length)) return n;
        const i = new Set(e),
          s = new Map();
        function o(a) {
          if (!a) return 1;
          let l = s.get(a);
          if (l) return l;
          const u = a.parentNode;
          return (l = n.has(u) ? u : i.has(u) ? 1 : o(u)), s.set(a, l), l;
        }
        return (
          e.forEach((a) => {
            const l = o(a);
            1 !== l && n.get(l).push(a);
          }),
          n
        );
      }
      function Ut(t, e) {
        var n;
        null === (n = t.classList) || void 0 === n || n.add(e);
      }
      function ji(t, e) {
        var n;
        null === (n = t.classList) || void 0 === n || n.remove(e);
      }
      function MV(t, e, n) {
        or(n).onDone(() => t.processLeaveNode(e));
      }
      function HE(t, e) {
        for (let n = 0; n < t.length; n++) {
          const r = t[n];
          r instanceof fE ? HE(r.players, e) : e.push(r);
        }
      }
      function $E(t, e, n) {
        const r = n.get(t);
        if (!r) return !1;
        let i = e.get(t);
        return i ? r.forEach((s) => i.add(s)) : e.set(t, r), n.delete(t), !0;
      }
      class Pl {
        constructor(e, n, r) {
          (this.bodyNode = e),
            (this._driver = n),
            (this._normalizer = r),
            (this._triggerCache = {}),
            (this.onRemovalComplete = (i, s) => {}),
            (this._transitionEngine = new wV(e, n, r)),
            (this._timelineEngine = new gV(e, n, r)),
            (this._transitionEngine.onRemovalComplete = (i, s) =>
              this.onRemovalComplete(i, s));
        }
        registerTrigger(e, n, r, i, s) {
          const o = e + "-" + i;
          let a = this._triggerCache[o];
          if (!a) {
            const l = [],
              u = Jf(this._driver, s, l);
            if (l.length)
              throw (function vk(t, e) {
                return new b(3404, Z);
              })();
            (a = (function dV(t, e, n) {
              return new fV(t, e, n);
            })(i, u, this._normalizer)),
              (this._triggerCache[o] = a);
          }
          this._transitionEngine.registerTrigger(n, i, a);
        }
        register(e, n) {
          this._transitionEngine.register(e, n);
        }
        destroy(e, n) {
          this._transitionEngine.destroy(e, n);
        }
        onInsert(e, n, r, i) {
          this._transitionEngine.insertNode(e, n, r, i);
        }
        onRemove(e, n, r, i) {
          this._transitionEngine.removeNode(e, n, i || !1, r);
        }
        disableAnimations(e, n) {
          this._transitionEngine.markElementAsDisabled(e, n);
        }
        process(e, n, r, i) {
          if ("@" == r.charAt(0)) {
            const [s, o] = gE(r);
            this._timelineEngine.command(s, n, o, i);
          } else this._transitionEngine.trigger(e, n, r, i);
        }
        listen(e, n, r, i, s) {
          if ("@" == r.charAt(0)) {
            const [o, a] = gE(r);
            return this._timelineEngine.listen(o, n, a, s);
          }
          return this._transitionEngine.listen(e, n, r, i, s);
        }
        flush(e = -1) {
          this._transitionEngine.flush(e);
        }
        get players() {
          return this._transitionEngine.players.concat(
            this._timelineEngine.players
          );
        }
        whenRenderingDone() {
          return this._transitionEngine.whenRenderingDone();
        }
      }
      let xV = (() => {
        class t {
          constructor(n, r, i) {
            (this._element = n),
              (this._startStyles = r),
              (this._endStyles = i),
              (this._state = 0);
            let s = t.initialStylesByElement.get(n);
            s || t.initialStylesByElement.set(n, (s = {})),
              (this._initialStyles = s);
          }
          start() {
            this._state < 1 &&
              (this._startStyles &&
                wn(this._element, this._startStyles, this._initialStyles),
              (this._state = 1));
          }
          finish() {
            this.start(),
              this._state < 2 &&
                (wn(this._element, this._initialStyles),
                this._endStyles &&
                  (wn(this._element, this._endStyles),
                  (this._endStyles = null)),
                (this._state = 1));
          }
          destroy() {
            this.finish(),
              this._state < 3 &&
                (t.initialStylesByElement.delete(this._element),
                this._startStyles &&
                  (kr(this._element, this._startStyles),
                  (this._endStyles = null)),
                this._endStyles &&
                  (kr(this._element, this._endStyles),
                  (this._endStyles = null)),
                wn(this._element, this._initialStyles),
                (this._state = 3));
          }
        }
        return (t.initialStylesByElement = new WeakMap()), t;
      })();
      function uh(t) {
        let e = null;
        const n = Object.keys(t);
        for (let r = 0; r < n.length; r++) {
          const i = n[r];
          FV(i) && ((e = e || {}), (e[i] = t[i]));
        }
        return e;
      }
      function FV(t) {
        return "display" === t || "position" === t;
      }
      class GE {
        constructor(e, n, r, i) {
          (this.element = e),
            (this.keyframes = n),
            (this.options = r),
            (this._specialStyles = i),
            (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._initialized = !1),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this.time = 0),
            (this.parentPlayer = null),
            (this.currentSnapshot = {}),
            (this._duration = r.duration),
            (this._delay = r.delay || 0),
            (this.time = this._duration + this._delay);
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((e) => e()),
            (this._onDoneFns = []));
        }
        init() {
          this._buildPlayer(), this._preparePlayerBeforeStart();
        }
        _buildPlayer() {
          if (this._initialized) return;
          this._initialized = !0;
          const e = this.keyframes;
          (this.domPlayer = this._triggerWebAnimation(
            this.element,
            e,
            this.options
          )),
            (this._finalKeyframe = e.length ? e[e.length - 1] : {}),
            this.domPlayer.addEventListener("finish", () => this._onFinish());
        }
        _preparePlayerBeforeStart() {
          this._delay ? this._resetDomPlayerState() : this.domPlayer.pause();
        }
        _triggerWebAnimation(e, n, r) {
          return e.animate(n, r);
        }
        onStart(e) {
          this._onStartFns.push(e);
        }
        onDone(e) {
          this._onDoneFns.push(e);
        }
        onDestroy(e) {
          this._onDestroyFns.push(e);
        }
        play() {
          this._buildPlayer(),
            this.hasStarted() ||
              (this._onStartFns.forEach((e) => e()),
              (this._onStartFns = []),
              (this._started = !0),
              this._specialStyles && this._specialStyles.start()),
            this.domPlayer.play();
        }
        pause() {
          this.init(), this.domPlayer.pause();
        }
        finish() {
          this.init(),
            this._specialStyles && this._specialStyles.finish(),
            this._onFinish(),
            this.domPlayer.finish();
        }
        reset() {
          this._resetDomPlayerState(),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._started = !1);
        }
        _resetDomPlayerState() {
          this.domPlayer && this.domPlayer.cancel();
        }
        restart() {
          this.reset(), this.play();
        }
        hasStarted() {
          return this._started;
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this._resetDomPlayerState(),
            this._onFinish(),
            this._specialStyles && this._specialStyles.destroy(),
            this._onDestroyFns.forEach((e) => e()),
            (this._onDestroyFns = []));
        }
        setPosition(e) {
          void 0 === this.domPlayer && this.init(),
            (this.domPlayer.currentTime = e * this.time);
        }
        getPosition() {
          return this.domPlayer.currentTime / this.time;
        }
        get totalTime() {
          return this._delay + this._duration;
        }
        beforeDestroy() {
          const e = {};
          if (this.hasStarted()) {
            const n = this._finalKeyframe;
            Object.keys(n).forEach((r) => {
              "offset" != r &&
                (e[r] = this._finished ? n[r] : IE(this.element, r));
            });
          }
          this.currentSnapshot = e;
        }
        triggerCallback(e) {
          const n = "start" == e ? this._onStartFns : this._onDoneFns;
          n.forEach((r) => r()), (n.length = 0);
        }
      }
      class PV {
        validateStyleProperty(e) {
          return vE(e);
        }
        matchesElement(e, n) {
          return !1;
        }
        containsElement(e, n) {
          return DE(e, n);
        }
        getParentElement(e) {
          return qf(e);
        }
        query(e, n, r) {
          return CE(e, n, r);
        }
        computeStyle(e, n, r) {
          return window.getComputedStyle(e)[n];
        }
        animate(e, n, r, i, s, o = []) {
          const l = {
            duration: r,
            delay: i,
            fill: 0 == i ? "both" : "forwards",
          };
          s && (l.easing = s);
          const u = {},
            c = o.filter((f) => f instanceof GE);
          (function jk(t, e) {
            return 0 === t || 0 === e;
          })(r, i) &&
            c.forEach((f) => {
              let h = f.currentSnapshot;
              Object.keys(h).forEach((p) => (u[p] = h[p]));
            }),
            (n = (function Uk(t, e, n) {
              const r = Object.keys(n);
              if (r.length && e.length) {
                let s = e[0],
                  o = [];
                if (
                  (r.forEach((a) => {
                    s.hasOwnProperty(a) || o.push(a), (s[a] = n[a]);
                  }),
                  o.length)
                )
                  for (var i = 1; i < e.length; i++) {
                    let a = e[i];
                    o.forEach(function (l) {
                      a[l] = IE(t, l);
                    });
                  }
              }
              return e;
            })(e, (n = n.map((f) => ar(f, !1))), u));
          const d = (function NV(t, e) {
            let n = null,
              r = null;
            return (
              Array.isArray(e) && e.length
                ? ((n = uh(e[0])), e.length > 1 && (r = uh(e[e.length - 1])))
                : e && (n = uh(e)),
              n || r ? new xV(t, n, r) : null
            );
          })(e, n);
          return new GE(e, n, l, d);
        }
      }
      let RV = (() => {
        class t extends aE {
          constructor(n, r) {
            super(),
              (this._nextAnimationId = 0),
              (this._renderer = n.createRenderer(r.body, {
                id: "0",
                encapsulation: $t.None,
                styles: [],
                data: { animation: [] },
              }));
          }
          build(n) {
            const r = this._nextAnimationId.toString();
            this._nextAnimationId++;
            const i = Array.isArray(n) ? uE(n) : n;
            return (
              qE(this._renderer, null, r, "register", [i]),
              new OV(r, this._renderer)
            );
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(T(Is), T(lt));
          }),
          (t.ɵprov = G({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class OV extends class qO {} {
        constructor(e, n) {
          super(), (this._id = e), (this._renderer = n);
        }
        create(e, n) {
          return new kV(this._id, e, n || {}, this._renderer);
        }
      }
      class kV {
        constructor(e, n, r, i) {
          (this.id = e),
            (this.element = n),
            (this._renderer = i),
            (this.parentPlayer = null),
            (this._started = !1),
            (this.totalTime = 0),
            this._command("create", r);
        }
        _listen(e, n) {
          return this._renderer.listen(this.element, `@@${this.id}:${e}`, n);
        }
        _command(e, ...n) {
          return qE(this._renderer, this.element, this.id, e, n);
        }
        onDone(e) {
          this._listen("done", e);
        }
        onStart(e) {
          this._listen("start", e);
        }
        onDestroy(e) {
          this._listen("destroy", e);
        }
        init() {
          this._command("init");
        }
        hasStarted() {
          return this._started;
        }
        play() {
          this._command("play"), (this._started = !0);
        }
        pause() {
          this._command("pause");
        }
        restart() {
          this._command("restart");
        }
        finish() {
          this._command("finish");
        }
        destroy() {
          this._command("destroy");
        }
        reset() {
          this._command("reset"), (this._started = !1);
        }
        setPosition(e) {
          this._command("setPosition", e);
        }
        getPosition() {
          var e, n;
          return null !==
            (n =
              null === (e = this._renderer.engine.players[+this.id]) ||
              void 0 === e
                ? void 0
                : e.getPosition()) && void 0 !== n
            ? n
            : 0;
        }
      }
      function qE(t, e, n, r, i) {
        return t.setProperty(e, `@@${n}:${r}`, i);
      }
      const zE = "@.disabled";
      let VV = (() => {
        class t {
          constructor(n, r, i) {
            (this.delegate = n),
              (this.engine = r),
              (this._zone = i),
              (this._currentId = 0),
              (this._microtaskId = 1),
              (this._animationCallbacksBuffer = []),
              (this._rendererCache = new Map()),
              (this._cdRecurDepth = 0),
              (this.promise = Promise.resolve(0)),
              (r.onRemovalComplete = (s, o) => {
                const a = null == o ? void 0 : o.parentNode(s);
                a && o.removeChild(a, s);
              });
          }
          createRenderer(n, r) {
            const s = this.delegate.createRenderer(n, r);
            if (!(n && r && r.data && r.data.animation)) {
              let c = this._rendererCache.get(s);
              return (
                c ||
                  ((c = new WE("", s, this.engine)),
                  this._rendererCache.set(s, c)),
                c
              );
            }
            const o = r.id,
              a = r.id + "-" + this._currentId;
            this._currentId++, this.engine.register(a, n);
            const l = (c) => {
              Array.isArray(c)
                ? c.forEach(l)
                : this.engine.registerTrigger(o, a, n, c.name, c);
            };
            return r.data.animation.forEach(l), new LV(this, a, s, this.engine);
          }
          begin() {
            this._cdRecurDepth++, this.delegate.begin && this.delegate.begin();
          }
          _scheduleCountTask() {
            this.promise.then(() => {
              this._microtaskId++;
            });
          }
          scheduleListenerCallback(n, r, i) {
            n >= 0 && n < this._microtaskId
              ? this._zone.run(() => r(i))
              : (0 == this._animationCallbacksBuffer.length &&
                  Promise.resolve(null).then(() => {
                    this._zone.run(() => {
                      this._animationCallbacksBuffer.forEach((s) => {
                        const [o, a] = s;
                        o(a);
                      }),
                        (this._animationCallbacksBuffer = []);
                    });
                  }),
                this._animationCallbacksBuffer.push([r, i]));
          }
          end() {
            this._cdRecurDepth--,
              0 == this._cdRecurDepth &&
                this._zone.runOutsideAngular(() => {
                  this._scheduleCountTask(),
                    this.engine.flush(this._microtaskId);
                }),
              this.delegate.end && this.delegate.end();
          }
          whenRenderingDone() {
            return this.engine.whenRenderingDone();
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(T(Is), T(Pl), T(Ae));
          }),
          (t.ɵprov = G({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class WE {
        constructor(e, n, r) {
          (this.namespaceId = e),
            (this.delegate = n),
            (this.engine = r),
            (this.destroyNode = this.delegate.destroyNode
              ? (i) => n.destroyNode(i)
              : null);
        }
        get data() {
          return this.delegate.data;
        }
        destroy() {
          this.engine.destroy(this.namespaceId, this.delegate),
            this.delegate.destroy();
        }
        createElement(e, n) {
          return this.delegate.createElement(e, n);
        }
        createComment(e) {
          return this.delegate.createComment(e);
        }
        createText(e) {
          return this.delegate.createText(e);
        }
        appendChild(e, n) {
          this.delegate.appendChild(e, n),
            this.engine.onInsert(this.namespaceId, n, e, !1);
        }
        insertBefore(e, n, r, i = !0) {
          this.delegate.insertBefore(e, n, r),
            this.engine.onInsert(this.namespaceId, n, e, i);
        }
        removeChild(e, n, r) {
          this.engine.onRemove(this.namespaceId, n, this.delegate, r);
        }
        selectRootElement(e, n) {
          return this.delegate.selectRootElement(e, n);
        }
        parentNode(e) {
          return this.delegate.parentNode(e);
        }
        nextSibling(e) {
          return this.delegate.nextSibling(e);
        }
        setAttribute(e, n, r, i) {
          this.delegate.setAttribute(e, n, r, i);
        }
        removeAttribute(e, n, r) {
          this.delegate.removeAttribute(e, n, r);
        }
        addClass(e, n) {
          this.delegate.addClass(e, n);
        }
        removeClass(e, n) {
          this.delegate.removeClass(e, n);
        }
        setStyle(e, n, r, i) {
          this.delegate.setStyle(e, n, r, i);
        }
        removeStyle(e, n, r) {
          this.delegate.removeStyle(e, n, r);
        }
        setProperty(e, n, r) {
          "@" == n.charAt(0) && n == zE
            ? this.disableAnimations(e, !!r)
            : this.delegate.setProperty(e, n, r);
        }
        setValue(e, n) {
          this.delegate.setValue(e, n);
        }
        listen(e, n, r) {
          return this.delegate.listen(e, n, r);
        }
        disableAnimations(e, n) {
          this.engine.disableAnimations(e, n);
        }
      }
      class LV extends WE {
        constructor(e, n, r, i) {
          super(n, r, i), (this.factory = e), (this.namespaceId = n);
        }
        setProperty(e, n, r) {
          "@" == n.charAt(0)
            ? "." == n.charAt(1) && n == zE
              ? this.disableAnimations(e, (r = void 0 === r || !!r))
              : this.engine.process(this.namespaceId, e, n.substr(1), r)
            : this.delegate.setProperty(e, n, r);
        }
        listen(e, n, r) {
          if ("@" == n.charAt(0)) {
            const i = (function BV(t) {
              switch (t) {
                case "body":
                  return document.body;
                case "document":
                  return document;
                case "window":
                  return window;
                default:
                  return t;
              }
            })(e);
            let s = n.substr(1),
              o = "";
            return (
              "@" != s.charAt(0) &&
                ([s, o] = (function jV(t) {
                  const e = t.indexOf(".");
                  return [t.substring(0, e), t.substr(e + 1)];
                })(s)),
              this.engine.listen(this.namespaceId, i, s, o, (a) => {
                this.factory.scheduleListenerCallback(a._data || -1, r, a);
              })
            );
          }
          return this.delegate.listen(e, n, r);
        }
      }
      let UV = (() => {
        class t extends Pl {
          constructor(n, r, i) {
            super(n.body, r, i);
          }
          ngOnDestroy() {
            this.flush();
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(T(lt), T(zf), T(rh));
          }),
          (t.ɵprov = G({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const QE = new q("AnimationModuleType"),
        KE = [
          { provide: aE, useClass: RV },
          {
            provide: rh,
            useFactory: function HV() {
              return new oV();
            },
          },
          { provide: Pl, useClass: UV },
          {
            provide: Is,
            useFactory: function $V(t, e, n) {
              return new VV(t, e, n);
            },
            deps: [$a, Pl, Ae],
          },
        ],
        ZE = [
          { provide: zf, useFactory: () => new PV() },
          { provide: QE, useValue: "BrowserAnimations" },
          ...KE,
        ],
        GV = [
          { provide: zf, useClass: EE },
          { provide: QE, useValue: "NoopAnimations" },
          ...KE,
        ];
      let qV = (() => {
          class t {
            static withConfig(n) {
              return { ngModule: t, providers: n.disableAnimations ? GV : ZE };
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵmod = Gt({ type: t })),
            (t.ɵinj = Tt({ providers: ZE, imports: [Gv] })),
            t
          );
        })(),
        zV = (() => {
          class t {}
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵmod = Gt({ type: t, bootstrap: [ZO] })),
            (t.ɵinj = Tt({ providers: [pf], imports: [[Gv, GO, IO, qV]] })),
            t
          );
        })();
      (function O1() {
        rv = !1;
      })(),
        Jx()
          .bootstrapModule(zV)
          .catch((t) => console.error(t));
    },
  },
  (ce) => {
    ce((ce.s = 687));
  },
]);
