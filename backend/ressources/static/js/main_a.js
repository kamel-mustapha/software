"use strict";
(self.webpackChunkfrontend = self.webpackChunkfrontend || []).push([
  [179],
  {
    636: () => {
      function Y(e) {
        return "function" == typeof e;
      }
      function _o(e) {
        const n = e((r) => {
          Error.call(r), (r.stack = new Error().stack);
        });
        return (
          (n.prototype = Object.create(Error.prototype)),
          (n.prototype.constructor = n),
          n
        );
      }
      const vo = _o(
        (e) =>
          function (n) {
            e(this),
              (this.message = n
                ? `${n.length} errors occurred during unsubscription:\n${n
                    .map((r, o) => `${o + 1}) ${r.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = n);
          }
      );
      function Cr(e, t) {
        if (e) {
          const n = e.indexOf(t);
          0 <= n && e.splice(n, 1);
        }
      }
      class gt {
        constructor(t) {
          (this.initialTeardown = t),
            (this.closed = !1),
            (this._parentage = null),
            (this._teardowns = null);
        }
        unsubscribe() {
          let t;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: n } = this;
            if (n)
              if (((this._parentage = null), Array.isArray(n)))
                for (const i of n) i.remove(this);
              else n.remove(this);
            const { initialTeardown: r } = this;
            if (Y(r))
              try {
                r();
              } catch (i) {
                t = i instanceof vo ? i.errors : [i];
              }
            const { _teardowns: o } = this;
            if (o) {
              this._teardowns = null;
              for (const i of o)
                try {
                  Xl(i);
                } catch (s) {
                  (t = null != t ? t : []),
                    s instanceof vo ? (t = [...t, ...s.errors]) : t.push(s);
                }
            }
            if (t) throw new vo(t);
          }
        }
        add(t) {
          var n;
          if (t && t !== this)
            if (this.closed) Xl(t);
            else {
              if (t instanceof gt) {
                if (t.closed || t._hasParent(this)) return;
                t._addParent(this);
              }
              (this._teardowns =
                null !== (n = this._teardowns) && void 0 !== n ? n : []).push(
                t
              );
            }
        }
        _hasParent(t) {
          const { _parentage: n } = this;
          return n === t || (Array.isArray(n) && n.includes(t));
        }
        _addParent(t) {
          const { _parentage: n } = this;
          this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
        }
        _removeParent(t) {
          const { _parentage: n } = this;
          n === t ? (this._parentage = null) : Array.isArray(n) && Cr(n, t);
        }
        remove(t) {
          const { _teardowns: n } = this;
          n && Cr(n, t), t instanceof gt && t._removeParent(this);
        }
      }
      gt.EMPTY = (() => {
        const e = new gt();
        return (e.closed = !0), e;
      })();
      const Jl = gt.EMPTY;
      function Yl(e) {
        return (
          e instanceof gt ||
          (e && "closed" in e && Y(e.remove) && Y(e.add) && Y(e.unsubscribe))
        );
      }
      function Xl(e) {
        Y(e) ? e() : e.unsubscribe();
      }
      const sn = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        Co = {
          setTimeout(...e) {
            const { delegate: t } = Co;
            return ((null == t ? void 0 : t.setTimeout) || setTimeout)(...e);
          },
          clearTimeout(e) {
            const { delegate: t } = Co;
            return ((null == t ? void 0 : t.clearTimeout) || clearTimeout)(e);
          },
          delegate: void 0,
        };
      function ec(e) {
        Co.setTimeout(() => {
          const { onUnhandledError: t } = sn;
          if (!t) throw e;
          t(e);
        });
      }
      function tc() {}
      const nD = as("C", void 0, void 0);
      function as(e, t, n) {
        return { kind: e, value: t, error: n };
      }
      let an = null;
      function Eo(e) {
        if (sn.useDeprecatedSynchronousErrorHandling) {
          const t = !an;
          if ((t && (an = { errorThrown: !1, error: null }), e(), t)) {
            const { errorThrown: n, error: r } = an;
            if (((an = null), n)) throw r;
          }
        } else e();
      }
      class us extends gt {
        constructor(t) {
          super(),
            (this.isStopped = !1),
            t
              ? ((this.destination = t), Yl(t) && t.add(this))
              : (this.destination = lD);
        }
        static create(t, n, r) {
          return new wo(t, n, r);
        }
        next(t) {
          this.isStopped
            ? cs(
                (function oD(e) {
                  return as("N", e, void 0);
                })(t),
                this
              )
            : this._next(t);
        }
        error(t) {
          this.isStopped
            ? cs(
                (function rD(e) {
                  return as("E", void 0, e);
                })(t),
                this
              )
            : ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped
            ? cs(nD, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          try {
            this.destination.error(t);
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
      const sD = Function.prototype.bind;
      function ls(e, t) {
        return sD.call(e, t);
      }
      class aD {
        constructor(t) {
          this.partialObserver = t;
        }
        next(t) {
          const { partialObserver: n } = this;
          if (n.next)
            try {
              n.next(t);
            } catch (r) {
              bo(r);
            }
        }
        error(t) {
          const { partialObserver: n } = this;
          if (n.error)
            try {
              n.error(t);
            } catch (r) {
              bo(r);
            }
          else bo(t);
        }
        complete() {
          const { partialObserver: t } = this;
          if (t.complete)
            try {
              t.complete();
            } catch (n) {
              bo(n);
            }
        }
      }
      class wo extends us {
        constructor(t, n, r) {
          let o;
          if ((super(), Y(t) || !t))
            o = {
              next: null != t ? t : void 0,
              error: null != n ? n : void 0,
              complete: null != r ? r : void 0,
            };
          else {
            let i;
            this && sn.useDeprecatedNextContext
              ? ((i = Object.create(t)),
                (i.unsubscribe = () => this.unsubscribe()),
                (o = {
                  next: t.next && ls(t.next, i),
                  error: t.error && ls(t.error, i),
                  complete: t.complete && ls(t.complete, i),
                }))
              : (o = t);
          }
          this.destination = new aD(o);
        }
      }
      function bo(e) {
        sn.useDeprecatedSynchronousErrorHandling
          ? (function iD(e) {
              sn.useDeprecatedSynchronousErrorHandling &&
                an &&
                ((an.errorThrown = !0), (an.error = e));
            })(e)
          : ec(e);
      }
      function cs(e, t) {
        const { onStoppedNotification: n } = sn;
        n && Co.setTimeout(() => n(e, t));
      }
      const lD = {
          closed: !0,
          next: tc,
          error: function uD(e) {
            throw e;
          },
          complete: tc,
        },
        ds =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function nc(e) {
        return e;
      }
      let ye = (() => {
        class e {
          constructor(n) {
            n && (this._subscribe = n);
          }
          lift(n) {
            const r = new e();
            return (r.source = this), (r.operator = n), r;
          }
          subscribe(n, r, o) {
            const i = (function dD(e) {
              return (
                (e && e instanceof us) ||
                ((function cD(e) {
                  return e && Y(e.next) && Y(e.error) && Y(e.complete);
                })(e) &&
                  Yl(e))
              );
            })(n)
              ? n
              : new wo(n, r, o);
            return (
              Eo(() => {
                const { operator: s, source: a } = this;
                i.add(
                  s
                    ? s.call(i, a)
                    : a
                    ? this._subscribe(i)
                    : this._trySubscribe(i)
                );
              }),
              i
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
            return new (r = oc(r))((o, i) => {
              const s = new wo({
                next: (a) => {
                  try {
                    n(a);
                  } catch (u) {
                    i(u), s.unsubscribe();
                  }
                },
                error: i,
                complete: o,
              });
              this.subscribe(s);
            });
          }
          _subscribe(n) {
            var r;
            return null === (r = this.source) || void 0 === r
              ? void 0
              : r.subscribe(n);
          }
          [ds]() {
            return this;
          }
          pipe(...n) {
            return (function rc(e) {
              return 0 === e.length
                ? nc
                : 1 === e.length
                ? e[0]
                : function (n) {
                    return e.reduce((r, o) => o(r), n);
                  };
            })(n)(this);
          }
          toPromise(n) {
            return new (n = oc(n))((r, o) => {
              let i;
              this.subscribe(
                (s) => (i = s),
                (s) => o(s),
                () => r(i)
              );
            });
          }
        }
        return (e.create = (t) => new e(t)), e;
      })();
      function oc(e) {
        var t;
        return null !== (t = null != e ? e : sn.Promise) && void 0 !== t
          ? t
          : Promise;
      }
      const fD = _o(
        (e) =>
          function () {
            e(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          }
      );
      let fs = (() => {
        class e extends ye {
          constructor() {
            super(),
              (this.closed = !1),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(n) {
            const r = new ic(this, this);
            return (r.operator = n), r;
          }
          _throwIfClosed() {
            if (this.closed) throw new fD();
          }
          next(n) {
            Eo(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                const r = this.observers.slice();
                for (const o of r) o.next(n);
              }
            });
          }
          error(n) {
            Eo(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = n);
                const { observers: r } = this;
                for (; r.length; ) r.shift().error(n);
              }
            });
          }
          complete() {
            Eo(() => {
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
            const { hasError: r, isStopped: o, observers: i } = this;
            return r || o ? Jl : (i.push(n), new gt(() => Cr(i, n)));
          }
          _checkFinalizedStatuses(n) {
            const { hasError: r, thrownError: o, isStopped: i } = this;
            r ? n.error(o) : i && n.complete();
          }
          asObservable() {
            const n = new ye();
            return (n.source = this), n;
          }
        }
        return (e.create = (t, n) => new ic(t, n)), e;
      })();
      class ic extends fs {
        constructor(t, n) {
          super(), (this.destination = t), (this.source = n);
        }
        next(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.next) ||
            void 0 === r ||
            r.call(n, t);
        }
        error(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.error) ||
            void 0 === r ||
            r.call(n, t);
        }
        complete() {
          var t, n;
          null ===
            (n =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.complete) ||
            void 0 === n ||
            n.call(t);
        }
        _subscribe(t) {
          var n, r;
          return null !==
            (r =
              null === (n = this.source) || void 0 === n
                ? void 0
                : n.subscribe(t)) && void 0 !== r
            ? r
            : Jl;
        }
      }
      function un(e) {
        return (t) => {
          if (
            (function hD(e) {
              return Y(null == e ? void 0 : e.lift);
            })(t)
          )
            return t.lift(function (n) {
              try {
                return e(n, this);
              } catch (r) {
                this.error(r);
              }
            });
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
      function ln(e, t, n, r, o) {
        return new pD(e, t, n, r, o);
      }
      class pD extends us {
        constructor(t, n, r, o, i, s) {
          super(t),
            (this.onFinalize = i),
            (this.shouldUnsubscribe = s),
            (this._next = n
              ? function (a) {
                  try {
                    n(a);
                  } catch (u) {
                    t.error(u);
                  }
                }
              : super._next),
            (this._error = o
              ? function (a) {
                  try {
                    o(a);
                  } catch (u) {
                    t.error(u);
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
                    t.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var t;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: n } = this;
            super.unsubscribe(),
              !n &&
                (null === (t = this.onFinalize) ||
                  void 0 === t ||
                  t.call(this));
          }
        }
      }
      function cn(e, t) {
        return un((n, r) => {
          let o = 0;
          n.subscribe(
            ln(r, (i) => {
              r.next(e.call(t, i, o++));
            })
          );
        });
      }
      function dn(e) {
        return this instanceof dn ? ((this.v = e), this) : new dn(e);
      }
      function yD(e, t, n) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var o,
          r = n.apply(e, t || []),
          i = [];
        return (
          (o = {}),
          s("next"),
          s("throw"),
          s("return"),
          (o[Symbol.asyncIterator] = function () {
            return this;
          }),
          o
        );
        function s(f) {
          r[f] &&
            (o[f] = function (h) {
              return new Promise(function (p, m) {
                i.push([f, h, p, m]) > 1 || a(f, h);
              });
            });
        }
        function a(f, h) {
          try {
            !(function u(f) {
              f.value instanceof dn
                ? Promise.resolve(f.value.v).then(l, c)
                : d(i[0][2], f);
            })(r[f](h));
          } catch (p) {
            d(i[0][3], p);
          }
        }
        function l(f) {
          a("next", f);
        }
        function c(f) {
          a("throw", f);
        }
        function d(f, h) {
          f(h), i.shift(), i.length && a(i[0][0], i[0][1]);
        }
      }
      function DD(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var n,
          t = e[Symbol.asyncIterator];
        return t
          ? t.call(e)
          : ((e = (function uc(e) {
              var t = "function" == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                r = 0;
              if (n) return n.call(e);
              if (e && "number" == typeof e.length)
                return {
                  next: function () {
                    return (
                      e && r >= e.length && (e = void 0),
                      { value: e && e[r++], done: !e }
                    );
                  },
                };
              throw new TypeError(
                t
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            })(e)),
            (n = {}),
            r("next"),
            r("throw"),
            r("return"),
            (n[Symbol.asyncIterator] = function () {
              return this;
            }),
            n);
        function r(i) {
          n[i] =
            e[i] &&
            function (s) {
              return new Promise(function (a, u) {
                !(function o(i, s, a, u) {
                  Promise.resolve(u).then(function (l) {
                    i({ value: l, done: a });
                  }, s);
                })(a, u, (s = e[i](s)).done, s.value);
              });
            };
        }
      }
      const lc = (e) =>
        e && "number" == typeof e.length && "function" != typeof e;
      function cc(e) {
        return Y(null == e ? void 0 : e.then);
      }
      function dc(e) {
        return Y(e[ds]);
      }
      function fc(e) {
        return (
          Symbol.asyncIterator &&
          Y(null == e ? void 0 : e[Symbol.asyncIterator])
        );
      }
      function hc(e) {
        return new TypeError(
          `You provided ${
            null !== e && "object" == typeof e ? "an invalid object" : `'${e}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const pc = (function vD() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      })();
      function gc(e) {
        return Y(null == e ? void 0 : e[pc]);
      }
      function mc(e) {
        return yD(this, arguments, function* () {
          const n = e.getReader();
          try {
            for (;;) {
              const { value: r, done: o } = yield dn(n.read());
              if (o) return yield dn(void 0);
              yield yield dn(r);
            }
          } finally {
            n.releaseLock();
          }
        });
      }
      function yc(e) {
        return Y(null == e ? void 0 : e.getReader);
      }
      function fn(e) {
        if (e instanceof ye) return e;
        if (null != e) {
          if (dc(e))
            return (function CD(e) {
              return new ye((t) => {
                const n = e[ds]();
                if (Y(n.subscribe)) return n.subscribe(t);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              });
            })(e);
          if (lc(e))
            return (function ED(e) {
              return new ye((t) => {
                for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
                t.complete();
              });
            })(e);
          if (cc(e))
            return (function wD(e) {
              return new ye((t) => {
                e.then(
                  (n) => {
                    t.closed || (t.next(n), t.complete());
                  },
                  (n) => t.error(n)
                ).then(null, ec);
              });
            })(e);
          if (fc(e)) return Dc(e);
          if (gc(e))
            return (function bD(e) {
              return new ye((t) => {
                for (const n of e) if ((t.next(n), t.closed)) return;
                t.complete();
              });
            })(e);
          if (yc(e))
            return (function MD(e) {
              return Dc(mc(e));
            })(e);
        }
        throw hc(e);
      }
      function Dc(e) {
        return new ye((t) => {
          (function AD(e, t) {
            var n, r, o, i;
            return (function gD(e, t, n, r) {
              return new (n || (n = Promise))(function (i, s) {
                function a(c) {
                  try {
                    l(r.next(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function u(c) {
                  try {
                    l(r.throw(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function l(c) {
                  c.done
                    ? i(c.value)
                    : (function o(i) {
                        return i instanceof n
                          ? i
                          : new n(function (s) {
                              s(i);
                            });
                      })(c.value).then(a, u);
                }
                l((r = r.apply(e, t || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (n = DD(e); !(r = yield n.next()).done; )
                  if ((t.next(r.value), t.closed)) return;
              } catch (s) {
                o = { error: s };
              } finally {
                try {
                  r && !r.done && (i = n.return) && (yield i.call(n));
                } finally {
                  if (o) throw o.error;
                }
              }
              t.complete();
            });
          })(e, t).catch((n) => t.error(n));
        });
      }
      function $t(e, t, n, r = 0, o = !1) {
        const i = t.schedule(function () {
          n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe();
        }, r);
        if ((e.add(i), !o)) return i;
      }
      function Mo(e, t, n = 1 / 0) {
        return Y(t)
          ? Mo((r, o) => cn((i, s) => t(r, i, o, s))(fn(e(r, o))), n)
          : ("number" == typeof t && (n = t),
            un((r, o) =>
              (function ID(e, t, n, r, o, i, s, a) {
                const u = [];
                let l = 0,
                  c = 0,
                  d = !1;
                const f = () => {
                    d && !u.length && !l && t.complete();
                  },
                  h = (m) => (l < r ? p(m) : u.push(m)),
                  p = (m) => {
                    i && t.next(m), l++;
                    let _ = !1;
                    fn(n(m, c++)).subscribe(
                      ln(
                        t,
                        (D) => {
                          null == o || o(D), i ? h(D) : t.next(D);
                        },
                        () => {
                          _ = !0;
                        },
                        void 0,
                        () => {
                          if (_)
                            try {
                              for (l--; u.length && l < r; ) {
                                const D = u.shift();
                                s ? $t(t, s, () => p(D)) : p(D);
                              }
                              f();
                            } catch (D) {
                              t.error(D);
                            }
                        }
                      )
                    );
                  };
                return (
                  e.subscribe(
                    ln(t, h, () => {
                      (d = !0), f();
                    })
                  ),
                  () => {
                    null == a || a();
                  }
                );
              })(r, o, e, n)
            ));
      }
      const ps = new ye((e) => e.complete());
      function gs(e) {
        return e[e.length - 1];
      }
      function _c(e) {
        return (function FD(e) {
          return e && Y(e.schedule);
        })(gs(e))
          ? e.pop()
          : void 0;
      }
      function vc(e, t = 0) {
        return un((n, r) => {
          n.subscribe(
            ln(
              r,
              (o) => $t(r, e, () => r.next(o), t),
              () => $t(r, e, () => r.complete(), t),
              (o) => $t(r, e, () => r.error(o), t)
            )
          );
        });
      }
      function Cc(e, t = 0) {
        return un((n, r) => {
          r.add(e.schedule(() => n.subscribe(r), t));
        });
      }
      function Ec(e, t) {
        if (!e) throw new Error("Iterable cannot be null");
        return new ye((n) => {
          $t(n, t, () => {
            const r = e[Symbol.asyncIterator]();
            $t(
              n,
              t,
              () => {
                r.next().then((o) => {
                  o.done ? n.complete() : n.next(o.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function Ao(e, t) {
        return t
          ? (function LD(e, t) {
              if (null != e) {
                if (dc(e))
                  return (function PD(e, t) {
                    return fn(e).pipe(Cc(t), vc(t));
                  })(e, t);
                if (lc(e))
                  return (function RD(e, t) {
                    return new ye((n) => {
                      let r = 0;
                      return t.schedule(function () {
                        r === e.length
                          ? n.complete()
                          : (n.next(e[r++]), n.closed || this.schedule());
                      });
                    });
                  })(e, t);
                if (cc(e))
                  return (function OD(e, t) {
                    return fn(e).pipe(Cc(t), vc(t));
                  })(e, t);
                if (fc(e)) return Ec(e, t);
                if (gc(e))
                  return (function VD(e, t) {
                    return new ye((n) => {
                      let r;
                      return (
                        $t(n, t, () => {
                          (r = e[pc]()),
                            $t(
                              n,
                              t,
                              () => {
                                let o, i;
                                try {
                                  ({ value: o, done: i } = r.next());
                                } catch (s) {
                                  return void n.error(s);
                                }
                                i ? n.complete() : n.next(o);
                              },
                              0,
                              !0
                            );
                        }),
                        () => Y(null == r ? void 0 : r.return) && r.return()
                      );
                    });
                  })(e, t);
                if (yc(e))
                  return (function kD(e, t) {
                    return Ec(mc(e), t);
                  })(e, t);
              }
              throw hc(e);
            })(e, t)
          : fn(e);
      }
      function ms(e, t, ...n) {
        return !0 === t
          ? (e(), null)
          : !1 === t
          ? null
          : t(...n)
              .pipe(
                (function HD(e) {
                  return e <= 0
                    ? () => ps
                    : un((t, n) => {
                        let r = 0;
                        t.subscribe(
                          ln(n, (o) => {
                            ++r <= e && (n.next(o), e <= r && n.complete());
                          })
                        );
                      });
                })(1)
              )
              .subscribe(() => e());
      }
      function z(e) {
        for (let t in e) if (e[t] === z) return t;
        throw Error("Could not find renamed property on target object.");
      }
      function ys(e, t) {
        for (const n in t)
          t.hasOwnProperty(n) && !e.hasOwnProperty(n) && (e[n] = t[n]);
      }
      function $(e) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) return "[" + e.map($).join(", ") + "]";
        if (null == e) return "" + e;
        if (e.overriddenName) return `${e.overriddenName}`;
        if (e.name) return `${e.name}`;
        const t = e.toString();
        if (null == t) return "" + t;
        const n = t.indexOf("\n");
        return -1 === n ? t : t.substring(0, n);
      }
      function Ds(e, t) {
        return null == e || "" === e
          ? null === t
            ? ""
            : t
          : null == t || "" === t
          ? e
          : e + " " + t;
      }
      const $D = z({ __forward_ref__: z });
      function Q(e) {
        return (
          (e.__forward_ref__ = Q),
          (e.toString = function () {
            return $(this());
          }),
          e
        );
      }
      function x(e) {
        return wc(e) ? e() : e;
      }
      function wc(e) {
        return (
          "function" == typeof e &&
          e.hasOwnProperty($D) &&
          e.__forward_ref__ === Q
        );
      }
      class B extends Error {
        constructor(t, n) {
          super(
            (function _s(e, t) {
              return `NG0${Math.abs(e)}${t ? ": " + t : ""}`;
            })(t, n)
          ),
            (this.code = t);
        }
      }
      function Ae(e) {
        return "function" == typeof e
          ? e.name || e.toString()
          : "object" == typeof e && null != e && "function" == typeof e.type
          ? e.type.name || e.type.toString()
          : (function I(e) {
              return "string" == typeof e ? e : null == e ? "" : String(e);
            })(e);
      }
      function Io(e, t) {
        const n = t ? ` in ${t}` : "";
        throw new B(-201, `No provider for ${Ae(e)} found${n}`);
      }
      function Le(e, t) {
        null == e &&
          (function J(e, t, n, r) {
            throw new Error(
              `ASSERTION ERROR: ${e}` +
                (null == r ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`)
            );
          })(t, e, null, "!=");
      }
      function U(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        };
      }
      function et(e) {
        return { providers: e.providers || [], imports: e.imports || [] };
      }
      function vs(e) {
        return bc(e, So) || bc(e, Ac);
      }
      function bc(e, t) {
        return e.hasOwnProperty(t) ? e[t] : null;
      }
      function Mc(e) {
        return e && (e.hasOwnProperty(Cs) || e.hasOwnProperty(ZD))
          ? e[Cs]
          : null;
      }
      const So = z({ ɵprov: z }),
        Cs = z({ ɵinj: z }),
        Ac = z({ ngInjectableDef: z }),
        ZD = z({ ngInjectorDef: z });
      var N = (() => (
        ((N = N || {})[(N.Default = 0)] = "Default"),
        (N[(N.Host = 1)] = "Host"),
        (N[(N.Self = 2)] = "Self"),
        (N[(N.SkipSelf = 4)] = "SkipSelf"),
        (N[(N.Optional = 8)] = "Optional"),
        N
      ))();
      let Es;
      function Ut(e) {
        const t = Es;
        return (Es = e), t;
      }
      function Ic(e, t, n) {
        const r = vs(e);
        return r && "root" == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & N.Optional
          ? null
          : void 0 !== t
          ? t
          : void Io($(e), "Injector");
      }
      function Gt(e) {
        return { toString: e }.toString();
      }
      var tt = (() => (
          ((tt = tt || {})[(tt.OnPush = 0)] = "OnPush"),
          (tt[(tt.Default = 1)] = "Default"),
          tt
        ))(),
        mt = (() => {
          return (
            ((e = mt || (mt = {}))[(e.Emulated = 0)] = "Emulated"),
            (e[(e.None = 2)] = "None"),
            (e[(e.ShadowDom = 3)] = "ShadowDom"),
            mt
          );
          var e;
        })();
      const JD = "undefined" != typeof globalThis && globalThis,
        YD = "undefined" != typeof window && window,
        XD =
          "undefined" != typeof self &&
          "undefined" != typeof WorkerGlobalScope &&
          self instanceof WorkerGlobalScope &&
          self,
        q = JD || ("undefined" != typeof global && global) || YD || XD,
        In = {},
        W = [],
        To = z({ ɵcmp: z }),
        ws = z({ ɵdir: z }),
        bs = z({ ɵpipe: z }),
        Sc = z({ ɵmod: z }),
        xt = z({ ɵfac: z }),
        Er = z({ __NG_ELEMENT_ID__: z });
      let e_ = 0;
      function Ms(e) {
        return Gt(() => {
          const n = {},
            r = {
              type: e.type,
              providersResolver: null,
              decls: e.decls,
              vars: e.vars,
              factory: null,
              template: e.template || null,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              hostBindings: e.hostBindings || null,
              hostVars: e.hostVars || 0,
              hostAttrs: e.hostAttrs || null,
              contentQueries: e.contentQueries || null,
              declaredInputs: n,
              inputs: null,
              outputs: null,
              exportAs: e.exportAs || null,
              onPush: e.changeDetection === tt.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              selectors: e.selectors || W,
              viewQuery: e.viewQuery || null,
              features: e.features || null,
              data: e.data || {},
              encapsulation: e.encapsulation || mt.Emulated,
              id: "c",
              styles: e.styles || W,
              _: null,
              setInput: null,
              schemas: e.schemas || null,
              tView: null,
            },
            o = e.directives,
            i = e.features,
            s = e.pipes;
          return (
            (r.id += e_++),
            (r.inputs = Nc(e.inputs, n)),
            (r.outputs = Nc(e.outputs)),
            i && i.forEach((a) => a(r)),
            (r.directiveDefs = o
              ? () => ("function" == typeof o ? o() : o).map(Tc)
              : null),
            (r.pipeDefs = s
              ? () => ("function" == typeof s ? s() : s).map(Fc)
              : null),
            r
          );
        });
      }
      function Tc(e) {
        return (
          De(e) ||
          (function qt(e) {
            return e[ws] || null;
          })(e)
        );
      }
      function Fc(e) {
        return (function hn(e) {
          return e[bs] || null;
        })(e);
      }
      const xc = {};
      function yt(e) {
        return Gt(() => {
          const t = {
            type: e.type,
            bootstrap: e.bootstrap || W,
            declarations: e.declarations || W,
            imports: e.imports || W,
            exports: e.exports || W,
            transitiveCompileScopes: null,
            schemas: e.schemas || null,
            id: e.id || null,
          };
          return null != e.id && (xc[e.id] = e.type), t;
        });
      }
      function Nc(e, t) {
        if (null == e) return In;
        const n = {};
        for (const r in e)
          if (e.hasOwnProperty(r)) {
            let o = e[r],
              i = o;
            Array.isArray(o) && ((i = o[1]), (o = o[0])),
              (n[o] = r),
              t && (t[o] = i);
          }
        return n;
      }
      const S = Ms;
      function De(e) {
        return e[To] || null;
      }
      function ze(e, t) {
        const n = e[Sc] || null;
        if (!n && !0 === t)
          throw new Error(`Type ${$(e)} does not have '\u0275mod' property.`);
        return n;
      }
      const P = 11,
        Z = 20;
      function Dt(e) {
        return Array.isArray(e) && "object" == typeof e[1];
      }
      function rt(e) {
        return Array.isArray(e) && !0 === e[1];
      }
      function Ss(e) {
        return 0 != (8 & e.flags);
      }
      function Po(e) {
        return 2 == (2 & e.flags);
      }
      function Oo(e) {
        return 1 == (1 & e.flags);
      }
      function ot(e) {
        return null !== e.template;
      }
      function s_(e) {
        return 0 != (512 & e[2]);
      }
      function yn(e, t) {
        return e.hasOwnProperty(xt) ? e[xt] : null;
      }
      class l_ {
        constructor(t, n, r) {
          (this.previousValue = t),
            (this.currentValue = n),
            (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function Nt() {
        return Oc;
      }
      function Oc(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = d_), c_;
      }
      function c_() {
        const e = Vc(this),
          t = null == e ? void 0 : e.current;
        if (t) {
          const n = e.previous;
          if (n === In) e.previous = t;
          else for (let r in t) n[r] = t[r];
          (e.current = null), this.ngOnChanges(t);
        }
      }
      function d_(e, t, n, r) {
        const o =
            Vc(e) ||
            (function f_(e, t) {
              return (e[Rc] = t);
            })(e, { previous: In, current: null }),
          i = o.current || (o.current = {}),
          s = o.previous,
          a = this.declaredInputs[n],
          u = s[a];
        (i[a] = new l_(u && u.currentValue, t, s === In)), (e[r] = t);
      }
      Nt.ngInherit = !0;
      const Rc = "__ngSimpleChanges__";
      function Vc(e) {
        return e[Rc] || null;
      }
      let Ps;
      function ne(e) {
        return !!e.listen;
      }
      const kc = {
        createRenderer: (e, t) =>
          (function Os() {
            return void 0 !== Ps
              ? Ps
              : "undefined" != typeof document
              ? document
              : void 0;
          })(),
      };
      function ae(e) {
        for (; Array.isArray(e); ) e = e[0];
        return e;
      }
      function Ze(e, t) {
        return ae(t[e.index]);
      }
      function Rs(e, t) {
        return e.data[t];
      }
      function He(e, t) {
        const n = t[e];
        return Dt(n) ? n : n[0];
      }
      function Vs(e) {
        return 128 == (128 & e[2]);
      }
      function zt(e, t) {
        return null == t ? null : e[t];
      }
      function Bc(e) {
        e[18] = 0;
      }
      function ks(e, t) {
        e[5] += t;
        let n = e,
          r = e[3];
        for (
          ;
          null !== r && ((1 === t && 1 === n[5]) || (-1 === t && 0 === n[5]));

        )
          (r[5] += t), (n = r), (r = r[3]);
      }
      const A = {
        lFrame: Qc(null),
        bindingsEnabled: !0,
        isInCheckNoChangesMode: !1,
      };
      function Hc() {
        return A.bindingsEnabled;
      }
      function y() {
        return A.lFrame.lView;
      }
      function H() {
        return A.lFrame.tView;
      }
      function fe() {
        let e = $c();
        for (; null !== e && 64 === e.type; ) e = e.parent;
        return e;
      }
      function $c() {
        return A.lFrame.currentTNode;
      }
      function _t(e, t) {
        const n = A.lFrame;
        (n.currentTNode = e), (n.isParent = t);
      }
      function Ls() {
        return A.lFrame.isParent;
      }
      function Vo() {
        return A.isInCheckNoChangesMode;
      }
      function ko(e) {
        A.isInCheckNoChangesMode = e;
      }
      function T_(e, t) {
        const n = A.lFrame;
        (n.bindingIndex = n.bindingRootIndex = e), Hs(t);
      }
      function Hs(e) {
        A.lFrame.currentDirectiveIndex = e;
      }
      function $s(e) {
        A.lFrame.currentQueryIndex = e;
      }
      function x_(e) {
        const t = e[1];
        return 2 === t.type ? t.declTNode : 1 === t.type ? e[6] : null;
      }
      function zc(e, t, n) {
        if (n & N.SkipSelf) {
          let o = t,
            i = e;
          for (
            ;
            !((o = o.parent),
            null !== o ||
              n & N.Host ||
              ((o = x_(i)), null === o || ((i = i[15]), 10 & o.type)));

          );
          if (null === o) return !1;
          (t = o), (e = i);
        }
        const r = (A.lFrame = Wc());
        return (r.currentTNode = t), (r.lView = e), !0;
      }
      function Lo(e) {
        const t = Wc(),
          n = e[1];
        (A.lFrame = t),
          (t.currentTNode = n.firstChild),
          (t.lView = e),
          (t.tView = n),
          (t.contextLView = e),
          (t.bindingIndex = n.bindingStartIndex),
          (t.inI18n = !1);
      }
      function Wc() {
        const e = A.lFrame,
          t = null === e ? null : e.child;
        return null === t ? Qc(e) : t;
      }
      function Qc(e) {
        const t = {
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
          parent: e,
          child: null,
          inI18n: !1,
        };
        return null !== e && (e.child = t), t;
      }
      function Zc() {
        const e = A.lFrame;
        return (
          (A.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        );
      }
      const Kc = Zc;
      function Bo() {
        const e = Zc();
        (e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0);
      }
      function Se() {
        return A.lFrame.selectedIndex;
      }
      function Wt(e) {
        A.lFrame.selectedIndex = e;
      }
      function Ho(e, t) {
        for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
          const i = e.data[n].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: u,
              ngAfterViewChecked: l,
              ngOnDestroy: c,
            } = i;
          s && (e.contentHooks || (e.contentHooks = [])).push(-n, s),
            a &&
              ((e.contentHooks || (e.contentHooks = [])).push(n, a),
              (e.contentCheckHooks || (e.contentCheckHooks = [])).push(n, a)),
            u && (e.viewHooks || (e.viewHooks = [])).push(-n, u),
            l &&
              ((e.viewHooks || (e.viewHooks = [])).push(n, l),
              (e.viewCheckHooks || (e.viewCheckHooks = [])).push(n, l)),
            null != c && (e.destroyHooks || (e.destroyHooks = [])).push(n, c);
        }
      }
      function jo(e, t, n) {
        Jc(e, t, 3, n);
      }
      function $o(e, t, n, r) {
        (3 & e[2]) === n && Jc(e, t, n, r);
      }
      function Us(e, t) {
        let n = e[2];
        (3 & n) === t && ((n &= 2047), (n += 1), (e[2] = n));
      }
      function Jc(e, t, n, r) {
        const i = null != r ? r : -1,
          s = t.length - 1;
        let a = 0;
        for (let u = void 0 !== r ? 65535 & e[18] : 0; u < s; u++)
          if ("number" == typeof t[u + 1]) {
            if (((a = t[u]), null != r && a >= r)) break;
          } else
            t[u] < 0 && (e[18] += 65536),
              (a < i || -1 == i) &&
                (H_(e, n, t, u), (e[18] = (4294901760 & e[18]) + u + 2)),
              u++;
      }
      function H_(e, t, n, r) {
        const o = n[r] < 0,
          i = n[r + 1],
          a = e[o ? -n[r] : n[r]];
        if (o) {
          if (e[2] >> 11 < e[18] >> 16 && (3 & e[2]) === t) {
            e[2] += 2048;
            try {
              i.call(a);
            } finally {
            }
          }
        } else
          try {
            i.call(a);
          } finally {
          }
      }
      class Ir {
        constructor(t, n, r) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = n),
            (this.injectImpl = r);
        }
      }
      function Uo(e, t, n) {
        const r = ne(e);
        let o = 0;
        for (; o < n.length; ) {
          const i = n[o];
          if ("number" == typeof i) {
            if (0 !== i) break;
            o++;
            const s = n[o++],
              a = n[o++],
              u = n[o++];
            r ? e.setAttribute(t, a, u, s) : t.setAttributeNS(s, a, u);
          } else {
            const s = i,
              a = n[++o];
            qs(s)
              ? r && e.setProperty(t, s, a)
              : r
              ? e.setAttribute(t, s, a)
              : t.setAttribute(s, a),
              o++;
          }
        }
        return o;
      }
      function Yc(e) {
        return 3 === e || 4 === e || 6 === e;
      }
      function qs(e) {
        return 64 === e.charCodeAt(0);
      }
      function Go(e, t) {
        if (null !== t && 0 !== t.length)
          if (null === e || 0 === e.length) e = t.slice();
          else {
            let n = -1;
            for (let r = 0; r < t.length; r++) {
              const o = t[r];
              "number" == typeof o
                ? (n = o)
                : 0 === n ||
                  Xc(e, n, o, null, -1 === n || 2 === n ? t[++r] : null);
            }
          }
        return e;
      }
      function Xc(e, t, n, r, o) {
        let i = 0,
          s = e.length;
        if (-1 === t) s = -1;
        else
          for (; i < e.length; ) {
            const a = e[i++];
            if ("number" == typeof a) {
              if (a === t) {
                s = -1;
                break;
              }
              if (a > t) {
                s = i - 1;
                break;
              }
            }
          }
        for (; i < e.length; ) {
          const a = e[i];
          if ("number" == typeof a) break;
          if (a === n) {
            if (null === r) return void (null !== o && (e[i + 1] = o));
            if (r === e[i + 1]) return void (e[i + 2] = o);
          }
          i++, null !== r && i++, null !== o && i++;
        }
        -1 !== s && (e.splice(s, 0, t), (i = s + 1)),
          e.splice(i++, 0, n),
          null !== r && e.splice(i++, 0, r),
          null !== o && e.splice(i++, 0, o);
      }
      function ed(e) {
        return -1 !== e;
      }
      function On(e) {
        return 32767 & e;
      }
      function Rn(e, t) {
        let n = (function q_(e) {
            return e >> 16;
          })(e),
          r = t;
        for (; n > 0; ) (r = r[15]), n--;
        return r;
      }
      let zs = !0;
      function qo(e) {
        const t = zs;
        return (zs = e), t;
      }
      let z_ = 0;
      function Tr(e, t) {
        const n = Qs(e, t);
        if (-1 !== n) return n;
        const r = t[1];
        r.firstCreatePass &&
          ((e.injectorIndex = t.length),
          Ws(r.data, e),
          Ws(t, null),
          Ws(r.blueprint, null));
        const o = zo(e, t),
          i = e.injectorIndex;
        if (ed(o)) {
          const s = On(o),
            a = Rn(o, t),
            u = a[1].data;
          for (let l = 0; l < 8; l++) t[i + l] = a[s + l] | u[s + l];
        }
        return (t[i + 8] = o), i;
      }
      function Ws(e, t) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
      }
      function Qs(e, t) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === t[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex;
      }
      function zo(e, t) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex;
        let n = 0,
          r = null,
          o = t;
        for (; null !== o; ) {
          const i = o[1],
            s = i.type;
          if (((r = 2 === s ? i.declTNode : 1 === s ? o[6] : null), null === r))
            return -1;
          if ((n++, (o = o[15]), -1 !== r.injectorIndex))
            return r.injectorIndex | (n << 16);
        }
        return -1;
      }
      function Wo(e, t, n) {
        !(function W_(e, t, n) {
          let r;
          "string" == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(Er) && (r = n[Er]),
            null == r && (r = n[Er] = z_++);
          const o = 255 & r;
          t.data[e + (o >> 5)] |= 1 << o;
        })(e, t, n);
      }
      function rd(e, t, n) {
        if (n & N.Optional) return e;
        Io(t, "NodeInjector");
      }
      function od(e, t, n, r) {
        if (
          (n & N.Optional && void 0 === r && (r = null),
          0 == (n & (N.Self | N.Host)))
        ) {
          const o = e[9],
            i = Ut(void 0);
          try {
            return o ? o.get(t, r, n & N.Optional) : Ic(t, r, n & N.Optional);
          } finally {
            Ut(i);
          }
        }
        return rd(r, t, n);
      }
      function id(e, t, n, r = N.Default, o) {
        if (null !== e) {
          const i = (function J_(e) {
            if ("string" == typeof e) return e.charCodeAt(0) || 0;
            const t = e.hasOwnProperty(Er) ? e[Er] : void 0;
            return "number" == typeof t ? (t >= 0 ? 255 & t : Z_) : t;
          })(n);
          if ("function" == typeof i) {
            if (!zc(t, e, r)) return r & N.Host ? rd(o, n, r) : od(t, n, r, o);
            try {
              const s = i(r);
              if (null != s || r & N.Optional) return s;
              Io(n);
            } finally {
              Kc();
            }
          } else if ("number" == typeof i) {
            let s = null,
              a = Qs(e, t),
              u = -1,
              l = r & N.Host ? t[16][6] : null;
            for (
              (-1 === a || r & N.SkipSelf) &&
              ((u = -1 === a ? zo(e, t) : t[a + 8]),
              -1 !== u && ud(r, !1)
                ? ((s = t[1]), (a = On(u)), (t = Rn(u, t)))
                : (a = -1));
              -1 !== a;

            ) {
              const c = t[1];
              if (ad(i, a, c.data)) {
                const d = K_(a, t, n, s, r, l);
                if (d !== sd) return d;
              }
              (u = t[a + 8]),
                -1 !== u && ud(r, t[1].data[a + 8] === l) && ad(i, a, t)
                  ? ((s = c), (a = On(u)), (t = Rn(u, t)))
                  : (a = -1);
            }
          }
        }
        return od(t, n, r, o);
      }
      const sd = {};
      function Z_() {
        return new Vn(fe(), y());
      }
      function K_(e, t, n, r, o, i) {
        const s = t[1],
          a = s.data[e + 8],
          c = (function Qo(e, t, n, r, o) {
            const i = e.providerIndexes,
              s = t.data,
              a = 1048575 & i,
              u = e.directiveStart,
              c = i >> 20,
              f = o ? a + c : e.directiveEnd;
            for (let h = r ? a : a + c; h < f; h++) {
              const p = s[h];
              if ((h < u && n === p) || (h >= u && p.type === n)) return h;
            }
            if (o) {
              const h = s[u];
              if (h && ot(h) && h.type === n) return u;
            }
            return null;
          })(
            a,
            s,
            n,
            null == r ? Po(a) && zs : r != s && 0 != (3 & a.type),
            o & N.Host && i === a
          );
        return null !== c ? Fr(t, s, c, a) : sd;
      }
      function Fr(e, t, n, r) {
        let o = e[n];
        const i = t.data;
        if (
          (function j_(e) {
            return e instanceof Ir;
          })(o)
        ) {
          const s = o;
          s.resolving &&
            (function UD(e, t) {
              const n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
              throw new B(
                -200,
                `Circular dependency in DI detected for ${e}${n}`
              );
            })(Ae(i[n]));
          const a = qo(s.canSeeViewProviders);
          s.resolving = !0;
          const u = s.injectImpl ? Ut(s.injectImpl) : null;
          zc(e, r, N.Default);
          try {
            (o = e[n] = s.factory(void 0, i, e, r)),
              t.firstCreatePass &&
                n >= r.directiveStart &&
                (function B_(e, t, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: o,
                    ngDoCheck: i,
                  } = t.type.prototype;
                  if (r) {
                    const s = Oc(t);
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(e, s),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(e, s);
                  }
                  o &&
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - e, o),
                    i &&
                      ((n.preOrderHooks || (n.preOrderHooks = [])).push(e, i),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(e, i));
                })(n, i[n], t);
          } finally {
            null !== u && Ut(u), qo(a), (s.resolving = !1), Kc();
          }
        }
        return o;
      }
      function ad(e, t, n) {
        return !!(n[t + (e >> 5)] & (1 << e));
      }
      function ud(e, t) {
        return !(e & N.Self || (e & N.Host && t));
      }
      class Vn {
        constructor(t, n) {
          (this._tNode = t), (this._lView = n);
        }
        get(t, n, r) {
          return id(this._tNode, this._lView, t, r, n);
        }
      }
      function Zs(e) {
        return wc(e)
          ? () => {
              const t = Zs(x(e));
              return t && t();
            }
          : yn(e);
      }
      const Ln = "__parameters__";
      function Hn(e, t, n) {
        return Gt(() => {
          const r = (function Js(e) {
            return function (...n) {
              if (e) {
                const r = e(...n);
                for (const o in r) this[o] = r[o];
              }
            };
          })(t);
          function o(...i) {
            if (this instanceof o) return r.apply(this, i), this;
            const s = new o(...i);
            return (a.annotation = s), a;
            function a(u, l, c) {
              const d = u.hasOwnProperty(Ln)
                ? u[Ln]
                : Object.defineProperty(u, Ln, { value: [] })[Ln];
              for (; d.length <= c; ) d.push(null);
              return (d[c] = d[c] || []).push(s), u;
            }
          }
          return (
            n && (o.prototype = Object.create(n.prototype)),
            (o.prototype.ngMetadataName = e),
            (o.annotationCls = o),
            o
          );
        });
      }
      class V {
        constructor(t, n) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof n
              ? (this.__NG_ELEMENT_ID__ = n)
              : void 0 !== n &&
                (this.ɵprov = U({
                  token: this,
                  providedIn: n.providedIn || "root",
                  factory: n.factory,
                }));
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      function vt(e, t) {
        e.forEach((n) => (Array.isArray(n) ? vt(n, t) : t(n)));
      }
      function cd(e, t, n) {
        t >= e.length ? e.push(n) : e.splice(t, 0, n);
      }
      function Zo(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
      }
      function je(e, t, n) {
        let r = jn(e, t);
        return (
          r >= 0
            ? (e[1 | r] = n)
            : ((r = ~r),
              (function tv(e, t, n, r) {
                let o = e.length;
                if (o == t) e.push(n, r);
                else if (1 === o) e.push(r, e[0]), (e[0] = n);
                else {
                  for (o--, e.push(e[o - 1], e[o]); o > t; )
                    (e[o] = e[o - 2]), o--;
                  (e[t] = n), (e[t + 1] = r);
                }
              })(e, r, t, n)),
          r
        );
      }
      function Xs(e, t) {
        const n = jn(e, t);
        if (n >= 0) return e[1 | n];
      }
      function jn(e, t) {
        return (function hd(e, t, n) {
          let r = 0,
            o = e.length >> n;
          for (; o !== r; ) {
            const i = r + ((o - r) >> 1),
              s = e[i << n];
            if (t === s) return i << n;
            s > t ? (o = i) : (r = i + 1);
          }
          return ~(o << n);
        })(e, t, 1);
      }
      const Or = {},
        ta = "__NG_DI_FLAG__",
        Jo = "ngTempTokenPath",
        uv = /\n/gm,
        gd = "__source",
        cv = z({ provide: String, useValue: z });
      let Rr;
      function md(e) {
        const t = Rr;
        return (Rr = e), t;
      }
      function dv(e, t = N.Default) {
        if (void 0 === Rr) throw new B(203, "");
        return null === Rr
          ? Ic(e, void 0, t)
          : Rr.get(e, t & N.Optional ? null : void 0, t);
      }
      function L(e, t = N.Default) {
        return (
          (function KD() {
            return Es;
          })() || dv
        )(x(e), t);
      }
      function na(e) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
          const r = x(e[n]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new B(900, "");
            let o,
              i = N.Default;
            for (let s = 0; s < r.length; s++) {
              const a = r[s],
                u = fv(a);
              "number" == typeof u
                ? -1 === u
                  ? (o = a.token)
                  : (i |= u)
                : (o = a);
            }
            t.push(L(o, i));
          } else t.push(L(r));
        }
        return t;
      }
      function Vr(e, t) {
        return (e[ta] = t), (e.prototype[ta] = t), e;
      }
      function fv(e) {
        return e[ta];
      }
      const Yo = Vr(
          Hn("Inject", (e) => ({ token: e })),
          -1
        ),
        $n = Vr(Hn("Optional"), 8),
        kr = Vr(Hn("SkipSelf"), 4);
      const Vd = "__ngContext__";
      function Ce(e, t) {
        e[Vd] = t;
      }
      function da(e) {
        const t = (function $r(e) {
          return e[Vd] || null;
        })(e);
        return t ? (Array.isArray(t) ? t : t.lView) : null;
      }
      function ha(e) {
        return e.ngOriginalError;
      }
      function oC(e, ...t) {
        e.error(...t);
      }
      class qn {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const n = this._findOriginalError(t),
            r = (function rC(e) {
              return (e && e.ngErrorLogger) || oC;
            })(t);
          r(this._console, "ERROR", t),
            n && r(this._console, "ORIGINAL ERROR", n);
        }
        _findOriginalError(t) {
          let n = t && ha(t);
          for (; n && ha(n); ) n = ha(n);
          return n || null;
        }
      }
      const jd = (() =>
        (
          ("undefined" != typeof requestAnimationFrame &&
            requestAnimationFrame) ||
          setTimeout
        ).bind(q))();
      function Et(e) {
        return e instanceof Function ? e() : e;
      }
      var $e = (() => (
        (($e = $e || {})[($e.Important = 1)] = "Important"),
        ($e[($e.DashCase = 2)] = "DashCase"),
        $e
      ))();
      function ga(e, t) {
        return undefined(e, t);
      }
      function Ur(e) {
        const t = e[3];
        return rt(t) ? t[3] : t;
      }
      function ma(e) {
        return zd(e[13]);
      }
      function ya(e) {
        return zd(e[4]);
      }
      function zd(e) {
        for (; null !== e && !rt(e); ) e = e[4];
        return e;
      }
      function Wn(e, t, n, r, o) {
        if (null != r) {
          let i,
            s = !1;
          rt(r) ? (i = r) : Dt(r) && ((s = !0), (r = r[0]));
          const a = ae(r);
          0 === e && null !== n
            ? null == o
              ? Yd(t, n, a)
              : Dn(t, n, a, o || null, !0)
            : 1 === e && null !== n
            ? Dn(t, n, a, o || null, !0)
            : 2 === e
            ? (function sf(e, t, n) {
                const r = oi(e, t);
                r &&
                  (function IC(e, t, n, r) {
                    ne(e) ? e.removeChild(t, n, r) : t.removeChild(n);
                  })(e, r, t, n);
              })(t, a, s)
            : 3 === e && t.destroyNode(a),
            null != i &&
              (function FC(e, t, n, r, o) {
                const i = n[7];
                i !== ae(n) && Wn(t, e, r, i, o);
                for (let a = 10; a < n.length; a++) {
                  const u = n[a];
                  Gr(u[1], u, e, t, r, i);
                }
              })(t, e, i, n, o);
        }
      }
      function _a(e, t, n) {
        if (ne(e)) return e.createElement(t, n);
        {
          const r =
            null !== n
              ? (function m_(e) {
                  const t = e.toLowerCase();
                  return "svg" === t
                    ? "http://www.w3.org/2000/svg"
                    : "math" === t
                    ? "http://www.w3.org/1998/MathML/"
                    : null;
                })(n)
              : null;
          return null === r ? e.createElement(t) : e.createElementNS(r, t);
        }
      }
      function Qd(e, t) {
        const n = e[9],
          r = n.indexOf(t),
          o = t[3];
        1024 & t[2] && ((t[2] &= -1025), ks(o, -1)), n.splice(r, 1);
      }
      function va(e, t) {
        if (e.length <= 10) return;
        const n = 10 + t,
          r = e[n];
        if (r) {
          const o = r[17];
          null !== o && o !== e && Qd(o, r), t > 0 && (e[n - 1][4] = r[4]);
          const i = Zo(e, 10 + t);
          !(function _C(e, t) {
            Gr(e, t, t[P], 2, null, null), (t[0] = null), (t[6] = null);
          })(r[1], r);
          const s = i[19];
          null !== s && s.detachView(i[1]),
            (r[3] = null),
            (r[4] = null),
            (r[2] &= -129);
        }
        return r;
      }
      function Zd(e, t) {
        if (!(256 & t[2])) {
          const n = t[P];
          ne(n) && n.destroyNode && Gr(e, t, n, 3, null, null),
            (function EC(e) {
              let t = e[13];
              if (!t) return Ca(e[1], e);
              for (; t; ) {
                let n = null;
                if (Dt(t)) n = t[13];
                else {
                  const r = t[10];
                  r && (n = r);
                }
                if (!n) {
                  for (; t && !t[4] && t !== e; )
                    Dt(t) && Ca(t[1], t), (t = t[3]);
                  null === t && (t = e), Dt(t) && Ca(t[1], t), (n = t && t[4]);
                }
                t = n;
              }
            })(t);
        }
      }
      function Ca(e, t) {
        if (!(256 & t[2])) {
          (t[2] &= -129),
            (t[2] |= 256),
            (function AC(e, t) {
              let n;
              if (null != e && null != (n = e.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const o = t[n[r]];
                  if (!(o instanceof Ir)) {
                    const i = n[r + 1];
                    if (Array.isArray(i))
                      for (let s = 0; s < i.length; s += 2) {
                        const a = o[i[s]],
                          u = i[s + 1];
                        try {
                          u.call(a);
                        } finally {
                        }
                      }
                    else
                      try {
                        i.call(o);
                      } finally {
                      }
                  }
                }
            })(e, t),
            (function MC(e, t) {
              const n = e.cleanup,
                r = t[7];
              let o = -1;
              if (null !== n)
                for (let i = 0; i < n.length - 1; i += 2)
                  if ("string" == typeof n[i]) {
                    const s = n[i + 1],
                      a = "function" == typeof s ? s(t) : ae(t[s]),
                      u = r[(o = n[i + 2])],
                      l = n[i + 3];
                    "boolean" == typeof l
                      ? a.removeEventListener(n[i], u, l)
                      : l >= 0
                      ? r[(o = l)]()
                      : r[(o = -l)].unsubscribe(),
                      (i += 2);
                  } else {
                    const s = r[(o = n[i + 1])];
                    n[i].call(s);
                  }
              if (null !== r) {
                for (let i = o + 1; i < r.length; i++) r[i]();
                t[7] = null;
              }
            })(e, t),
            1 === t[1].type && ne(t[P]) && t[P].destroy();
          const n = t[17];
          if (null !== n && rt(t[3])) {
            n !== t[3] && Qd(n, t);
            const r = t[19];
            null !== r && r.detachView(e);
          }
        }
      }
      function Kd(e, t, n) {
        return (function Jd(e, t, n) {
          let r = t;
          for (; null !== r && 40 & r.type; ) r = (t = r).parent;
          if (null === r) return n[0];
          if (2 & r.flags) {
            const o = e.data[r.directiveStart].encapsulation;
            if (o === mt.None || o === mt.Emulated) return null;
          }
          return Ze(r, n);
        })(e, t.parent, n);
      }
      function Dn(e, t, n, r, o) {
        ne(e) ? e.insertBefore(t, n, r, o) : t.insertBefore(n, r, o);
      }
      function Yd(e, t, n) {
        ne(e) ? e.appendChild(t, n) : t.appendChild(n);
      }
      function Xd(e, t, n, r, o) {
        null !== r ? Dn(e, t, n, r, o) : Yd(e, t, n);
      }
      function oi(e, t) {
        return ne(e) ? e.parentNode(t) : t.parentNode;
      }
      let nf = function tf(e, t, n) {
        return 40 & e.type ? Ze(e, n) : null;
      };
      function ii(e, t, n, r) {
        const o = Kd(e, r, t),
          i = t[P],
          a = (function ef(e, t, n) {
            return nf(e, t, n);
          })(r.parent || t[6], r, t);
        if (null != o)
          if (Array.isArray(n))
            for (let u = 0; u < n.length; u++) Xd(i, o, n[u], a, !1);
          else Xd(i, o, n, a, !1);
      }
      function si(e, t) {
        if (null !== t) {
          const n = t.type;
          if (3 & n) return Ze(t, e);
          if (4 & n) return wa(-1, e[t.index]);
          if (8 & n) {
            const r = t.child;
            if (null !== r) return si(e, r);
            {
              const o = e[t.index];
              return rt(o) ? wa(-1, o) : ae(o);
            }
          }
          if (32 & n) return ga(t, e)() || ae(e[t.index]);
          {
            const r = of(e, t);
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : si(Ur(e[16]), r)
              : si(e, t.next);
          }
        }
        return null;
      }
      function of(e, t) {
        return null !== t ? e[16][6].projection[t.projection] : null;
      }
      function wa(e, t) {
        const n = 10 + e + 1;
        if (n < t.length) {
          const r = t[n],
            o = r[1].firstChild;
          if (null !== o) return si(r, o);
        }
        return t[7];
      }
      function ba(e, t, n, r, o, i, s) {
        for (; null != n; ) {
          const a = r[n.index],
            u = n.type;
          if (
            (s && 0 === t && (a && Ce(ae(a), r), (n.flags |= 4)),
            64 != (64 & n.flags))
          )
            if (8 & u) ba(e, t, n.child, r, o, i, !1), Wn(t, e, o, a, i);
            else if (32 & u) {
              const l = ga(n, r);
              let c;
              for (; (c = l()); ) Wn(t, e, o, c, i);
              Wn(t, e, o, a, i);
            } else 16 & u ? af(e, t, r, n, o, i) : Wn(t, e, o, a, i);
          n = s ? n.projectionNext : n.next;
        }
      }
      function Gr(e, t, n, r, o, i) {
        ba(n, r, e.firstChild, t, o, i, !1);
      }
      function af(e, t, n, r, o, i) {
        const s = n[16],
          u = s[6].projection[r.projection];
        if (Array.isArray(u))
          for (let l = 0; l < u.length; l++) Wn(t, e, o, u[l], i);
        else ba(e, t, u, s[3], o, i, !0);
      }
      function uf(e, t, n) {
        ne(e) ? e.setAttribute(t, "style", n) : (t.style.cssText = n);
      }
      function Ma(e, t, n) {
        ne(e)
          ? "" === n
            ? e.removeAttribute(t, "class")
            : e.setAttribute(t, "class", n)
          : (t.className = n);
      }
      function lf(e, t, n) {
        let r = e.length;
        for (;;) {
          const o = e.indexOf(t, n);
          if (-1 === o) return o;
          if (0 === o || e.charCodeAt(o - 1) <= 32) {
            const i = t.length;
            if (o + i === r || e.charCodeAt(o + i) <= 32) return o;
          }
          n = o + 1;
        }
      }
      const cf = "ng-template";
      function NC(e, t, n) {
        let r = 0;
        for (; r < e.length; ) {
          let o = e[r++];
          if (n && "class" === o) {
            if (((o = e[r]), -1 !== lf(o.toLowerCase(), t, 0))) return !0;
          } else if (1 === o) {
            for (; r < e.length && "string" == typeof (o = e[r++]); )
              if (o.toLowerCase() === t) return !0;
            return !1;
          }
        }
        return !1;
      }
      function df(e) {
        return 4 === e.type && e.value !== cf;
      }
      function PC(e, t, n) {
        return t === (4 !== e.type || n ? e.value : cf);
      }
      function OC(e, t, n) {
        let r = 4;
        const o = e.attrs || [],
          i = (function kC(e) {
            for (let t = 0; t < e.length; t++) if (Yc(e[t])) return t;
            return e.length;
          })(o);
        let s = !1;
        for (let a = 0; a < t.length; a++) {
          const u = t[a];
          if ("number" != typeof u) {
            if (!s)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== u && !PC(e, u, n)) || ("" === u && 1 === t.length))
                ) {
                  if (it(r)) return !1;
                  s = !0;
                }
              } else {
                const l = 8 & r ? u : t[++a];
                if (8 & r && null !== e.attrs) {
                  if (!NC(e.attrs, l, n)) {
                    if (it(r)) return !1;
                    s = !0;
                  }
                  continue;
                }
                const d = RC(8 & r ? "class" : u, o, df(e), n);
                if (-1 === d) {
                  if (it(r)) return !1;
                  s = !0;
                  continue;
                }
                if ("" !== l) {
                  let f;
                  f = d > i ? "" : o[d + 1].toLowerCase();
                  const h = 8 & r ? f : null;
                  if ((h && -1 !== lf(h, l, 0)) || (2 & r && l !== f)) {
                    if (it(r)) return !1;
                    s = !0;
                  }
                }
              }
          } else {
            if (!s && !it(r) && !it(u)) return !1;
            if (s && it(u)) continue;
            (s = !1), (r = u | (1 & r));
          }
        }
        return it(r) || s;
      }
      function it(e) {
        return 0 == (1 & e);
      }
      function RC(e, t, n, r) {
        if (null === t) return -1;
        let o = 0;
        if (r || !n) {
          let i = !1;
          for (; o < t.length; ) {
            const s = t[o];
            if (s === e) return o;
            if (3 === s || 6 === s) i = !0;
            else {
              if (1 === s || 2 === s) {
                let a = t[++o];
                for (; "string" == typeof a; ) a = t[++o];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                o += 4;
                continue;
              }
            }
            o += i ? 1 : 2;
          }
          return -1;
        }
        return (function LC(e, t) {
          let n = e.indexOf(4);
          if (n > -1)
            for (n++; n < e.length; ) {
              const r = e[n];
              if ("number" == typeof r) return -1;
              if (r === t) return n;
              n++;
            }
          return -1;
        })(t, e);
      }
      function ff(e, t, n = !1) {
        for (let r = 0; r < t.length; r++) if (OC(e, t[r], n)) return !0;
        return !1;
      }
      function hf(e, t) {
        return e ? ":not(" + t.trim() + ")" : t;
      }
      function HC(e) {
        let t = e[0],
          n = 1,
          r = 2,
          o = "",
          i = !1;
        for (; n < e.length; ) {
          let s = e[n];
          if ("string" == typeof s)
            if (2 & r) {
              const a = e[++n];
              o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & r ? (o += "." + s) : 4 & r && (o += " " + s);
          else
            "" !== o && !it(s) && ((t += hf(i, o)), (o = "")),
              (r = s),
              (i = i || !it(r));
          n++;
        }
        return "" !== o && (t += hf(i, o)), t;
      }
      const T = {};
      function Qn(e) {
        pf(H(), y(), Se() + e, Vo());
      }
      function pf(e, t, n, r) {
        if (!r)
          if (3 == (3 & t[2])) {
            const i = e.preOrderCheckHooks;
            null !== i && jo(t, i, n);
          } else {
            const i = e.preOrderHooks;
            null !== i && $o(t, i, 0, n);
          }
        Wt(n);
      }
      function ai(e, t) {
        return (e << 17) | (t << 2);
      }
      function st(e) {
        return (e >> 17) & 32767;
      }
      function Aa(e) {
        return 2 | e;
      }
      function Rt(e) {
        return (131068 & e) >> 2;
      }
      function Ia(e, t) {
        return (-131069 & e) | (t << 2);
      }
      function Sa(e) {
        return 1 | e;
      }
      function Mf(e, t) {
        const n = e.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const o = n[r],
              i = n[r + 1];
            if (-1 !== i) {
              const s = e.data[i];
              $s(o), s.contentQueries(2, t[i], i);
            }
          }
      }
      function qr(e, t, n, r, o, i, s, a, u, l) {
        const c = t.blueprint.slice();
        return (
          (c[0] = o),
          (c[2] = 140 | r),
          Bc(c),
          (c[3] = c[15] = e),
          (c[8] = n),
          (c[10] = s || (e && e[10])),
          (c[P] = a || (e && e[P])),
          (c[12] = u || (e && e[12]) || null),
          (c[9] = l || (e && e[9]) || null),
          (c[6] = i),
          (c[16] = 2 == t.type ? e[16] : c),
          c
        );
      }
      function Zn(e, t, n, r, o) {
        let i = e.data[t];
        if (null === i)
          (i = (function ka(e, t, n, r, o) {
            const i = $c(),
              s = Ls(),
              u = (e.data[t] = (function oE(e, t, n, r, o, i) {
                return {
                  type: n,
                  index: r,
                  insertBeforeIndex: null,
                  injectorIndex: t ? t.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: o,
                  attrs: i,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tViews: null,
                  next: null,
                  projectionNext: null,
                  child: null,
                  parent: t,
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
              })(0, s ? i : i && i.parent, n, t, r, o));
            return (
              null === e.firstChild && (e.firstChild = u),
              null !== i &&
                (s
                  ? null == i.child && null !== u.parent && (i.child = u)
                  : null === i.next && (i.next = u)),
              u
            );
          })(e, t, n, r, o)),
            (function S_() {
              return A.lFrame.inI18n;
            })() && (i.flags |= 64);
        else if (64 & i.type) {
          (i.type = n), (i.value = r), (i.attrs = o);
          const s = (function Ar() {
            const e = A.lFrame,
              t = e.currentTNode;
            return e.isParent ? t : t.parent;
          })();
          i.injectorIndex = null === s ? -1 : s.injectorIndex;
        }
        return _t(i, !0), i;
      }
      function Kn(e, t, n, r) {
        if (0 === n) return -1;
        const o = t.length;
        for (let i = 0; i < n; i++)
          t.push(r), e.blueprint.push(r), e.data.push(null);
        return o;
      }
      function zr(e, t, n) {
        Lo(t);
        try {
          const r = e.viewQuery;
          null !== r && za(1, r, n);
          const o = e.template;
          null !== o && Af(e, t, o, 1, n),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && Mf(e, t),
            e.staticViewQueries && za(2, e.viewQuery, n);
          const i = e.components;
          null !== i &&
            (function tE(e, t) {
              for (let n = 0; n < t.length; n++) EE(e, t[n]);
            })(t, i);
        } catch (r) {
          throw (
            (e.firstCreatePass &&
              ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
            r)
          );
        } finally {
          (t[2] &= -5), Bo();
        }
      }
      function Jn(e, t, n, r) {
        const o = t[2];
        if (256 == (256 & o)) return;
        Lo(t);
        const i = Vo();
        try {
          Bc(t),
            (function Uc(e) {
              return (A.lFrame.bindingIndex = e);
            })(e.bindingStartIndex),
            null !== n && Af(e, t, n, 2, r);
          const s = 3 == (3 & o);
          if (!i)
            if (s) {
              const l = e.preOrderCheckHooks;
              null !== l && jo(t, l, null);
            } else {
              const l = e.preOrderHooks;
              null !== l && $o(t, l, 0, null), Us(t, 0);
            }
          if (
            ((function vE(e) {
              for (let t = ma(e); null !== t; t = ya(t)) {
                if (!t[2]) continue;
                const n = t[9];
                for (let r = 0; r < n.length; r++) {
                  const o = n[r],
                    i = o[3];
                  0 == (1024 & o[2]) && ks(i, 1), (o[2] |= 1024);
                }
              }
            })(t),
            (function _E(e) {
              for (let t = ma(e); null !== t; t = ya(t))
                for (let n = 10; n < t.length; n++) {
                  const r = t[n],
                    o = r[1];
                  Vs(r) && Jn(o, r, o.template, r[8]);
                }
            })(t),
            null !== e.contentQueries && Mf(e, t),
            !i)
          )
            if (s) {
              const l = e.contentCheckHooks;
              null !== l && jo(t, l);
            } else {
              const l = e.contentHooks;
              null !== l && $o(t, l, 1), Us(t, 1);
            }
          !(function XC(e, t) {
            const n = e.hostBindingOpCodes;
            if (null !== n)
              try {
                for (let r = 0; r < n.length; r++) {
                  const o = n[r];
                  if (o < 0) Wt(~o);
                  else {
                    const i = o,
                      s = n[++r],
                      a = n[++r];
                    T_(s, i), a(2, t[i]);
                  }
                }
              } finally {
                Wt(-1);
              }
          })(e, t);
          const a = e.components;
          null !== a &&
            (function eE(e, t) {
              for (let n = 0; n < t.length; n++) CE(e, t[n]);
            })(t, a);
          const u = e.viewQuery;
          if ((null !== u && za(2, u, r), !i))
            if (s) {
              const l = e.viewCheckHooks;
              null !== l && jo(t, l);
            } else {
              const l = e.viewHooks;
              null !== l && $o(t, l, 2), Us(t, 2);
            }
          !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
            i || (t[2] &= -73),
            1024 & t[2] && ((t[2] &= -1025), ks(t[3], -1));
        } finally {
          Bo();
        }
      }
      function nE(e, t, n, r) {
        const o = t[10],
          i = !Vo(),
          s = (function Lc(e) {
            return 4 == (4 & e[2]);
          })(t);
        try {
          i && !s && o.begin && o.begin(), s && zr(e, t, r), Jn(e, t, n, r);
        } finally {
          i && !s && o.end && o.end();
        }
      }
      function Af(e, t, n, r, o) {
        const i = Se(),
          s = 2 & r;
        try {
          Wt(-1), s && t.length > Z && pf(e, t, Z, Vo()), n(r, o);
        } finally {
          Wt(i);
        }
      }
      function La(e, t, n) {
        !Hc() ||
          ((function dE(e, t, n, r) {
            const o = n.directiveStart,
              i = n.directiveEnd;
            e.firstCreatePass || Tr(n, t), Ce(r, t);
            const s = n.initialInputs;
            for (let a = o; a < i; a++) {
              const u = e.data[a],
                l = ot(u);
              l && mE(t, n, u);
              const c = Fr(t, e, a, n);
              Ce(c, t),
                null !== s && yE(0, a - o, c, u, 0, s),
                l && (He(n.index, t)[8] = c);
            }
          })(e, t, n, Ze(n, t)),
          128 == (128 & n.flags) &&
            (function fE(e, t, n) {
              const r = n.directiveStart,
                o = n.directiveEnd,
                s = n.index,
                a = (function F_() {
                  return A.lFrame.currentDirectiveIndex;
                })();
              try {
                Wt(s);
                for (let u = r; u < o; u++) {
                  const l = e.data[u],
                    c = t[u];
                  Hs(u),
                    (null !== l.hostBindings ||
                      0 !== l.hostVars ||
                      null !== l.hostAttrs) &&
                      Rf(l, c);
                }
              } finally {
                Wt(-1), Hs(a);
              }
            })(e, t, n));
      }
      function Ba(e, t, n = Ze) {
        const r = t.localNames;
        if (null !== r) {
          let o = t.index + 1;
          for (let i = 0; i < r.length; i += 2) {
            const s = r[i + 1],
              a = -1 === s ? n(t, e) : e[s];
            e[o++] = a;
          }
        }
      }
      function Sf(e) {
        const t = e.tView;
        return null === t || t.incompleteFirstPass
          ? (e.tView = ci(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts
            ))
          : t;
      }
      function ci(e, t, n, r, o, i, s, a, u, l) {
        const c = Z + r,
          d = c + o,
          f = (function rE(e, t) {
            const n = [];
            for (let r = 0; r < t; r++) n.push(r < e ? null : T);
            return n;
          })(c, d),
          h = "function" == typeof l ? l() : l;
        return (f[1] = {
          type: e,
          blueprint: f,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: t,
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
          directiveRegistry: "function" == typeof i ? i() : i,
          pipeRegistry: "function" == typeof s ? s() : s,
          firstChild: null,
          schemas: u,
          consts: h,
          incompleteFirstPass: !1,
        });
      }
      function Nf(e, t, n) {
        for (let r in e)
          if (e.hasOwnProperty(r)) {
            const o = e[r];
            (n = null === n ? {} : n).hasOwnProperty(r)
              ? n[r].push(t, o)
              : (n[r] = [t, o]);
          }
        return n;
      }
      function Ha(e, t, n, r) {
        let o = !1;
        if (Hc()) {
          const i = (function hE(e, t, n) {
              const r = e.directiveRegistry;
              let o = null;
              if (r)
                for (let i = 0; i < r.length; i++) {
                  const s = r[i];
                  ff(n, s.selectors, !1) &&
                    (o || (o = []),
                    Wo(Tr(n, t), e, s.type),
                    ot(s) ? (Vf(e, n), o.unshift(s)) : o.push(s));
                }
              return o;
            })(e, t, n),
            s = null === r ? null : { "": -1 };
          if (null !== i) {
            (o = !0), kf(n, e.data.length, i.length);
            for (let c = 0; c < i.length; c++) {
              const d = i[c];
              d.providersResolver && d.providersResolver(d);
            }
            let a = !1,
              u = !1,
              l = Kn(e, t, i.length, null);
            for (let c = 0; c < i.length; c++) {
              const d = i[c];
              (n.mergedAttrs = Go(n.mergedAttrs, d.hostAttrs)),
                Lf(e, n, t, l, d),
                gE(l, d, s),
                null !== d.contentQueries && (n.flags |= 8),
                (null !== d.hostBindings ||
                  null !== d.hostAttrs ||
                  0 !== d.hostVars) &&
                  (n.flags |= 128);
              const f = d.type.prototype;
              !a &&
                (f.ngOnChanges || f.ngOnInit || f.ngDoCheck) &&
                ((e.preOrderHooks || (e.preOrderHooks = [])).push(n.index),
                (a = !0)),
                !u &&
                  (f.ngOnChanges || f.ngDoCheck) &&
                  ((e.preOrderCheckHooks || (e.preOrderCheckHooks = [])).push(
                    n.index
                  ),
                  (u = !0)),
                l++;
            }
            !(function iE(e, t) {
              const r = t.directiveEnd,
                o = e.data,
                i = t.attrs,
                s = [];
              let a = null,
                u = null;
              for (let l = t.directiveStart; l < r; l++) {
                const c = o[l],
                  d = c.inputs,
                  f = null === i || df(t) ? null : DE(d, i);
                s.push(f), (a = Nf(d, l, a)), (u = Nf(c.outputs, l, u));
              }
              null !== a &&
                (a.hasOwnProperty("class") && (t.flags |= 16),
                a.hasOwnProperty("style") && (t.flags |= 32)),
                (t.initialInputs = s),
                (t.inputs = a),
                (t.outputs = u);
            })(e, n);
          }
          s &&
            (function pE(e, t, n) {
              if (t) {
                const r = (e.localNames = []);
                for (let o = 0; o < t.length; o += 2) {
                  const i = n[t[o + 1]];
                  if (null == i) throw new B(-301, !1);
                  r.push(t[o], i);
                }
              }
            })(n, r, s);
        }
        return (n.mergedAttrs = Go(n.mergedAttrs, n.attrs)), o;
      }
      function Of(e, t, n, r, o, i) {
        const s = i.hostBindings;
        if (s) {
          let a = e.hostBindingOpCodes;
          null === a && (a = e.hostBindingOpCodes = []);
          const u = ~t.index;
          (function cE(e) {
            let t = e.length;
            for (; t > 0; ) {
              const n = e[--t];
              if ("number" == typeof n && n < 0) return n;
            }
            return 0;
          })(a) != u && a.push(u),
            a.push(r, o, s);
        }
      }
      function Rf(e, t) {
        null !== e.hostBindings && e.hostBindings(1, t);
      }
      function Vf(e, t) {
        (t.flags |= 2), (e.components || (e.components = [])).push(t.index);
      }
      function gE(e, t, n) {
        if (n) {
          if (t.exportAs)
            for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
          ot(t) && (n[""] = e);
        }
      }
      function kf(e, t, n) {
        (e.flags |= 1),
          (e.directiveStart = t),
          (e.directiveEnd = t + n),
          (e.providerIndexes = t);
      }
      function Lf(e, t, n, r, o) {
        e.data[r] = o;
        const i = o.factory || (o.factory = yn(o.type)),
          s = new Ir(i, ot(o), null);
        (e.blueprint[r] = s),
          (n[r] = s),
          Of(e, t, 0, r, Kn(e, n, o.hostVars, T), o);
      }
      function mE(e, t, n) {
        const r = Ze(t, e),
          o = Sf(n),
          i = e[10],
          s = di(
            e,
            qr(
              e,
              o,
              null,
              n.onPush ? 64 : 16,
              r,
              t,
              i,
              i.createRenderer(r, n),
              null,
              null
            )
          );
        e[t.index] = s;
      }
      function yE(e, t, n, r, o, i) {
        const s = i[t];
        if (null !== s) {
          const a = r.setInput;
          for (let u = 0; u < s.length; ) {
            const l = s[u++],
              c = s[u++],
              d = s[u++];
            null !== a ? r.setInput(n, d, l, c) : (n[c] = d);
          }
        }
      }
      function DE(e, t) {
        let n = null,
          r = 0;
        for (; r < t.length; ) {
          const o = t[r];
          if (0 !== o)
            if (5 !== o) {
              if ("number" == typeof o) break;
              e.hasOwnProperty(o) &&
                (null === n && (n = []), n.push(o, e[o], t[r + 1])),
                (r += 2);
            } else r += 2;
          else r += 4;
        }
        return n;
      }
      function Bf(e, t, n, r) {
        return new Array(e, !0, !1, t, null, 0, r, n, null, null);
      }
      function CE(e, t) {
        const n = He(t, e);
        if (Vs(n)) {
          const r = n[1];
          80 & n[2] ? Jn(r, n, r.template, n[8]) : n[5] > 0 && $a(n);
        }
      }
      function $a(e) {
        for (let r = ma(e); null !== r; r = ya(r))
          for (let o = 10; o < r.length; o++) {
            const i = r[o];
            if (1024 & i[2]) {
              const s = i[1];
              Jn(s, i, s.template, i[8]);
            } else i[5] > 0 && $a(i);
          }
        const n = e[1].components;
        if (null !== n)
          for (let r = 0; r < n.length; r++) {
            const o = He(n[r], e);
            Vs(o) && o[5] > 0 && $a(o);
          }
      }
      function EE(e, t) {
        const n = He(t, e),
          r = n[1];
        (function wE(e, t) {
          for (let n = t.length; n < e.blueprint.length; n++)
            t.push(e.blueprint[n]);
        })(r, n),
          zr(r, n, n[8]);
      }
      function di(e, t) {
        return e[13] ? (e[14][4] = t) : (e[13] = t), (e[14] = t), t;
      }
      function Ua(e) {
        for (; e; ) {
          e[2] |= 64;
          const t = Ur(e);
          if (s_(e) && !t) return e;
          e = t;
        }
        return null;
      }
      function qa(e, t, n) {
        const r = t[10];
        r.begin && r.begin();
        try {
          Jn(e, t, e.template, n);
        } catch (o) {
          throw (Gf(t, o), o);
        } finally {
          r.end && r.end();
        }
      }
      function Hf(e) {
        !(function Ga(e) {
          for (let t = 0; t < e.components.length; t++) {
            const n = e.components[t],
              r = da(n),
              o = r[1];
            nE(o, r, o.template, n);
          }
        })(e[8]);
      }
      function za(e, t, n) {
        $s(0), t(e, n);
      }
      const IE = (() => Promise.resolve(null))();
      function jf(e) {
        return e[7] || (e[7] = []);
      }
      function $f(e) {
        return e.cleanup || (e.cleanup = []);
      }
      function Gf(e, t) {
        const n = e[9],
          r = n ? n.get(qn, null) : null;
        r && r.handleError(t);
      }
      function qf(e, t, n, r, o) {
        for (let i = 0; i < n.length; ) {
          const s = n[i++],
            a = n[i++],
            u = t[s],
            l = e.data[s];
          null !== l.setInput ? l.setInput(u, o, r, a) : (u[a] = o);
        }
      }
      function fi(e, t, n) {
        let r = n ? e.styles : null,
          o = n ? e.classes : null,
          i = 0;
        if (null !== t)
          for (let s = 0; s < t.length; s++) {
            const a = t[s];
            "number" == typeof a
              ? (i = a)
              : 1 == i
              ? (o = Ds(o, a))
              : 2 == i && (r = Ds(r, a + ": " + t[++s] + ";"));
          }
        n ? (e.styles = r) : (e.stylesWithoutHost = r),
          n ? (e.classes = o) : (e.classesWithoutHost = o);
      }
      const Wa = new V("INJECTOR", -1);
      class zf {
        get(t, n = Or) {
          if (n === Or) {
            const r = new Error(`NullInjectorError: No provider for ${$(t)}!`);
            throw ((r.name = "NullInjectorError"), r);
          }
          return n;
        }
      }
      const Qa = new V("Set Injector scope."),
        Wr = {},
        FE = {};
      let Za;
      function Wf() {
        return void 0 === Za && (Za = new zf()), Za;
      }
      function Qf(e, t = null, n = null, r) {
        const o = Zf(e, t, n, r);
        return o._resolveInjectorDefTypes(), o;
      }
      function Zf(e, t = null, n = null, r) {
        return new xE(e, n, t || Wf(), r);
      }
      class xE {
        constructor(t, n, r, o = null) {
          (this.parent = r),
            (this.records = new Map()),
            (this.injectorDefTypes = new Set()),
            (this.onDestroy = new Set()),
            (this._destroyed = !1);
          const i = [];
          n && vt(n, (a) => this.processProvider(a, t, n)),
            vt([t], (a) => this.processInjectorType(a, [], i)),
            this.records.set(Wa, Yn(void 0, this));
          const s = this.records.get(Qa);
          (this.scope = null != s ? s.value : null),
            (this.source = o || ("object" == typeof t ? null : $(t)));
        }
        get destroyed() {
          return this._destroyed;
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            this.onDestroy.forEach((t) => t.ngOnDestroy());
          } finally {
            this.records.clear(),
              this.onDestroy.clear(),
              this.injectorDefTypes.clear();
          }
        }
        get(t, n = Or, r = N.Default) {
          this.assertNotDestroyed();
          const o = md(this),
            i = Ut(void 0);
          try {
            if (!(r & N.SkipSelf)) {
              let a = this.records.get(t);
              if (void 0 === a) {
                const u =
                  (function BE(e) {
                    return (
                      "function" == typeof e ||
                      ("object" == typeof e && e instanceof V)
                    );
                  })(t) && vs(t);
                (a = u && this.injectableDefInScope(u) ? Yn(Ka(t), Wr) : null),
                  this.records.set(t, a);
              }
              if (null != a) return this.hydrate(t, a);
            }
            return (r & N.Self ? Wf() : this.parent).get(
              t,
              (n = r & N.Optional && n === Or ? null : n)
            );
          } catch (s) {
            if ("NullInjectorError" === s.name) {
              if (((s[Jo] = s[Jo] || []).unshift($(t)), o)) throw s;
              return (function hv(e, t, n, r) {
                const o = e[Jo];
                throw (
                  (t[gd] && o.unshift(t[gd]),
                  (e.message = (function pv(e, t, n, r = null) {
                    e =
                      e && "\n" === e.charAt(0) && "\u0275" == e.charAt(1)
                        ? e.substr(2)
                        : e;
                    let o = $(t);
                    if (Array.isArray(t)) o = t.map($).join(" -> ");
                    else if ("object" == typeof t) {
                      let i = [];
                      for (let s in t)
                        if (t.hasOwnProperty(s)) {
                          let a = t[s];
                          i.push(
                            s +
                              ":" +
                              ("string" == typeof a ? JSON.stringify(a) : $(a))
                          );
                        }
                      o = `{${i.join(", ")}}`;
                    }
                    return `${n}${r ? "(" + r + ")" : ""}[${o}]: ${e.replace(
                      uv,
                      "\n  "
                    )}`;
                  })("\n" + e.message, o, n, r)),
                  (e.ngTokenPath = o),
                  (e[Jo] = null),
                  e)
                );
              })(s, t, "R3InjectorError", this.source);
            }
            throw s;
          } finally {
            Ut(i), md(o);
          }
        }
        _resolveInjectorDefTypes() {
          this.injectorDefTypes.forEach((t) => this.get(t));
        }
        toString() {
          const t = [];
          return (
            this.records.forEach((r, o) => t.push($(o))),
            `R3Injector[${t.join(", ")}]`
          );
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new B(205, !1);
        }
        processInjectorType(t, n, r) {
          if (!(t = x(t))) return !1;
          let o = Mc(t);
          const i = (null == o && t.ngModule) || void 0,
            s = void 0 === i ? t : i,
            a = -1 !== r.indexOf(s);
          if ((void 0 !== i && (o = Mc(i)), null == o)) return !1;
          if (null != o.imports && !a) {
            let c;
            r.push(s);
            try {
              vt(o.imports, (d) => {
                this.processInjectorType(d, n, r) &&
                  (void 0 === c && (c = []), c.push(d));
              });
            } finally {
            }
            if (void 0 !== c)
              for (let d = 0; d < c.length; d++) {
                const { ngModule: f, providers: h } = c[d];
                vt(h, (p) => this.processProvider(p, f, h || W));
              }
          }
          this.injectorDefTypes.add(s);
          const u = yn(s) || (() => new s());
          this.records.set(s, Yn(u, Wr));
          const l = o.providers;
          if (null != l && !a) {
            const c = t;
            vt(l, (d) => this.processProvider(d, c, l));
          }
          return void 0 !== i && void 0 !== t.providers;
        }
        processProvider(t, n, r) {
          let o = Xn((t = x(t))) ? t : x(t && t.provide);
          const i = (function PE(e, t, n) {
            return Jf(e) ? Yn(void 0, e.useValue) : Yn(Kf(e), Wr);
          })(t);
          if (Xn(t) || !0 !== t.multi) this.records.get(o);
          else {
            let s = this.records.get(o);
            s ||
              ((s = Yn(void 0, Wr, !0)),
              (s.factory = () => na(s.multi)),
              this.records.set(o, s)),
              (o = t),
              s.multi.push(t);
          }
          this.records.set(o, i);
        }
        hydrate(t, n) {
          return (
            n.value === Wr && ((n.value = FE), (n.value = n.factory())),
            "object" == typeof n.value &&
              n.value &&
              (function LE(e) {
                return (
                  null !== e &&
                  "object" == typeof e &&
                  "function" == typeof e.ngOnDestroy
                );
              })(n.value) &&
              this.onDestroy.add(n.value),
            n.value
          );
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1;
          const n = x(t.providedIn);
          return "string" == typeof n
            ? "any" === n || n === this.scope
            : this.injectorDefTypes.has(n);
        }
      }
      function Ka(e) {
        const t = vs(e),
          n = null !== t ? t.factory : yn(e);
        if (null !== n) return n;
        if (e instanceof V) throw new B(204, !1);
        if (e instanceof Function)
          return (function NE(e) {
            const t = e.length;
            if (t > 0)
              throw (
                ((function Pr(e, t) {
                  const n = [];
                  for (let r = 0; r < e; r++) n.push(t);
                  return n;
                })(t, "?"),
                new B(204, !1))
              );
            const n = (function WD(e) {
              const t = e && (e[So] || e[Ac]);
              if (t) {
                const n = (function QD(e) {
                  if (e.hasOwnProperty("name")) return e.name;
                  const t = ("" + e).match(/^function\s*([^\s(]+)/);
                  return null === t ? "" : t[1];
                })(e);
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`
                  ),
                  t
                );
              }
              return null;
            })(e);
            return null !== n ? () => n.factory(e) : () => new e();
          })(e);
        throw new B(204, !1);
      }
      function Kf(e, t, n) {
        let r;
        if (Xn(e)) {
          const o = x(e);
          return yn(o) || Ka(o);
        }
        if (Jf(e)) r = () => x(e.useValue);
        else if (
          (function RE(e) {
            return !(!e || !e.useFactory);
          })(e)
        )
          r = () => e.useFactory(...na(e.deps || []));
        else if (
          (function OE(e) {
            return !(!e || !e.useExisting);
          })(e)
        )
          r = () => L(x(e.useExisting));
        else {
          const o = x(e && (e.useClass || e.provide));
          if (
            !(function kE(e) {
              return !!e.deps;
            })(e)
          )
            return yn(o) || Ka(o);
          r = () => new o(...na(e.deps));
        }
        return r;
      }
      function Yn(e, t, n = !1) {
        return { factory: e, value: t, multi: n ? [] : void 0 };
      }
      function Jf(e) {
        return null !== e && "object" == typeof e && cv in e;
      }
      function Xn(e) {
        return "function" == typeof e;
      }
      let Re = (() => {
        class e {
          static create(n, r) {
            var o;
            if (Array.isArray(n)) return Qf({ name: "" }, r, n, "");
            {
              const i = null !== (o = n.name) && void 0 !== o ? o : "";
              return Qf({ name: i }, n.parent, n.providers, i);
            }
          }
        }
        return (
          (e.THROW_IF_NOT_FOUND = Or),
          (e.NULL = new zf()),
          (e.ɵprov = U({ token: e, providedIn: "any", factory: () => L(Wa) })),
          (e.__NG_ELEMENT_ID__ = -1),
          e
        );
      })();
      function WE(e, t) {
        Ho(da(e)[1], fe());
      }
      function G(e) {
        let t = (function lh(e) {
            return Object.getPrototypeOf(e.prototype).constructor;
          })(e.type),
          n = !0;
        const r = [e];
        for (; t; ) {
          let o;
          if (ot(e)) o = t.ɵcmp || t.ɵdir;
          else {
            if (t.ɵcmp) throw new B(903, "");
            o = t.ɵdir;
          }
          if (o) {
            if (n) {
              r.push(o);
              const s = e;
              (s.inputs = Xa(e.inputs)),
                (s.declaredInputs = Xa(e.declaredInputs)),
                (s.outputs = Xa(e.outputs));
              const a = o.hostBindings;
              a && JE(e, a);
              const u = o.viewQuery,
                l = o.contentQueries;
              if (
                (u && ZE(e, u),
                l && KE(e, l),
                ys(e.inputs, o.inputs),
                ys(e.declaredInputs, o.declaredInputs),
                ys(e.outputs, o.outputs),
                ot(o) && o.data.animation)
              ) {
                const c = e.data;
                c.animation = (c.animation || []).concat(o.data.animation);
              }
            }
            const i = o.features;
            if (i)
              for (let s = 0; s < i.length; s++) {
                const a = i[s];
                a && a.ngInherit && a(e), a === G && (n = !1);
              }
          }
          t = Object.getPrototypeOf(t);
        }
        !(function QE(e) {
          let t = 0,
            n = null;
          for (let r = e.length - 1; r >= 0; r--) {
            const o = e[r];
            (o.hostVars = t += o.hostVars),
              (o.hostAttrs = Go(o.hostAttrs, (n = Go(n, o.hostAttrs))));
          }
        })(r);
      }
      function Xa(e) {
        return e === In ? {} : e === W ? [] : e;
      }
      function ZE(e, t) {
        const n = e.viewQuery;
        e.viewQuery = n
          ? (r, o) => {
              t(r, o), n(r, o);
            }
          : t;
      }
      function KE(e, t) {
        const n = e.contentQueries;
        e.contentQueries = n
          ? (r, o, i) => {
              t(r, o, i), n(r, o, i);
            }
          : t;
      }
      function JE(e, t) {
        const n = e.hostBindings;
        e.hostBindings = n
          ? (r, o) => {
              t(r, o), n(r, o);
            }
          : t;
      }
      let hi = null;
      function er() {
        if (!hi) {
          const e = q.Symbol;
          if (e && e.iterator) hi = e.iterator;
          else {
            const t = Object.getOwnPropertyNames(Map.prototype);
            for (let n = 0; n < t.length; ++n) {
              const r = t[n];
              "entries" !== r &&
                "size" !== r &&
                Map.prototype[r] === Map.prototype.entries &&
                (hi = r);
            }
          }
        }
        return hi;
      }
      function Qr(e) {
        return (
          !!eu(e) && (Array.isArray(e) || (!(e instanceof Map) && er() in e))
        );
      }
      function eu(e) {
        return null !== e && ("function" == typeof e || "object" == typeof e);
      }
      function Ee(e, t, n) {
        return !Object.is(e[t], n) && ((e[t] = n), !0);
      }
      function Kr(e, t, n, r, o, i, s, a) {
        const u = y(),
          l = H(),
          c = e + Z,
          d = l.firstCreatePass
            ? (function ow(e, t, n, r, o, i, s, a, u) {
                const l = t.consts,
                  c = Zn(t, e, 4, s || null, zt(l, a));
                Ha(t, n, c, zt(l, u)), Ho(t, c);
                const d = (c.tViews = ci(
                  2,
                  c,
                  r,
                  o,
                  i,
                  t.directiveRegistry,
                  t.pipeRegistry,
                  null,
                  t.schemas,
                  l
                ));
                return (
                  null !== t.queries &&
                    (t.queries.template(t, c),
                    (d.queries = t.queries.embeddedTView(c))),
                  c
                );
              })(c, l, u, t, n, r, o, i, s)
            : l.data[c];
        _t(d, !1);
        const f = u[P].createComment("");
        ii(l, u, f, d),
          Ce(f, u),
          di(u, (u[c] = Bf(f, u, f, d))),
          Oo(d) && La(l, u, d),
          null != s && Ba(u, d, a);
      }
      function v(e, t = N.Default) {
        const n = y();
        return null === n ? L(e, t) : id(fe(), n, x(e), t);
      }
      function Yt(e, t, n) {
        const r = y();
        return (
          Ee(
            r,
            (function Pn() {
              return A.lFrame.bindingIndex++;
            })(),
            t
          ) &&
            (function Ue(e, t, n, r, o, i, s, a) {
              const u = Ze(t, n);
              let c,
                l = t.inputs;
              !a && null != l && (c = l[r])
                ? (qf(e, n, c, r, o),
                  Po(t) &&
                    (function aE(e, t) {
                      const n = He(t, e);
                      16 & n[2] || (n[2] |= 64);
                    })(n, t.index))
                : 3 & t.type &&
                  ((r = (function sE(e) {
                    return "class" === e
                      ? "className"
                      : "for" === e
                      ? "htmlFor"
                      : "formaction" === e
                      ? "formAction"
                      : "innerHtml" === e
                      ? "innerHTML"
                      : "readonly" === e
                      ? "readOnly"
                      : "tabindex" === e
                      ? "tabIndex"
                      : e;
                  })(r)),
                  (o = null != s ? s(o, t.value || "", r) : o),
                  ne(i)
                    ? i.setProperty(u, r, o)
                    : qs(r) ||
                      (u.setProperty ? u.setProperty(r, o) : (u[r] = o)));
            })(
              H(),
              (function re() {
                const e = A.lFrame;
                return Rs(e.tView, e.selectedIndex);
              })(),
              r,
              e,
              t,
              r[P],
              n,
              !1
            ),
          Yt
        );
      }
      function iu(e, t, n, r, o) {
        const s = o ? "class" : "style";
        qf(e, n, t.inputs[s], s, r);
      }
      function Lt(e, t, n, r) {
        const o = y(),
          i = H(),
          s = Z + e,
          a = o[P],
          u = (o[s] = _a(
            a,
            t,
            (function L_() {
              return A.lFrame.currentNamespace;
            })()
          )),
          l = i.firstCreatePass
            ? (function Iw(e, t, n, r, o, i, s) {
                const a = t.consts,
                  l = Zn(t, e, 2, o, zt(a, i));
                return (
                  Ha(t, n, l, zt(a, s)),
                  null !== l.attrs && fi(l, l.attrs, !1),
                  null !== l.mergedAttrs && fi(l, l.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, l),
                  l
                );
              })(s, i, o, 0, t, n, r)
            : i.data[s];
        _t(l, !0);
        const c = l.mergedAttrs;
        null !== c && Uo(a, u, c);
        const d = l.classes;
        null !== d && Ma(a, u, d);
        const f = l.styles;
        return (
          null !== f && uf(a, u, f),
          64 != (64 & l.flags) && ii(i, o, u, l),
          0 ===
            (function E_() {
              return A.lFrame.elementDepthCount;
            })() && Ce(u, o),
          (function w_() {
            A.lFrame.elementDepthCount++;
          })(),
          Oo(l) &&
            (La(i, o, l),
            (function If(e, t, n) {
              if (Ss(t)) {
                const o = t.directiveEnd;
                for (let i = t.directiveStart; i < o; i++) {
                  const s = e.data[i];
                  s.contentQueries && s.contentQueries(1, n[i], i);
                }
              }
            })(i, l, o)),
          null !== r && Ba(o, l),
          Lt
        );
      }
      function Mt() {
        let e = fe();
        Ls()
          ? (function Bs() {
              A.lFrame.isParent = !1;
            })()
          : ((e = e.parent), _t(e, !1));
        const t = e;
        !(function b_() {
          A.lFrame.elementDepthCount--;
        })();
        const n = H();
        return (
          n.firstCreatePass && (Ho(n, e), Ss(e) && n.queries.elementEnd(e)),
          null != t.classesWithoutHost &&
            (function U_(e) {
              return 0 != (16 & e.flags);
            })(t) &&
            iu(n, t, y(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function G_(e) {
              return 0 != (32 & e.flags);
            })(t) &&
            iu(n, t, y(), t.stylesWithoutHost, !1),
          Mt
        );
      }
      function su(e, t, n, r) {
        return Lt(e, t, n, r), Mt(), su;
      }
      function mi(e) {
        return !!e && "function" == typeof e.then;
      }
      const Nh = function xh(e) {
        return !!e && "function" == typeof e.subscribe;
      };
      function Ge(e, t, n, r) {
        const o = y(),
          i = H(),
          s = fe();
        return (
          (function Oh(e, t, n, r, o, i, s, a) {
            const u = Oo(r),
              c = e.firstCreatePass && $f(e),
              d = t[8],
              f = jf(t);
            let h = !0;
            if (3 & r.type || a) {
              const _ = Ze(r, t),
                D = a ? a(_) : _,
                g = f.length,
                w = a ? (F) => a(ae(F[r.index])) : r.index;
              if (ne(n)) {
                let F = null;
                if (
                  (!a &&
                    u &&
                    (F = (function Tw(e, t, n, r) {
                      const o = e.cleanup;
                      if (null != o)
                        for (let i = 0; i < o.length - 1; i += 2) {
                          const s = o[i];
                          if (s === n && o[i + 1] === r) {
                            const a = t[7],
                              u = o[i + 2];
                            return a.length > u ? a[u] : null;
                          }
                          "string" == typeof s && (i += 2);
                        }
                      return null;
                    })(e, t, o, r.index)),
                  null !== F)
                )
                  ((F.__ngLastListenerFn__ || F).__ngNextListenerFn__ = i),
                    (F.__ngLastListenerFn__ = i),
                    (h = !1);
                else {
                  i = lu(r, t, d, i, !1);
                  const j = n.listen(D, o, i);
                  f.push(i, j), c && c.push(o, w, g, g + 1);
                }
              } else
                (i = lu(r, t, d, i, !0)),
                  D.addEventListener(o, i, s),
                  f.push(i),
                  c && c.push(o, w, g, s);
            } else i = lu(r, t, d, i, !1);
            const p = r.outputs;
            let m;
            if (h && null !== p && (m = p[o])) {
              const _ = m.length;
              if (_)
                for (let D = 0; D < _; D += 2) {
                  const qe = t[m[D]][m[D + 1]].subscribe(i),
                    An = f.length;
                  f.push(i, qe), c && c.push(o, r.index, An, -(An + 1));
                }
            }
          })(i, o, o[P], s, e, t, !!n, r),
          Ge
        );
      }
      function Rh(e, t, n, r) {
        try {
          return !1 !== n(r);
        } catch (o) {
          return Gf(e, o), !1;
        }
      }
      function lu(e, t, n, r, o) {
        return function i(s) {
          if (s === Function) return r;
          const a = 2 & e.flags ? He(e.index, t) : t;
          0 == (32 & t[2]) && Ua(a);
          let u = Rh(t, 0, r, s),
            l = i.__ngNextListenerFn__;
          for (; l; ) (u = Rh(t, 0, l, s) && u), (l = l.__ngNextListenerFn__);
          return o && !1 === u && (s.preventDefault(), (s.returnValue = !1)), u;
        };
      }
      function cu(e = 1) {
        return (function N_(e) {
          return (A.lFrame.contextLView = (function P_(e, t) {
            for (; e > 0; ) (t = t[15]), e--;
            return t;
          })(e, A.lFrame.contextLView))[8];
        })(e);
      }
      function qh(e, t, n, r, o) {
        const i = e[n + 1],
          s = null === t;
        let a = r ? st(i) : Rt(i),
          u = !1;
        for (; 0 !== a && (!1 === u || s); ) {
          const c = e[a + 1];
          Rw(e[a], t) && ((u = !0), (e[a + 1] = r ? Sa(c) : Aa(c))),
            (a = r ? st(c) : Rt(c));
        }
        u && (e[n + 1] = r ? Aa(i) : Sa(i));
      }
      function Rw(e, t) {
        return (
          null === e ||
          null == t ||
          (Array.isArray(e) ? e[1] : e) === t ||
          (!(!Array.isArray(e) || "string" != typeof t) && jn(e, t) >= 0)
        );
      }
      function yi(e, t) {
        return (
          (function ut(e, t, n, r) {
            const o = y(),
              i = H(),
              s = (function Ot(e) {
                const t = A.lFrame,
                  n = t.bindingIndex;
                return (t.bindingIndex = t.bindingIndex + e), n;
              })(2);
            i.firstUpdatePass &&
              (function ep(e, t, n, r) {
                const o = e.data;
                if (null === o[n + 1]) {
                  const i = o[Se()],
                    s = (function Xh(e, t) {
                      return t >= e.expandoStartIndex;
                    })(e, n);
                  (function op(e, t) {
                    return 0 != (e.flags & (t ? 16 : 32));
                  })(i, r) &&
                    null === t &&
                    !s &&
                    (t = !1),
                    (t = (function Gw(e, t, n, r) {
                      const o = (function js(e) {
                        const t = A.lFrame.currentDirectiveIndex;
                        return -1 === t ? null : e[t];
                      })(e);
                      let i = r ? t.residualClasses : t.residualStyles;
                      if (null === o)
                        0 === (r ? t.classBindings : t.styleBindings) &&
                          ((n = Jr((n = fu(null, e, t, n, r)), t.attrs, r)),
                          (i = null));
                      else {
                        const s = t.directiveStylingLast;
                        if (-1 === s || e[s] !== o)
                          if (((n = fu(o, e, t, n, r)), null === i)) {
                            let u = (function qw(e, t, n) {
                              const r = n ? t.classBindings : t.styleBindings;
                              if (0 !== Rt(r)) return e[st(r)];
                            })(e, t, r);
                            void 0 !== u &&
                              Array.isArray(u) &&
                              ((u = fu(null, e, t, u[1], r)),
                              (u = Jr(u, t.attrs, r)),
                              (function zw(e, t, n, r) {
                                e[st(n ? t.classBindings : t.styleBindings)] =
                                  r;
                              })(e, t, r, u));
                          } else
                            i = (function Ww(e, t, n) {
                              let r;
                              const o = t.directiveEnd;
                              for (
                                let i = 1 + t.directiveStylingLast;
                                i < o;
                                i++
                              )
                                r = Jr(r, e[i].hostAttrs, n);
                              return Jr(r, t.attrs, n);
                            })(e, t, r);
                      }
                      return (
                        void 0 !== i &&
                          (r
                            ? (t.residualClasses = i)
                            : (t.residualStyles = i)),
                        n
                      );
                    })(o, i, t, r)),
                    (function Pw(e, t, n, r, o, i) {
                      let s = i ? t.classBindings : t.styleBindings,
                        a = st(s),
                        u = Rt(s);
                      e[r] = n;
                      let c,
                        l = !1;
                      if (Array.isArray(n)) {
                        const d = n;
                        (c = d[1]), (null === c || jn(d, c) > 0) && (l = !0);
                      } else c = n;
                      if (o)
                        if (0 !== u) {
                          const f = st(e[a + 1]);
                          (e[r + 1] = ai(f, a)),
                            0 !== f && (e[f + 1] = Ia(e[f + 1], r)),
                            (e[a + 1] = (function UC(e, t) {
                              return (131071 & e) | (t << 17);
                            })(e[a + 1], r));
                        } else
                          (e[r + 1] = ai(a, 0)),
                            0 !== a && (e[a + 1] = Ia(e[a + 1], r)),
                            (a = r);
                      else
                        (e[r + 1] = ai(u, 0)),
                          0 === a ? (a = r) : (e[u + 1] = Ia(e[u + 1], r)),
                          (u = r);
                      l && (e[r + 1] = Aa(e[r + 1])),
                        qh(e, c, r, !0),
                        qh(e, c, r, !1),
                        (function Ow(e, t, n, r, o) {
                          const i = o ? e.residualClasses : e.residualStyles;
                          null != i &&
                            "string" == typeof t &&
                            jn(i, t) >= 0 &&
                            (n[r + 1] = Sa(n[r + 1]));
                        })(t, c, e, r, i),
                        (s = ai(a, u)),
                        i ? (t.classBindings = s) : (t.styleBindings = s);
                    })(o, i, t, n, s, r);
                }
              })(i, e, s, r),
              t !== T &&
                Ee(o, s, t) &&
                (function np(e, t, n, r, o, i, s, a) {
                  if (!(3 & t.type)) return;
                  const u = e.data,
                    l = u[a + 1];
                  Di(
                    (function yf(e) {
                      return 1 == (1 & e);
                    })(l)
                      ? rp(u, t, n, o, Rt(l), s)
                      : void 0
                  ) ||
                    (Di(i) ||
                      ((function mf(e) {
                        return 2 == (2 & e);
                      })(l) &&
                        (i = rp(u, null, n, o, a, s))),
                    (function xC(e, t, n, r, o) {
                      const i = ne(e);
                      if (t)
                        o
                          ? i
                            ? e.addClass(n, r)
                            : n.classList.add(r)
                          : i
                          ? e.removeClass(n, r)
                          : n.classList.remove(r);
                      else {
                        let s = -1 === r.indexOf("-") ? void 0 : $e.DashCase;
                        if (null == o)
                          i
                            ? e.removeStyle(n, r, s)
                            : n.style.removeProperty(r);
                        else {
                          const a =
                            "string" == typeof o && o.endsWith("!important");
                          a && ((o = o.slice(0, -10)), (s |= $e.Important)),
                            i
                              ? e.setStyle(n, r, o, s)
                              : n.style.setProperty(r, o, a ? "important" : "");
                        }
                      }
                    })(
                      r,
                      s,
                      (function Ro(e, t) {
                        return ae(t[e]);
                      })(Se(), n),
                      o,
                      i
                    ));
                })(
                  i,
                  i.data[Se()],
                  o,
                  o[P],
                  e,
                  (o[s + 1] = (function Kw(e, t) {
                    return (
                      null == e ||
                        ("string" == typeof t
                          ? (e += t)
                          : "object" == typeof e &&
                            (e = $(
                              (function Zt(e) {
                                return e instanceof
                                  class Md {
                                    constructor(t) {
                                      this.changingThisBreaksApplicationSecurity =
                                        t;
                                    }
                                    toString() {
                                      return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`;
                                    }
                                  }
                                  ? e.changingThisBreaksApplicationSecurity
                                  : e;
                              })(e)
                            ))),
                      e
                    );
                  })(t, n)),
                  r,
                  s
                );
          })(e, t, null, !0),
          yi
        );
      }
      function fu(e, t, n, r, o) {
        let i = null;
        const s = n.directiveEnd;
        let a = n.directiveStylingLast;
        for (
          -1 === a ? (a = n.directiveStart) : a++;
          a < s && ((i = t[a]), (r = Jr(r, i.hostAttrs, o)), i !== e);

        )
          a++;
        return null !== e && (n.directiveStylingLast = a), r;
      }
      function Jr(e, t, n) {
        const r = n ? 1 : 2;
        let o = -1;
        if (null !== t)
          for (let i = 0; i < t.length; i++) {
            const s = t[i];
            "number" == typeof s
              ? (o = s)
              : o === r &&
                (Array.isArray(e) || (e = void 0 === e ? [] : ["", e]),
                je(e, s, !!n || t[++i]));
          }
        return void 0 === e ? null : e;
      }
      function rp(e, t, n, r, o, i) {
        const s = null === t;
        let a;
        for (; o > 0; ) {
          const u = e[o],
            l = Array.isArray(u),
            c = l ? u[1] : u,
            d = null === c;
          let f = n[o + 1];
          f === T && (f = d ? W : void 0);
          let h = d ? Xs(f, r) : c === r ? f : void 0;
          if ((l && !Di(h) && (h = Xs(u, r)), Di(h) && ((a = h), s))) return a;
          const p = e[o + 1];
          o = s ? st(p) : Rt(p);
        }
        if (null !== t) {
          let u = i ? t.residualClasses : t.residualStyles;
          null != u && (a = Xs(u, r));
        }
        return a;
      }
      function Di(e) {
        return void 0 !== e;
      }
      function fr(e, t = "") {
        const n = y(),
          r = H(),
          o = e + Z,
          i = r.firstCreatePass ? Zn(r, o, 1, t, null) : r.data[o],
          s = (n[o] = (function Da(e, t) {
            return ne(e) ? e.createText(t) : e.createTextNode(t);
          })(n[P], t));
        ii(r, n, s, i), _t(i, !1);
      }
      const vn = void 0;
      var mb = [
        "en",
        [["a", "p"], ["AM", "PM"], vn],
        [["AM", "PM"], vn, vn],
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
        vn,
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
        vn,
        [
          ["B", "A"],
          ["BC", "AD"],
          ["Before Christ", "Anno Domini"],
        ],
        0,
        [6, 0],
        ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"],
        ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"],
        ["{1}, {0}", vn, "{1} 'at' {0}", vn],
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
        function gb(e) {
          const n = Math.floor(Math.abs(e)),
            r = e.toString().replace(/^[^.]*\.?/, "").length;
          return 1 === n && 0 === r ? 1 : 5;
        },
      ];
      let hr = {};
      function Ap(e) {
        return (
          e in hr ||
            (hr[e] =
              q.ng &&
              q.ng.common &&
              q.ng.common.locales &&
              q.ng.common.locales[e]),
          hr[e]
        );
      }
      var E = (() => (
        ((E = E || {})[(E.LocaleId = 0)] = "LocaleId"),
        (E[(E.DayPeriodsFormat = 1)] = "DayPeriodsFormat"),
        (E[(E.DayPeriodsStandalone = 2)] = "DayPeriodsStandalone"),
        (E[(E.DaysFormat = 3)] = "DaysFormat"),
        (E[(E.DaysStandalone = 4)] = "DaysStandalone"),
        (E[(E.MonthsFormat = 5)] = "MonthsFormat"),
        (E[(E.MonthsStandalone = 6)] = "MonthsStandalone"),
        (E[(E.Eras = 7)] = "Eras"),
        (E[(E.FirstDayOfWeek = 8)] = "FirstDayOfWeek"),
        (E[(E.WeekendRange = 9)] = "WeekendRange"),
        (E[(E.DateFormat = 10)] = "DateFormat"),
        (E[(E.TimeFormat = 11)] = "TimeFormat"),
        (E[(E.DateTimeFormat = 12)] = "DateTimeFormat"),
        (E[(E.NumberSymbols = 13)] = "NumberSymbols"),
        (E[(E.NumberFormats = 14)] = "NumberFormats"),
        (E[(E.CurrencyCode = 15)] = "CurrencyCode"),
        (E[(E.CurrencySymbol = 16)] = "CurrencySymbol"),
        (E[(E.CurrencyName = 17)] = "CurrencyName"),
        (E[(E.Currencies = 18)] = "Currencies"),
        (E[(E.Directionality = 19)] = "Directionality"),
        (E[(E.PluralCase = 20)] = "PluralCase"),
        (E[(E.ExtraData = 21)] = "ExtraData"),
        E
      ))();
      const _i = "en-US";
      let Ip = _i;
      function mu(e, t, n, r, o) {
        if (((e = x(e)), Array.isArray(e)))
          for (let i = 0; i < e.length; i++) mu(e[i], t, n, r, o);
        else {
          const i = H(),
            s = y();
          let a = Xn(e) ? e : x(e.provide),
            u = Kf(e);
          const l = fe(),
            c = 1048575 & l.providerIndexes,
            d = l.directiveStart,
            f = l.providerIndexes >> 20;
          if (Xn(e) || !e.multi) {
            const h = new Ir(u, o, v),
              p = Du(a, t, o ? c : c + f, d);
            -1 === p
              ? (Wo(Tr(l, s), i, a),
                yu(i, e, t.length),
                t.push(a),
                l.directiveStart++,
                l.directiveEnd++,
                o && (l.providerIndexes += 1048576),
                n.push(h),
                s.push(h))
              : ((n[p] = h), (s[p] = h));
          } else {
            const h = Du(a, t, c + f, d),
              p = Du(a, t, c, c + f),
              m = h >= 0 && n[h],
              _ = p >= 0 && n[p];
            if ((o && !_) || (!o && !m)) {
              Wo(Tr(l, s), i, a);
              const D = (function m0(e, t, n, r, o) {
                const i = new Ir(e, n, v);
                return (
                  (i.multi = []),
                  (i.index = t),
                  (i.componentProviders = 0),
                  Jp(i, o, r && !n),
                  i
                );
              })(o ? g0 : p0, n.length, o, r, u);
              !o && _ && (n[p].providerFactory = D),
                yu(i, e, t.length, 0),
                t.push(a),
                l.directiveStart++,
                l.directiveEnd++,
                o && (l.providerIndexes += 1048576),
                n.push(D),
                s.push(D);
            } else yu(i, e, h > -1 ? h : p, Jp(n[o ? p : h], u, !o && r));
            !o && r && _ && n[p].componentProviders++;
          }
        }
      }
      function yu(e, t, n, r) {
        const o = Xn(t),
          i = (function VE(e) {
            return !!e.useClass;
          })(t);
        if (o || i) {
          const u = (i ? x(t.useClass) : t).prototype.ngOnDestroy;
          if (u) {
            const l = e.destroyHooks || (e.destroyHooks = []);
            if (!o && t.multi) {
              const c = l.indexOf(n);
              -1 === c ? l.push(n, [r, u]) : l[c + 1].push(r, u);
            } else l.push(n, u);
          }
        }
      }
      function Jp(e, t, n) {
        return n && e.componentProviders++, e.multi.push(t) - 1;
      }
      function Du(e, t, n, r) {
        for (let o = n; o < r; o++) if (t[o] === e) return o;
        return -1;
      }
      function p0(e, t, n, r) {
        return _u(this.multi, []);
      }
      function g0(e, t, n, r) {
        const o = this.multi;
        let i;
        if (this.providerFactory) {
          const s = this.providerFactory.componentProviders,
            a = Fr(n, n[1], this.providerFactory.index, r);
          (i = a.slice(0, s)), _u(o, i);
          for (let u = s; u < a.length; u++) i.push(a[u]);
        } else (i = []), _u(o, i);
        return i;
      }
      function _u(e, t) {
        for (let n = 0; n < e.length; n++) t.push((0, e[n])());
        return t;
      }
      function ee(e, t = []) {
        return (n) => {
          n.providersResolver = (r, o) =>
            (function h0(e, t, n) {
              const r = H();
              if (r.firstCreatePass) {
                const o = ot(e);
                mu(n, r.data, r.blueprint, o, !0),
                  mu(t, r.data, r.blueprint, o, !1);
              }
            })(r, o ? o(e) : e, t);
        };
      }
      class Yp {}
      class _0 {
        resolveComponentFactory(t) {
          throw (function D0(e) {
            const t = Error(
              `No component factory found for ${$(
                e
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (t.ngComponent = e), t;
          })(t);
        }
      }
      let no = (() => {
        class e {}
        return (e.NULL = new _0()), e;
      })();
      function v0() {
        return gr(fe(), y());
      }
      function gr(e, t) {
        return new ct(Ze(e, t));
      }
      let ct = (() => {
        class e {
          constructor(n) {
            this.nativeElement = n;
          }
        }
        return (e.__NG_ELEMENT_ID__ = v0), e;
      })();
      class eg {}
      let Cn = (() => {
          class e {}
          return (
            (e.__NG_ELEMENT_ID__ = () =>
              (function w0() {
                const e = y(),
                  n = He(fe().index, e);
                return (function E0(e) {
                  return e[P];
                })(Dt(n) ? n : e);
              })()),
            e
          );
        })(),
        b0 = (() => {
          class e {}
          return (
            (e.ɵprov = U({
              token: e,
              providedIn: "root",
              factory: () => null,
            })),
            e
          );
        })();
      class bi {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const M0 = new bi("13.2.4"),
        vu = {};
      function Mi(e, t, n, r, o = !1) {
        for (; null !== n; ) {
          const i = t[n.index];
          if ((null !== i && r.push(ae(i)), rt(i)))
            for (let a = 10; a < i.length; a++) {
              const u = i[a],
                l = u[1].firstChild;
              null !== l && Mi(u[1], u, l, r);
            }
          const s = n.type;
          if (8 & s) Mi(e, t, n.child, r);
          else if (32 & s) {
            const a = ga(n, t);
            let u;
            for (; (u = a()); ) r.push(u);
          } else if (16 & s) {
            const a = of(t, n);
            if (Array.isArray(a)) r.push(...a);
            else {
              const u = Ur(t[16]);
              Mi(u[1], u, a, r, !0);
            }
          }
          n = o ? n.projectionNext : n.next;
        }
        return r;
      }
      class ro {
        constructor(t, n) {
          (this._lView = t),
            (this._cdRefInjectingView = n),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get rootNodes() {
          const t = this._lView,
            n = t[1];
          return Mi(n, t, n.firstChild, []);
        }
        get context() {
          return this._lView[8];
        }
        set context(t) {
          this._lView[8] = t;
        }
        get destroyed() {
          return 256 == (256 & this._lView[2]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[3];
            if (rt(t)) {
              const n = t[8],
                r = n ? n.indexOf(this) : -1;
              r > -1 && (va(t, r), Zo(n, r));
            }
            this._attachedToViewContainer = !1;
          }
          Zd(this._lView[1], this._lView);
        }
        onDestroy(t) {
          !(function xf(e, t, n, r) {
            const o = jf(t);
            null === n
              ? o.push(r)
              : (o.push(n), e.firstCreatePass && $f(e).push(r, o.length - 1));
          })(this._lView[1], this._lView, null, t);
        }
        markForCheck() {
          Ua(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[2] &= -129;
        }
        reattach() {
          this._lView[2] |= 128;
        }
        detectChanges() {
          qa(this._lView[1], this._lView, this.context);
        }
        checkNoChanges() {
          !(function ME(e, t, n) {
            ko(!0);
            try {
              qa(e, t, n);
            } finally {
              ko(!1);
            }
          })(this._lView[1], this._lView, this.context);
        }
        attachToViewContainerRef() {
          if (this._appRef) throw new B(902, "");
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function CC(e, t) {
              Gr(e, t, t[P], 2, null, null);
            })(this._lView[1], this._lView);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new B(902, "");
          this._appRef = t;
        }
      }
      class A0 extends ro {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          Hf(this._view);
        }
        checkNoChanges() {
          !(function AE(e) {
            ko(!0);
            try {
              Hf(e);
            } finally {
              ko(!1);
            }
          })(this._view);
        }
        get context() {
          return null;
        }
      }
      class tg extends no {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const n = De(t);
          return new Cu(n, this.ngModule);
        }
      }
      function ng(e) {
        const t = [];
        for (let n in e)
          e.hasOwnProperty(n) && t.push({ propName: e[n], templateName: n });
        return t;
      }
      const S0 = new V("SCHEDULER_TOKEN", {
        providedIn: "root",
        factory: () => jd,
      });
      class Cu extends Yp {
        constructor(t, n) {
          super(),
            (this.componentDef = t),
            (this.ngModule = n),
            (this.componentType = t.type),
            (this.selector = (function jC(e) {
              return e.map(HC).join(",");
            })(t.selectors)),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!n);
        }
        get inputs() {
          return ng(this.componentDef.inputs);
        }
        get outputs() {
          return ng(this.componentDef.outputs);
        }
        create(t, n, r, o) {
          const i = (o = o || this.ngModule)
              ? (function T0(e, t) {
                  return {
                    get: (n, r, o) => {
                      const i = e.get(n, vu, o);
                      return i !== vu || r === vu ? i : t.get(n, r, o);
                    },
                  };
                })(t, o.injector)
              : t,
            s = i.get(eg, kc),
            a = i.get(b0, null),
            u = s.createRenderer(null, this.componentDef),
            l = this.componentDef.selectors[0][0] || "div",
            c = r
              ? (function Ff(e, t, n) {
                  if (ne(e)) return e.selectRootElement(t, n === mt.ShadowDom);
                  let r = "string" == typeof t ? e.querySelector(t) : t;
                  return (r.textContent = ""), r;
                })(u, r, this.componentDef.encapsulation)
              : _a(
                  s.createRenderer(null, this.componentDef),
                  l,
                  (function I0(e) {
                    const t = e.toLowerCase();
                    return "svg" === t ? "svg" : "math" === t ? "math" : null;
                  })(l)
                ),
            d = this.componentDef.onPush ? 576 : 528,
            f = (function uh(e, t) {
              return {
                components: [],
                scheduler: e || jd,
                clean: IE,
                playerHandler: t || null,
                flags: 0,
              };
            })(),
            h = ci(0, null, null, 1, 0, null, null, null, null, null),
            p = qr(null, h, f, d, null, null, s, u, a, i);
          let m, _;
          Lo(p);
          try {
            const D = (function sh(e, t, n, r, o, i) {
              const s = n[1];
              n[20] = e;
              const u = Zn(s, 20, 2, "#host", null),
                l = (u.mergedAttrs = t.hostAttrs);
              null !== l &&
                (fi(u, l, !0),
                null !== e &&
                  (Uo(o, e, l),
                  null !== u.classes && Ma(o, e, u.classes),
                  null !== u.styles && uf(o, e, u.styles)));
              const c = r.createRenderer(e, t),
                d = qr(
                  n,
                  Sf(t),
                  null,
                  t.onPush ? 64 : 16,
                  n[20],
                  u,
                  r,
                  c,
                  i || null,
                  null
                );
              return (
                s.firstCreatePass &&
                  (Wo(Tr(u, n), s, t.type), Vf(s, u), kf(u, n.length, 1)),
                di(n, d),
                (n[20] = d)
              );
            })(c, this.componentDef, p, s, u);
            if (c)
              if (r) Uo(u, c, ["ng-version", M0.full]);
              else {
                const { attrs: g, classes: w } = (function $C(e) {
                  const t = [],
                    n = [];
                  let r = 1,
                    o = 2;
                  for (; r < e.length; ) {
                    let i = e[r];
                    if ("string" == typeof i)
                      2 === o
                        ? "" !== i && t.push(i, e[++r])
                        : 8 === o && n.push(i);
                    else {
                      if (!it(o)) break;
                      o = i;
                    }
                    r++;
                  }
                  return { attrs: t, classes: n };
                })(this.componentDef.selectors[0]);
                g && Uo(u, c, g), w && w.length > 0 && Ma(u, c, w.join(" "));
              }
            if (((_ = Rs(h, Z)), void 0 !== n)) {
              const g = (_.projection = []);
              for (let w = 0; w < this.ngContentSelectors.length; w++) {
                const F = n[w];
                g.push(null != F ? Array.from(F) : null);
              }
            }
            (m = (function ah(e, t, n, r, o) {
              const i = n[1],
                s = (function lE(e, t, n) {
                  const r = fe();
                  e.firstCreatePass &&
                    (n.providersResolver && n.providersResolver(n),
                    Lf(e, r, t, Kn(e, t, 1, null), n));
                  const o = Fr(t, e, r.directiveStart, r);
                  Ce(o, t);
                  const i = Ze(r, t);
                  return i && Ce(i, t), o;
                })(i, n, t);
              if (
                (r.components.push(s),
                (e[8] = s),
                o && o.forEach((u) => u(s, t)),
                t.contentQueries)
              ) {
                const u = fe();
                t.contentQueries(1, s, u.directiveStart);
              }
              const a = fe();
              return (
                !i.firstCreatePass ||
                  (null === t.hostBindings && null === t.hostAttrs) ||
                  (Wt(a.index),
                  Of(n[1], a, 0, a.directiveStart, a.directiveEnd, t),
                  Rf(t, s)),
                s
              );
            })(D, this.componentDef, p, f, [WE])),
              zr(h, p, null);
          } finally {
            Bo();
          }
          return new x0(this.componentType, m, gr(_, p), p, _);
        }
      }
      class x0 extends class y0 {} {
        constructor(t, n, r, o, i) {
          super(),
            (this.location = r),
            (this._rootLView = o),
            (this._tNode = i),
            (this.instance = n),
            (this.hostView = this.changeDetectorRef = new A0(o)),
            (this.componentType = t);
        }
        get injector() {
          return new Vn(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      class mr {}
      const yr = new Map();
      class ig extends mr {
        constructor(t, n) {
          super(),
            (this._parent = n),
            (this._bootstrapComponents = []),
            (this.injector = this),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new tg(this));
          const r = ze(t);
          (this._bootstrapComponents = Et(r.bootstrap)),
            (this._r3Injector = Zf(
              t,
              n,
              [
                { provide: mr, useValue: this },
                { provide: no, useValue: this.componentFactoryResolver },
              ],
              $(t)
            )),
            this._r3Injector._resolveInjectorDefTypes(),
            (this.instance = this.get(t));
        }
        get(t, n = Re.THROW_IF_NOT_FOUND, r = N.Default) {
          return t === Re || t === mr || t === Wa
            ? this
            : this._r3Injector.get(t, n, r);
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((n) => n()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class Eu extends class P0 {} {
        constructor(t) {
          super(),
            (this.moduleType = t),
            null !== ze(t) &&
              (function O0(e) {
                const t = new Set();
                !(function n(r) {
                  const o = ze(r, !0),
                    i = o.id;
                  null !== i &&
                    ((function rg(e, t, n) {
                      if (t && t !== n)
                        throw new Error(
                          `Duplicate module registered for ${e} - ${$(
                            t
                          )} vs ${$(t.name)}`
                        );
                    })(i, yr.get(i), r),
                    yr.set(i, r));
                  const s = Et(o.imports);
                  for (const a of s) t.has(a) || (t.add(a), n(a));
                })(e);
              })(t);
        }
        create(t) {
          return new ig(this.moduleType, t);
        }
      }
      function sg(e, t, n, r) {
        return (function ag(e, t, n, r, o, i) {
          const s = t + n;
          return Ee(e, s, o)
            ? (function bt(e, t, n) {
                return (e[t] = n);
              })(e, s + 1, i ? r.call(i, o) : r(o))
            : (function oo(e, t) {
                const n = e[t];
                return n === T ? void 0 : n;
              })(e, s + 1);
        })(
          y(),
          (function Ie() {
            const e = A.lFrame;
            let t = e.bindingRootIndex;
            return (
              -1 === t && (t = e.bindingRootIndex = e.tView.bindingStartIndex),
              t
            );
          })(),
          e,
          t,
          n,
          r
        );
      }
      function wu(e) {
        return (t) => {
          setTimeout(e, void 0, t);
        };
      }
      const we = class J0 extends fs {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, n, r) {
          var o, i, s;
          let a = t,
            u = n || (() => null),
            l = r;
          if (t && "object" == typeof t) {
            const d = t;
            (a = null === (o = d.next) || void 0 === o ? void 0 : o.bind(d)),
              (u = null === (i = d.error) || void 0 === i ? void 0 : i.bind(d)),
              (l =
                null === (s = d.complete) || void 0 === s ? void 0 : s.bind(d));
          }
          this.__isAsync && ((u = wu(u)), a && (a = wu(a)), l && (l = wu(l)));
          const c = super.subscribe({ next: a, error: u, complete: l });
          return t instanceof gt && t.add(c), c;
        }
      };
      Symbol;
      let Bt = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = tM), e;
      })();
      const X0 = Bt,
        eM = class extends X0 {
          constructor(t, n, r) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = n),
              (this.elementRef = r);
          }
          createEmbeddedView(t) {
            const n = this._declarationTContainer.tViews,
              r = qr(
                this._declarationLView,
                n,
                t,
                16,
                null,
                n.declTNode,
                null,
                null,
                null,
                null
              );
            r[17] = this._declarationLView[this._declarationTContainer.index];
            const i = this._declarationLView[19];
            return (
              null !== i && (r[19] = i.createEmbeddedView(n)),
              zr(n, r, t),
              new ro(r)
            );
          }
        };
      function tM() {
        return (function Ai(e, t) {
          return 4 & e.type ? new eM(t, e, gr(e, t)) : null;
        })(fe(), y());
      }
      let St = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = nM), e;
      })();
      function nM() {
        return (function pg(e, t) {
          let n;
          const r = t[e.index];
          if (rt(r)) n = r;
          else {
            let o;
            if (8 & e.type) o = ae(r);
            else {
              const i = t[P];
              o = i.createComment("");
              const s = Ze(e, t);
              Dn(
                i,
                oi(i, s),
                o,
                (function SC(e, t) {
                  return ne(e) ? e.nextSibling(t) : t.nextSibling;
                })(i, s),
                !1
              );
            }
            (t[e.index] = n = Bf(r, t, o, e)), di(t, n);
          }
          return new fg(n, e, t);
        })(fe(), y());
      }
      const rM = St,
        fg = class extends rM {
          constructor(t, n, r) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = n),
              (this._hostLView = r);
          }
          get element() {
            return gr(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new Vn(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = zo(this._hostTNode, this._hostLView);
            if (ed(t)) {
              const n = Rn(t, this._hostLView),
                r = On(t);
              return new Vn(n[1].data[r + 8], n);
            }
            return new Vn(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const n = hg(this._lContainer);
            return (null !== n && n[t]) || null;
          }
          get length() {
            return this._lContainer.length - 10;
          }
          createEmbeddedView(t, n, r) {
            const o = t.createEmbeddedView(n || {});
            return this.insert(o, r), o;
          }
          createComponent(t, n, r, o, i) {
            const s =
              t &&
              !(function Nr(e) {
                return "function" == typeof e;
              })(t);
            let a;
            if (s) a = n;
            else {
              const d = n || {};
              (a = d.index),
                (r = d.injector),
                (o = d.projectableNodes),
                (i = d.ngModuleRef);
            }
            const u = s ? t : new Cu(De(t)),
              l = r || this.parentInjector;
            if (!i && null == u.ngModule) {
              const f = (s ? l : this.parentInjector).get(mr, null);
              f && (i = f);
            }
            const c = u.create(l, o, void 0, i);
            return this.insert(c.hostView, a), c;
          }
          insert(t, n) {
            const r = t._lView,
              o = r[1];
            if (
              (function C_(e) {
                return rt(e[3]);
              })(r)
            ) {
              const c = this.indexOf(t);
              if (-1 !== c) this.detach(c);
              else {
                const d = r[3],
                  f = new fg(d, d[6], d[3]);
                f.detach(f.indexOf(t));
              }
            }
            const i = this._adjustIndex(n),
              s = this._lContainer;
            !(function wC(e, t, n, r) {
              const o = 10 + r,
                i = n.length;
              r > 0 && (n[o - 1][4] = t),
                r < i - 10
                  ? ((t[4] = n[o]), cd(n, 10 + r, t))
                  : (n.push(t), (t[4] = null)),
                (t[3] = n);
              const s = t[17];
              null !== s &&
                n !== s &&
                (function bC(e, t) {
                  const n = e[9];
                  t[16] !== t[3][3][16] && (e[2] = !0),
                    null === n ? (e[9] = [t]) : n.push(t);
                })(s, t);
              const a = t[19];
              null !== a && a.insertView(e), (t[2] |= 128);
            })(o, r, s, i);
            const a = wa(i, s),
              u = r[P],
              l = oi(u, s[7]);
            return (
              null !== l &&
                (function vC(e, t, n, r, o, i) {
                  (r[0] = o), (r[6] = t), Gr(e, r, n, 1, o, i);
                })(o, s[6], u, r, l, a),
              t.attachToViewContainerRef(),
              cd(Mu(s), i, t),
              t
            );
          }
          move(t, n) {
            return this.insert(t, n);
          }
          indexOf(t) {
            const n = hg(this._lContainer);
            return null !== n ? n.indexOf(t) : -1;
          }
          remove(t) {
            const n = this._adjustIndex(t, -1),
              r = va(this._lContainer, n);
            r && (Zo(Mu(this._lContainer), n), Zd(r[1], r));
          }
          detach(t) {
            const n = this._adjustIndex(t, -1),
              r = va(this._lContainer, n);
            return r && null != Zo(Mu(this._lContainer), n) ? new ro(r) : null;
          }
          _adjustIndex(t, n = 0) {
            return null == t ? this.length + n : t;
          }
        };
      function hg(e) {
        return e[8];
      }
      function Mu(e) {
        return e[8] || (e[8] = []);
      }
      function Ti(...e) {}
      const Vu = new V("Application Initializer");
      let _r = (() => {
        class e {
          constructor(n) {
            (this.appInits = n),
              (this.resolve = Ti),
              (this.reject = Ti),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((r, o) => {
                (this.resolve = r), (this.reject = o);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const n = [],
              r = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let o = 0; o < this.appInits.length; o++) {
                const i = this.appInits[o]();
                if (mi(i)) n.push(i);
                else if (Nh(i)) {
                  const s = new Promise((a, u) => {
                    i.subscribe({ complete: a, error: u });
                  });
                  n.push(s);
                }
              }
            Promise.all(n)
              .then(() => {
                r();
              })
              .catch((o) => {
                this.reject(o);
              }),
              0 === n.length && r(),
              (this.initialized = !0);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(L(Vu, 8));
          }),
          (e.ɵprov = U({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const ao = new V("AppId"),
        OM = {
          provide: ao,
          useFactory: function PM() {
            return `${ku()}${ku()}${ku()}`;
          },
          deps: [],
        };
      function ku() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const Vg = new V("Platform Initializer"),
        Fi = new V("Platform ID"),
        RM = new V("appBootstrapListener");
      let VM = (() => {
        class e {
          log(n) {
            console.log(n);
          }
          warn(n) {
            console.warn(n);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = U({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const Xt = new V("LocaleId"),
        kg = new V("DefaultCurrencyCode");
      class kM {
        constructor(t, n) {
          (this.ngModuleFactory = t), (this.componentFactories = n);
        }
      }
      let Lg = (() => {
        class e {
          compileModuleSync(n) {
            return new Eu(n);
          }
          compileModuleAsync(n) {
            return Promise.resolve(this.compileModuleSync(n));
          }
          compileModuleAndAllComponentsSync(n) {
            const r = this.compileModuleSync(n),
              i = Et(ze(n).declarations).reduce((s, a) => {
                const u = De(a);
                return u && s.push(new Cu(u)), s;
              }, []);
            return new kM(r, i);
          }
          compileModuleAndAllComponentsAsync(n) {
            return Promise.resolve(this.compileModuleAndAllComponentsSync(n));
          }
          clearCache() {}
          clearCacheFor(n) {}
          getModuleId(n) {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = U({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const BM = (() => Promise.resolve(0))();
      function Lu(e) {
        "undefined" == typeof Zone
          ? BM.then(() => {
              e && e.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", e);
      }
      class be {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: n = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new we(!1)),
            (this.onMicrotaskEmpty = new we(!1)),
            (this.onStable = new we(!1)),
            (this.onError = new we(!1)),
            "undefined" == typeof Zone)
          )
            throw new Error("In this configuration Angular requires Zone.js");
          Zone.assertZonePatched();
          const o = this;
          (o._nesting = 0),
            (o._outer = o._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
            (o.shouldCoalesceEventChangeDetection = !r && n),
            (o.shouldCoalesceRunChangeDetection = r),
            (o.lastRequestAnimationFrameId = -1),
            (o.nativeRequestAnimationFrame = (function HM() {
              let e = q.requestAnimationFrame,
                t = q.cancelAnimationFrame;
              if ("undefined" != typeof Zone && e && t) {
                const n = e[Zone.__symbol__("OriginalDelegate")];
                n && (e = n);
                const r = t[Zone.__symbol__("OriginalDelegate")];
                r && (t = r);
              }
              return {
                nativeRequestAnimationFrame: e,
                nativeCancelAnimationFrame: t,
              };
            })().nativeRequestAnimationFrame),
            (function UM(e) {
              const t = () => {
                !(function $M(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId =
                      e.nativeRequestAnimationFrame.call(q, () => {
                        e.fakeTopEventTask ||
                          (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (e.lastRequestAnimationFrameId = -1),
                                Hu(e),
                                (e.isCheckStableRunning = !0),
                                Bu(e),
                                (e.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          e.fakeTopEventTask.invoke();
                      })),
                    Hu(e));
                })(e);
              };
              e._inner = e._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, o, i, s, a) => {
                  try {
                    return Bg(e), n.invokeTask(o, i, s, a);
                  } finally {
                    ((e.shouldCoalesceEventChangeDetection &&
                      "eventTask" === i.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      t(),
                      Hg(e);
                  }
                },
                onInvoke: (n, r, o, i, s, a, u) => {
                  try {
                    return Bg(e), n.invoke(o, i, s, a, u);
                  } finally {
                    e.shouldCoalesceRunChangeDetection && t(), Hg(e);
                  }
                },
                onHasTask: (n, r, o, i) => {
                  n.hasTask(o, i),
                    r === o &&
                      ("microTask" == i.change
                        ? ((e._hasPendingMicrotasks = i.microTask),
                          Hu(e),
                          Bu(e))
                        : "macroTask" == i.change &&
                          (e.hasPendingMacrotasks = i.macroTask));
                },
                onHandleError: (n, r, o, i) => (
                  n.handleError(o, i),
                  e.runOutsideAngular(() => e.onError.emit(i)),
                  !1
                ),
              });
            })(o);
        }
        static isInAngularZone() {
          return (
            "undefined" != typeof Zone &&
            !0 === Zone.current.get("isAngularZone")
          );
        }
        static assertInAngularZone() {
          if (!be.isInAngularZone())
            throw new Error("Expected to be in Angular Zone, but it is not!");
        }
        static assertNotInAngularZone() {
          if (be.isInAngularZone())
            throw new Error("Expected to not be in Angular Zone, but it is!");
        }
        run(t, n, r) {
          return this._inner.run(t, n, r);
        }
        runTask(t, n, r, o) {
          const i = this._inner,
            s = i.scheduleEventTask("NgZoneEvent: " + o, t, jM, Ti, Ti);
          try {
            return i.runTask(s, n, r);
          } finally {
            i.cancelTask(s);
          }
        }
        runGuarded(t, n, r) {
          return this._inner.runGuarded(t, n, r);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const jM = {};
      function Bu(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null));
              } finally {
                e.isStable = !0;
              }
          }
      }
      function Hu(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        );
      }
      function Bg(e) {
        e._nesting++,
          e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function Hg(e) {
        e._nesting--, Bu(e);
      }
      class GM {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new we()),
            (this.onMicrotaskEmpty = new we()),
            (this.onStable = new we()),
            (this.onError = new we());
        }
        run(t, n, r) {
          return t.apply(n, r);
        }
        runGuarded(t, n, r) {
          return t.apply(n, r);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, n, r, o) {
          return t.apply(n, r);
        }
      }
      let ju = (() => {
          class e {
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
                      be.assertNotInAngularZone(),
                        Lu(() => {
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
                Lu(() => {
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
            addCallback(n, r, o) {
              let i = -1;
              r &&
                r > 0 &&
                (i = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (s) => s.timeoutId !== i
                  )),
                    n(this._didWork, this.getPendingTasks());
                }, r)),
                this._callbacks.push({ doneCb: n, timeoutId: i, updateCb: o });
            }
            whenStable(n, r, o) {
              if (o && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(n, r, o), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            findProviders(n, r, o) {
              return [];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(L(be));
            }),
            (e.ɵprov = U({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        jg = (() => {
          class e {
            constructor() {
              (this._applications = new Map()), $u.addToWindow(this);
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
              return $u.findTestabilityInTree(this, n, r);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = U({ token: e, factory: e.ɵfac })),
            e
          );
        })();
      class qM {
        addToWindow(t) {}
        findTestabilityInTree(t, n, r) {
          return null;
        }
      }
      let dt,
        $u = new qM();
      const $g = new V("AllowMultipleToken");
      function Ug(e, t, n = []) {
        const r = `Platform: ${t}`,
          o = new V(r);
        return (i = []) => {
          let s = Gg();
          if (!s || s.injector.get($g, !1))
            if (e) e(n.concat(i).concat({ provide: o, useValue: !0 }));
            else {
              const a = n
                .concat(i)
                .concat(
                  { provide: o, useValue: !0 },
                  { provide: Qa, useValue: "platform" }
                );
              !(function ZM(e) {
                if (dt && !dt.destroyed && !dt.injector.get($g, !1))
                  throw new B(400, "");
                dt = e.get(qg);
                const t = e.get(Vg, null);
                t && t.forEach((n) => n());
              })(Re.create({ providers: a, name: r }));
            }
          return (function KM(e) {
            const t = Gg();
            if (!t) throw new B(401, "");
            return t;
          })();
        };
      }
      function Gg() {
        return dt && !dt.destroyed ? dt : null;
      }
      let qg = (() => {
        class e {
          constructor(n) {
            (this._injector = n),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(n, r) {
            const a = (function JM(e, t) {
                let n;
                return (
                  (n =
                    "noop" === e
                      ? new GM()
                      : ("zone.js" === e ? void 0 : e) ||
                        new be({
                          enableLongStackTrace: !1,
                          shouldCoalesceEventChangeDetection: !!(null == t
                            ? void 0
                            : t.ngZoneEventCoalescing),
                          shouldCoalesceRunChangeDetection: !!(null == t
                            ? void 0
                            : t.ngZoneRunCoalescing),
                        })),
                  n
                );
              })(r ? r.ngZone : void 0, {
                ngZoneEventCoalescing: (r && r.ngZoneEventCoalescing) || !1,
                ngZoneRunCoalescing: (r && r.ngZoneRunCoalescing) || !1,
              }),
              u = [{ provide: be, useValue: a }];
            return a.run(() => {
              const l = Re.create({
                  providers: u,
                  parent: this.injector,
                  name: n.moduleType.name,
                }),
                c = n.create(l),
                d = c.injector.get(qn, null);
              if (!d) throw new B(402, "");
              return (
                a.runOutsideAngular(() => {
                  const f = a.onError.subscribe({
                    next: (h) => {
                      d.handleError(h);
                    },
                  });
                  c.onDestroy(() => {
                    Uu(this._modules, c), f.unsubscribe();
                  });
                }),
                (function YM(e, t, n) {
                  try {
                    const r = n();
                    return mi(r)
                      ? r.catch((o) => {
                          throw (
                            (t.runOutsideAngular(() => e.handleError(o)), o)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (t.runOutsideAngular(() => e.handleError(r)), r);
                  }
                })(d, a, () => {
                  const f = c.injector.get(_r);
                  return (
                    f.runInitializers(),
                    f.donePromise.then(
                      () => (
                        (function Cb(e) {
                          Le(e, "Expected localeId to be defined"),
                            "string" == typeof e &&
                              (Ip = e.toLowerCase().replace(/_/g, "-"));
                        })(c.injector.get(Xt, _i) || _i),
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
            const o = zg({}, r);
            return (function WM(e, t, n) {
              const r = new Eu(n);
              return Promise.resolve(r);
            })(0, 0, n).then((i) => this.bootstrapModuleFactory(i, o));
          }
          _moduleDoBootstrap(n) {
            const r = n.injector.get(xi);
            if (n._bootstrapComponents.length > 0)
              n._bootstrapComponents.forEach((o) => r.bootstrap(o));
            else {
              if (!n.instance.ngDoBootstrap) throw new B(403, "");
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
            if (this._destroyed) throw new B(404, "");
            this._modules.slice().forEach((n) => n.destroy()),
              this._destroyListeners.forEach((n) => n()),
              (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(L(Re));
          }),
          (e.ɵprov = U({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function zg(e, t) {
        return Array.isArray(t)
          ? t.reduce(zg, e)
          : Object.assign(Object.assign({}, e), t);
      }
      let xi = (() => {
        class e {
          constructor(n, r, o, i, s) {
            (this._zone = n),
              (this._injector = r),
              (this._exceptionHandler = o),
              (this._componentFactoryResolver = i),
              (this._initStatus = s),
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
            const a = new ye((l) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    l.next(this._stable), l.complete();
                  });
              }),
              u = new ye((l) => {
                let c;
                this._zone.runOutsideAngular(() => {
                  c = this._zone.onStable.subscribe(() => {
                    be.assertNotInAngularZone(),
                      Lu(() => {
                        !this._stable &&
                          !this._zone.hasPendingMacrotasks &&
                          !this._zone.hasPendingMicrotasks &&
                          ((this._stable = !0), l.next(!0));
                      });
                  });
                });
                const d = this._zone.onUnstable.subscribe(() => {
                  be.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        l.next(!1);
                      }));
                });
                return () => {
                  c.unsubscribe(), d.unsubscribe();
                };
              });
            this.isStable = (function BD(...e) {
              const t = _c(e),
                n = (function ND(e, t) {
                  return "number" == typeof gs(e) ? e.pop() : t;
                })(e, 1 / 0),
                r = e;
              return r.length
                ? 1 === r.length
                  ? fn(r[0])
                  : (function SD(e = 1 / 0) {
                      return Mo(nc, e);
                    })(n)(Ao(r, t))
                : ps;
            })(
              a,
              u.pipe(
                (function jD(e = {}) {
                  const {
                    connector: t = () => new fs(),
                    resetOnError: n = !0,
                    resetOnComplete: r = !0,
                    resetOnRefCountZero: o = !0,
                  } = e;
                  return (i) => {
                    let s = null,
                      a = null,
                      u = null,
                      l = 0,
                      c = !1,
                      d = !1;
                    const f = () => {
                        null == a || a.unsubscribe(), (a = null);
                      },
                      h = () => {
                        f(), (s = u = null), (c = d = !1);
                      },
                      p = () => {
                        const m = s;
                        h(), null == m || m.unsubscribe();
                      };
                    return un((m, _) => {
                      l++, !d && !c && f();
                      const D = (u = null != u ? u : t());
                      _.add(() => {
                        l--, 0 === l && !d && !c && (a = ms(p, o));
                      }),
                        D.subscribe(_),
                        s ||
                          ((s = new wo({
                            next: (g) => D.next(g),
                            error: (g) => {
                              (d = !0), f(), (a = ms(h, n, g)), D.error(g);
                            },
                            complete: () => {
                              (c = !0), f(), (a = ms(h, r)), D.complete();
                            },
                          })),
                          Ao(m).subscribe(s));
                    })(i);
                  };
                })()
              )
            );
          }
          bootstrap(n, r) {
            if (!this._initStatus.done) throw new B(405, "");
            let o;
            (o =
              n instanceof Yp
                ? n
                : this._componentFactoryResolver.resolveComponentFactory(n)),
              this.componentTypes.push(o.componentType);
            const i = (function QM(e) {
                return e.isBoundToModule;
              })(o)
                ? void 0
                : this._injector.get(mr),
              a = o.create(Re.NULL, [], r || o.selector, i),
              u = a.location.nativeElement,
              l = a.injector.get(ju, null),
              c = l && a.injector.get(jg);
            return (
              l && c && c.registerApplication(u, l),
              a.onDestroy(() => {
                this.detachView(a.hostView),
                  Uu(this.components, a),
                  c && c.unregisterApplication(u);
              }),
              this._loadComponent(a),
              a
            );
          }
          tick() {
            if (this._runningTick) throw new B(101, "");
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
            Uu(this._views, r), r.detachFromAppRef();
          }
          _loadComponent(n) {
            this.attachView(n.hostView),
              this.tick(),
              this.components.push(n),
              this._injector
                .get(RM, [])
                .concat(this._bootstrapListeners)
                .forEach((o) => o(n));
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
          (e.ɵfac = function (n) {
            return new (n || e)(L(be), L(Re), L(qn), L(no), L(_r));
          }),
          (e.ɵprov = U({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function Uu(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      let Qg = !0,
        Jg = (() => {
          class e {}
          return (e.__NG_ELEMENT_ID__ = tA), e;
        })();
      function tA(e) {
        return (function nA(e, t, n) {
          if (Po(e) && !n) {
            const r = He(e.index, t);
            return new ro(r, r);
          }
          return 47 & e.type ? new ro(t[16], t) : null;
        })(fe(), y(), 16 == (16 & e));
      }
      class em {
        constructor() {}
        supports(t) {
          return Qr(t);
        }
        create(t) {
          return new uA(t);
        }
      }
      const aA = (e, t) => t;
      class uA {
        constructor(t) {
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
            (this._trackByFn = t || aA);
        }
        forEachItem(t) {
          let n;
          for (n = this._itHead; null !== n; n = n._next) t(n);
        }
        forEachOperation(t) {
          let n = this._itHead,
            r = this._removalsHead,
            o = 0,
            i = null;
          for (; n || r; ) {
            const s = !r || (n && n.currentIndex < nm(r, o, i)) ? n : r,
              a = nm(s, o, i),
              u = s.currentIndex;
            if (s === r) o--, (r = r._nextRemoved);
            else if (((n = n._next), null == s.previousIndex)) o++;
            else {
              i || (i = []);
              const l = a - o,
                c = u - o;
              if (l != c) {
                for (let f = 0; f < l; f++) {
                  const h = f < i.length ? i[f] : (i[f] = 0),
                    p = h + f;
                  c <= p && p < l && (i[f] = h + 1);
                }
                i[s.previousIndex] = c - l;
              }
            }
            a !== u && t(s, a, u);
          }
        }
        forEachPreviousItem(t) {
          let n;
          for (n = this._previousItHead; null !== n; n = n._nextPrevious) t(n);
        }
        forEachAddedItem(t) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
        }
        forEachMovedItem(t) {
          let n;
          for (n = this._movesHead; null !== n; n = n._nextMoved) t(n);
        }
        forEachRemovedItem(t) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
        }
        forEachIdentityChange(t) {
          let n;
          for (
            n = this._identityChangesHead;
            null !== n;
            n = n._nextIdentityChange
          )
            t(n);
        }
        diff(t) {
          if ((null == t && (t = []), !Qr(t))) throw new B(900, "");
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let o,
            i,
            s,
            n = this._itHead,
            r = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let a = 0; a < this.length; a++)
              (i = t[a]),
                (s = this._trackByFn(a, i)),
                null !== n && Object.is(n.trackById, s)
                  ? (r && (n = this._verifyReinsertion(n, i, s, a)),
                    Object.is(n.item, i) || this._addIdentityChange(n, i))
                  : ((n = this._mismatch(n, i, s, a)), (r = !0)),
                (n = n._next);
          } else
            (o = 0),
              (function rw(e, t) {
                if (Array.isArray(e))
                  for (let n = 0; n < e.length; n++) t(e[n]);
                else {
                  const n = e[er()]();
                  let r;
                  for (; !(r = n.next()).done; ) t(r.value);
                }
              })(t, (a) => {
                (s = this._trackByFn(o, a)),
                  null !== n && Object.is(n.trackById, s)
                    ? (r && (n = this._verifyReinsertion(n, a, s, o)),
                      Object.is(n.item, a) || this._addIdentityChange(n, a))
                    : ((n = this._mismatch(n, a, s, o)), (r = !0)),
                  (n = n._next),
                  o++;
              }),
              (this.length = o);
          return this._truncate(n), (this.collection = t), this.isDirty;
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
            let t;
            for (
              t = this._previousItHead = this._itHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded)
              t.previousIndex = t.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                t = this._movesHead;
              null !== t;
              t = t._nextMoved
            )
              t.previousIndex = t.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, n, r, o) {
          let i;
          return (
            null === t ? (i = this._itTail) : ((i = t._prev), this._remove(t)),
            null !==
            (t =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(r, null))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._reinsertAfter(t, i, o))
              : null !==
                (t =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(r, o))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._moveAfter(t, i, o))
              : (t = this._addAfter(new lA(n, r), i, o)),
            t
          );
        }
        _verifyReinsertion(t, n, r, o) {
          let i =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(r, null);
          return (
            null !== i
              ? (t = this._reinsertAfter(i, t._prev, o))
              : t.currentIndex != o &&
                ((t.currentIndex = o), this._addToMoves(t, o)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const n = t._next;
            this._addToRemovals(this._unlink(t)), (t = n);
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
        _reinsertAfter(t, n, r) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const o = t._prevRemoved,
            i = t._nextRemoved;
          return (
            null === o ? (this._removalsHead = i) : (o._nextRemoved = i),
            null === i ? (this._removalsTail = o) : (i._prevRemoved = o),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _moveAfter(t, n, r) {
          return (
            this._unlink(t),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _addAfter(t, n, r) {
          return (
            this._insertAfter(t, n, r),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = t)
                : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, n, r) {
          const o = null === n ? this._itHead : n._next;
          return (
            (t._next = o),
            (t._prev = n),
            null === o ? (this._itTail = t) : (o._prev = t),
            null === n ? (this._itHead = t) : (n._next = t),
            null === this._linkedRecords && (this._linkedRecords = new tm()),
            this._linkedRecords.put(t),
            (t.currentIndex = r),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const n = t._prev,
            r = t._next;
          return (
            null === n ? (this._itHead = r) : (n._next = r),
            null === r ? (this._itTail = n) : (r._prev = n),
            t
          );
        }
        _addToMoves(t, n) {
          return (
            t.previousIndex === n ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = t)
                  : (this._movesTail._nextMoved = t)),
            t
          );
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new tm()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t),
                (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          );
        }
        _addIdentityChange(t, n) {
          return (
            (t.item = n),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class lA {
        constructor(t, n) {
          (this.item = t),
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
      class cA {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t),
              (t._nextDup = null),
              (t._prevDup = null))
            : ((this._tail._nextDup = t),
              (t._prevDup = this._tail),
              (t._nextDup = null),
              (this._tail = t));
        }
        get(t, n) {
          let r;
          for (r = this._head; null !== r; r = r._nextDup)
            if (
              (null === n || n <= r.currentIndex) &&
              Object.is(r.trackById, t)
            )
              return r;
          return null;
        }
        remove(t) {
          const n = t._prevDup,
            r = t._nextDup;
          return (
            null === n ? (this._head = r) : (n._nextDup = r),
            null === r ? (this._tail = n) : (r._prevDup = n),
            null === this._head
          );
        }
      }
      class tm {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const n = t.trackById;
          let r = this.map.get(n);
          r || ((r = new cA()), this.map.set(n, r)), r.add(t);
        }
        get(t, n) {
          const o = this.map.get(t);
          return o ? o.get(t, n) : null;
        }
        remove(t) {
          const n = t.trackById;
          return this.map.get(n).remove(t) && this.map.delete(n), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function nm(e, t, n) {
        const r = e.previousIndex;
        if (null === r) return r;
        let o = 0;
        return n && r < n.length && (o = n[r]), r + t + o;
      }
      class rm {
        constructor() {}
        supports(t) {
          return t instanceof Map || eu(t);
        }
        create() {
          return new dA();
        }
      }
      class dA {
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
        forEachItem(t) {
          let n;
          for (n = this._mapHead; null !== n; n = n._next) t(n);
        }
        forEachPreviousItem(t) {
          let n;
          for (n = this._previousMapHead; null !== n; n = n._nextPrevious) t(n);
        }
        forEachChangedItem(t) {
          let n;
          for (n = this._changesHead; null !== n; n = n._nextChanged) t(n);
        }
        forEachAddedItem(t) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
        }
        forEachRemovedItem(t) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
        }
        diff(t) {
          if (t) {
            if (!(t instanceof Map || eu(t))) throw new B(900, "");
          } else t = new Map();
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let n = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(t, (r, o) => {
              if (n && n.key === o)
                this._maybeAddToChanges(n, r),
                  (this._appendAfter = n),
                  (n = n._next);
              else {
                const i = this._getOrCreateRecordForKey(o, r);
                n = this._insertBeforeOrAppend(n, i);
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
        _insertBeforeOrAppend(t, n) {
          if (t) {
            const r = t._prev;
            return (
              (n._next = t),
              (n._prev = r),
              (t._prev = n),
              r && (r._next = n),
              t === this._mapHead && (this._mapHead = n),
              (this._appendAfter = t),
              t
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
        _getOrCreateRecordForKey(t, n) {
          if (this._records.has(t)) {
            const o = this._records.get(t);
            this._maybeAddToChanges(o, n);
            const i = o._prev,
              s = o._next;
            return (
              i && (i._next = s),
              s && (s._prev = i),
              (o._next = null),
              (o._prev = null),
              o
            );
          }
          const r = new fA(t);
          return (
            this._records.set(t, r),
            (r.currentValue = n),
            this._addToAdditions(r),
            r
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              this._previousMapHead = this._mapHead, t = this._previousMapHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._changesHead; null !== t; t = t._nextChanged)
              t.previousValue = t.currentValue;
            for (t = this._additionsHead; null != t; t = t._nextAdded)
              t.previousValue = t.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(t, n) {
          Object.is(n, t.currentValue) ||
            ((t.previousValue = t.currentValue),
            (t.currentValue = n),
            this._addToChanges(t));
        }
        _addToAdditions(t) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = t)
            : ((this._additionsTail._nextAdded = t), (this._additionsTail = t));
        }
        _addToChanges(t) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = t)
            : ((this._changesTail._nextChanged = t), (this._changesTail = t));
        }
        _forEach(t, n) {
          t instanceof Map
            ? t.forEach(n)
            : Object.keys(t).forEach((r) => n(t[r], r));
        }
      }
      class fA {
        constructor(t) {
          (this.key = t),
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
      function om() {
        return new Oi([new em()]);
      }
      let Oi = (() => {
        class e {
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (null != r) {
              const o = r.factories.slice();
              n = n.concat(o);
            }
            return new e(n);
          }
          static extend(n) {
            return {
              provide: e,
              useFactory: (r) => e.create(n, r || om()),
              deps: [[e, new kr(), new $n()]],
            };
          }
          find(n) {
            const r = this.factories.find((o) => o.supports(n));
            if (null != r) return r;
            throw new B(901, "");
          }
        }
        return (e.ɵprov = U({ token: e, providedIn: "root", factory: om })), e;
      })();
      function im() {
        return new uo([new rm()]);
      }
      let uo = (() => {
        class e {
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (r) {
              const o = r.factories.slice();
              n = n.concat(o);
            }
            return new e(n);
          }
          static extend(n) {
            return {
              provide: e,
              useFactory: (r) => e.create(n, r || im()),
              deps: [[e, new kr(), new $n()]],
            };
          }
          find(n) {
            const r = this.factories.find((i) => i.supports(n));
            if (r) return r;
            throw new B(901, "");
          }
        }
        return (e.ɵprov = U({ token: e, providedIn: "root", factory: im })), e;
      })();
      const gA = Ug(null, "core", [
          { provide: Fi, useValue: "unknown" },
          { provide: qg, deps: [Re] },
          { provide: jg, deps: [] },
          { provide: VM, deps: [] },
        ]),
        DA = [
          { provide: xi, useClass: xi, deps: [be, Re, qn, no, _r] },
          {
            provide: S0,
            deps: [be],
            useFactory: function _A(e) {
              let t = [];
              return (
                e.onStable.subscribe(() => {
                  for (; t.length; ) t.pop()();
                }),
                function (n) {
                  t.push(n);
                }
              );
            },
          },
          { provide: _r, useClass: _r, deps: [[new $n(), Vu]] },
          { provide: Lg, useClass: Lg, deps: [] },
          OM,
          {
            provide: Xt,
            useFactory: function mA(e) {
              return (
                e ||
                (function yA() {
                  return (
                    ("undefined" != typeof $localize && $localize.locale) || _i
                  );
                })()
              );
            },
            deps: [[new Yo(Xt), new $n(), new kr()]],
          },
          { provide: kg, useValue: "USD" },
        ];
      let vA = (() => {
          class e {
            constructor(n) {}
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(L(xi));
            }),
            (e.ɵmod = yt({ type: e })),
            (e.ɵinj = et({ providers: DA })),
            e
          );
        })(),
        Ri = null;
      function wn() {
        return Ri;
      }
      const ft = new V("DocumentToken");
      var le = (() => (
        ((le = le || {})[(le.Zero = 0)] = "Zero"),
        (le[(le.One = 1)] = "One"),
        (le[(le.Two = 2)] = "Two"),
        (le[(le.Few = 3)] = "Few"),
        (le[(le.Many = 4)] = "Many"),
        (le[(le.Other = 5)] = "Other"),
        le
      ))();
      const PA = function Mp(e) {
        return (function Fe(e) {
          const t = (function yb(e) {
            return e.toLowerCase().replace(/_/g, "-");
          })(e);
          let n = Ap(t);
          if (n) return n;
          const r = t.split("-")[0];
          if (((n = Ap(r)), n)) return n;
          if ("en" === r) return mb;
          throw new Error(`Missing locale data for the locale "${e}".`);
        })(e)[E.PluralCase];
      };
      class qi {}
      let uI = (() => {
        class e extends qi {
          constructor(n) {
            super(), (this.locale = n);
          }
          getPluralCategory(n, r) {
            switch (PA(r || this.locale)(n)) {
              case le.Zero:
                return "zero";
              case le.One:
                return "one";
              case le.Two:
                return "two";
              case le.Few:
                return "few";
              case le.Many:
                return "many";
              default:
                return "other";
            }
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(L(Xt));
          }),
          (e.ɵprov = U({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function mm(e, t) {
        t = encodeURIComponent(t);
        for (const n of e.split(";")) {
          const r = n.indexOf("="),
            [o, i] = -1 == r ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
          if (o.trim() === t) return decodeURIComponent(i);
        }
        return null;
      }
      let ym = (() => {
          class e {
            constructor(n, r, o, i) {
              (this._iterableDiffers = n),
                (this._keyValueDiffers = r),
                (this._ngEl = o),
                (this._renderer = i),
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
                  (Qr(this._rawClass)
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
                    `NgClass can only toggle CSS classes expressed as strings, got ${$(
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
                n.split(/\s+/g).forEach((o) => {
                  r
                    ? this._renderer.addClass(this._ngEl.nativeElement, o)
                    : this._renderer.removeClass(this._ngEl.nativeElement, o);
                });
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(v(Oi), v(uo), v(ct), v(Cn));
            }),
            (e.ɵdir = S({
              type: e,
              selectors: [["", "ngClass", ""]],
              inputs: { klass: ["class", "klass"], ngClass: "ngClass" },
            })),
            e
          );
        })(),
        _m = (() => {
          class e {
            constructor(n, r) {
              (this._viewContainer = n),
                (this._context = new fI()),
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
              vm("ngIfThen", n),
                (this._thenTemplateRef = n),
                (this._thenViewRef = null),
                this._updateView();
            }
            set ngIfElse(n) {
              vm("ngIfElse", n),
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
            (e.ɵfac = function (n) {
              return new (n || e)(v(St), v(Bt));
            }),
            (e.ɵdir = S({
              type: e,
              selectors: [["", "ngIf", ""]],
              inputs: {
                ngIf: "ngIf",
                ngIfThen: "ngIfThen",
                ngIfElse: "ngIfElse",
              },
            })),
            e
          );
        })();
      class fI {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function vm(e, t) {
        if (t && !t.createEmbeddedView)
          throw new Error(
            `${e} must be a TemplateRef, but received '${$(t)}'.`
          );
      }
      let BI = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵmod = yt({ type: e })),
          (e.ɵinj = et({ providers: [{ provide: qi, useClass: uI }] })),
          e
        );
      })();
      class Mm {}
      class sl extends class GI extends class wA {} {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      } {
        static makeCurrent() {
          !(function EA(e) {
            Ri || (Ri = e);
          })(new sl());
        }
        onAndCancel(t, n, r) {
          return (
            t.addEventListener(n, r, !1),
            () => {
              t.removeEventListener(n, r, !1);
            }
          );
        }
        dispatchEvent(t, n) {
          t.dispatchEvent(n);
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t);
        }
        createElement(t, n) {
          return (n = n || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, n) {
          return "window" === n
            ? window
            : "document" === n
            ? t
            : "body" === n
            ? t.body
            : null;
        }
        getBaseHref(t) {
          const n = (function qI() {
            return (
              (fo = fo || document.querySelector("base")),
              fo ? fo.getAttribute("href") : null
            );
          })();
          return null == n
            ? null
            : (function zI(e) {
                (zi = zi || document.createElement("a")),
                  zi.setAttribute("href", e);
                const t = zi.pathname;
                return "/" === t.charAt(0) ? t : `/${t}`;
              })(n);
        }
        resetBaseElement() {
          fo = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(t) {
          return mm(document.cookie, t);
        }
      }
      let zi,
        fo = null;
      const Am = new V("TRANSITION_ID"),
        QI = [
          {
            provide: Vu,
            useFactory: function WI(e, t, n) {
              return () => {
                n.get(_r).donePromise.then(() => {
                  const r = wn(),
                    o = t.querySelectorAll(`style[ng-transition="${e}"]`);
                  for (let i = 0; i < o.length; i++) r.remove(o[i]);
                });
              };
            },
            deps: [Am, ft, Re],
            multi: !0,
          },
        ];
      class al {
        static init() {
          !(function zM(e) {
            $u = e;
          })(new al());
        }
        addToWindow(t) {
          (q.getAngularTestability = (r, o = !0) => {
            const i = t.findTestabilityInTree(r, o);
            if (null == i)
              throw new Error("Could not find testability for element.");
            return i;
          }),
            (q.getAllAngularTestabilities = () => t.getAllTestabilities()),
            (q.getAllAngularRootElements = () => t.getAllRootElements()),
            q.frameworkStabilizers || (q.frameworkStabilizers = []),
            q.frameworkStabilizers.push((r) => {
              const o = q.getAllAngularTestabilities();
              let i = o.length,
                s = !1;
              const a = function (u) {
                (s = s || u), i--, 0 == i && r(s);
              };
              o.forEach(function (u) {
                u.whenStable(a);
              });
            });
        }
        findTestabilityInTree(t, n, r) {
          if (null == n) return null;
          const o = t.getTestability(n);
          return null != o
            ? o
            : r
            ? wn().isShadowRoot(n)
              ? this.findTestabilityInTree(t, n.host, !0)
              : this.findTestabilityInTree(t, n.parentElement, !0)
            : null;
        }
      }
      let ZI = (() => {
        class e {
          build() {
            return new XMLHttpRequest();
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = U({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const Wi = new V("EventManagerPlugins");
      let Qi = (() => {
        class e {
          constructor(n, r) {
            (this._zone = r),
              (this._eventNameToPlugin = new Map()),
              n.forEach((o) => (o.manager = this)),
              (this._plugins = n.slice().reverse());
          }
          addEventListener(n, r, o) {
            return this._findPluginFor(r).addEventListener(n, r, o);
          }
          addGlobalEventListener(n, r, o) {
            return this._findPluginFor(r).addGlobalEventListener(n, r, o);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(n) {
            const r = this._eventNameToPlugin.get(n);
            if (r) return r;
            const o = this._plugins;
            for (let i = 0; i < o.length; i++) {
              const s = o[i];
              if (s.supports(n)) return this._eventNameToPlugin.set(n, s), s;
            }
            throw new Error(`No event manager plugin found for event ${n}`);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(L(Wi), L(be));
          }),
          (e.ɵprov = U({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class Im {
        constructor(t) {
          this._doc = t;
        }
        addGlobalEventListener(t, n, r) {
          const o = wn().getGlobalEventTarget(this._doc, t);
          if (!o)
            throw new Error(`Unsupported event target ${o} for event ${n}`);
          return this.addEventListener(o, n, r);
        }
      }
      let Sm = (() => {
          class e {
            constructor() {
              this._stylesSet = new Set();
            }
            addStyles(n) {
              const r = new Set();
              n.forEach((o) => {
                this._stylesSet.has(o) || (this._stylesSet.add(o), r.add(o));
              }),
                this.onStylesAdded(r);
            }
            onStylesAdded(n) {}
            getAllStyles() {
              return Array.from(this._stylesSet);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = U({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        ho = (() => {
          class e extends Sm {
            constructor(n) {
              super(),
                (this._doc = n),
                (this._hostNodes = new Map()),
                this._hostNodes.set(n.head, []);
            }
            _addStylesToHost(n, r, o) {
              n.forEach((i) => {
                const s = this._doc.createElement("style");
                (s.textContent = i), o.push(r.appendChild(s));
              });
            }
            addHost(n) {
              const r = [];
              this._addStylesToHost(this._stylesSet, n, r),
                this._hostNodes.set(n, r);
            }
            removeHost(n) {
              const r = this._hostNodes.get(n);
              r && r.forEach(Tm), this._hostNodes.delete(n);
            }
            onStylesAdded(n) {
              this._hostNodes.forEach((r, o) => {
                this._addStylesToHost(n, o, r);
              });
            }
            ngOnDestroy() {
              this._hostNodes.forEach((n) => n.forEach(Tm));
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(L(ft));
            }),
            (e.ɵprov = U({ token: e, factory: e.ɵfac })),
            e
          );
        })();
      function Tm(e) {
        wn().remove(e);
      }
      const ul = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
          math: "http://www.w3.org/1998/MathML/",
        },
        ll = /%COMP%/g;
      function Zi(e, t, n) {
        for (let r = 0; r < t.length; r++) {
          let o = t[r];
          Array.isArray(o) ? Zi(e, o, n) : ((o = o.replace(ll, e)), n.push(o));
        }
        return n;
      }
      function Nm(e) {
        return (t) => {
          if ("__ngUnwrap__" === t) return e;
          !1 === e(t) && (t.preventDefault(), (t.returnValue = !1));
        };
      }
      let cl = (() => {
        class e {
          constructor(n, r, o) {
            (this.eventManager = n),
              (this.sharedStylesHost = r),
              (this.appId = o),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new dl(n));
          }
          createRenderer(n, r) {
            if (!n || !r) return this.defaultRenderer;
            switch (r.encapsulation) {
              case mt.Emulated: {
                let o = this.rendererByCompId.get(r.id);
                return (
                  o ||
                    ((o = new tS(
                      this.eventManager,
                      this.sharedStylesHost,
                      r,
                      this.appId
                    )),
                    this.rendererByCompId.set(r.id, o)),
                  o.applyToHost(n),
                  o
                );
              }
              case 1:
              case mt.ShadowDom:
                return new nS(this.eventManager, this.sharedStylesHost, n, r);
              default:
                if (!this.rendererByCompId.has(r.id)) {
                  const o = Zi(r.id, r.styles, []);
                  this.sharedStylesHost.addStyles(o),
                    this.rendererByCompId.set(r.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
          }
          begin() {}
          end() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(L(Qi), L(ho), L(ao));
          }),
          (e.ɵprov = U({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class dl {
        constructor(t) {
          (this.eventManager = t),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(t, n) {
          return n
            ? document.createElementNS(ul[n] || n, t)
            : document.createElement(t);
        }
        createComment(t) {
          return document.createComment(t);
        }
        createText(t) {
          return document.createTextNode(t);
        }
        appendChild(t, n) {
          t.appendChild(n);
        }
        insertBefore(t, n, r) {
          t && t.insertBefore(n, r);
        }
        removeChild(t, n) {
          t && t.removeChild(n);
        }
        selectRootElement(t, n) {
          let r = "string" == typeof t ? document.querySelector(t) : t;
          if (!r)
            throw new Error(`The selector "${t}" did not match any elements`);
          return n || (r.textContent = ""), r;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, n, r, o) {
          if (o) {
            n = o + ":" + n;
            const i = ul[o];
            i ? t.setAttributeNS(i, n, r) : t.setAttribute(n, r);
          } else t.setAttribute(n, r);
        }
        removeAttribute(t, n, r) {
          if (r) {
            const o = ul[r];
            o ? t.removeAttributeNS(o, n) : t.removeAttribute(`${r}:${n}`);
          } else t.removeAttribute(n);
        }
        addClass(t, n) {
          t.classList.add(n);
        }
        removeClass(t, n) {
          t.classList.remove(n);
        }
        setStyle(t, n, r, o) {
          o & ($e.DashCase | $e.Important)
            ? t.style.setProperty(n, r, o & $e.Important ? "important" : "")
            : (t.style[n] = r);
        }
        removeStyle(t, n, r) {
          r & $e.DashCase ? t.style.removeProperty(n) : (t.style[n] = "");
        }
        setProperty(t, n, r) {
          t[n] = r;
        }
        setValue(t, n) {
          t.nodeValue = n;
        }
        listen(t, n, r) {
          return "string" == typeof t
            ? this.eventManager.addGlobalEventListener(t, n, Nm(r))
            : this.eventManager.addEventListener(t, n, Nm(r));
        }
      }
      class tS extends dl {
        constructor(t, n, r, o) {
          super(t), (this.component = r);
          const i = Zi(o + "-" + r.id, r.styles, []);
          n.addStyles(i),
            (this.contentAttr = (function YI(e) {
              return "_ngcontent-%COMP%".replace(ll, e);
            })(o + "-" + r.id)),
            (this.hostAttr = (function XI(e) {
              return "_nghost-%COMP%".replace(ll, e);
            })(o + "-" + r.id));
        }
        applyToHost(t) {
          super.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, n) {
          const r = super.createElement(t, n);
          return super.setAttribute(r, this.contentAttr, ""), r;
        }
      }
      class nS extends dl {
        constructor(t, n, r, o) {
          super(t),
            (this.sharedStylesHost = n),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const i = Zi(o.id, o.styles, []);
          for (let s = 0; s < i.length; s++) {
            const a = document.createElement("style");
            (a.textContent = i[s]), this.shadowRoot.appendChild(a);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
        appendChild(t, n) {
          return super.appendChild(this.nodeOrShadowRoot(t), n);
        }
        insertBefore(t, n, r) {
          return super.insertBefore(this.nodeOrShadowRoot(t), n, r);
        }
        removeChild(t, n) {
          return super.removeChild(this.nodeOrShadowRoot(t), n);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
      }
      let rS = (() => {
        class e extends Im {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return !0;
          }
          addEventListener(n, r, o) {
            return (
              n.addEventListener(r, o, !1),
              () => this.removeEventListener(n, r, o)
            );
          }
          removeEventListener(n, r, o) {
            return n.removeEventListener(r, o);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(L(ft));
          }),
          (e.ɵprov = U({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const Om = ["alt", "control", "meta", "shift"],
        iS = {
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
        Rm = {
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
        sS = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        };
      let aS = (() => {
        class e extends Im {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return null != e.parseEventName(n);
          }
          addEventListener(n, r, o) {
            const i = e.parseEventName(r),
              s = e.eventCallback(i.fullKey, o, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => wn().onAndCancel(n, i.domEventName, s));
          }
          static parseEventName(n) {
            const r = n.toLowerCase().split("."),
              o = r.shift();
            if (0 === r.length || ("keydown" !== o && "keyup" !== o))
              return null;
            const i = e._normalizeKey(r.pop());
            let s = "";
            if (
              (Om.forEach((u) => {
                const l = r.indexOf(u);
                l > -1 && (r.splice(l, 1), (s += u + "."));
              }),
              (s += i),
              0 != r.length || 0 === i.length)
            )
              return null;
            const a = {};
            return (a.domEventName = o), (a.fullKey = s), a;
          }
          static getEventFullKey(n) {
            let r = "",
              o = (function uS(e) {
                let t = e.key;
                if (null == t) {
                  if (((t = e.keyIdentifier), null == t)) return "Unidentified";
                  t.startsWith("U+") &&
                    ((t = String.fromCharCode(parseInt(t.substring(2), 16))),
                    3 === e.location && Rm.hasOwnProperty(t) && (t = Rm[t]));
                }
                return iS[t] || t;
              })(n);
            return (
              (o = o.toLowerCase()),
              " " === o ? (o = "space") : "." === o && (o = "dot"),
              Om.forEach((i) => {
                i != o && sS[i](n) && (r += i + ".");
              }),
              (r += o),
              r
            );
          }
          static eventCallback(n, r, o) {
            return (i) => {
              e.getEventFullKey(i) === n && o.runGuarded(() => r(i));
            };
          }
          static _normalizeKey(n) {
            return "esc" === n ? "escape" : n;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(L(ft));
          }),
          (e.ɵprov = U({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const fS = Ug(gA, "browser", [
          { provide: Fi, useValue: "browser" },
          {
            provide: Vg,
            useValue: function lS() {
              sl.makeCurrent(), al.init();
            },
            multi: !0,
          },
          {
            provide: ft,
            useFactory: function dS() {
              return (
                (function y_(e) {
                  Ps = e;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        hS = [
          { provide: Qa, useValue: "root" },
          {
            provide: qn,
            useFactory: function cS() {
              return new qn();
            },
            deps: [],
          },
          { provide: Wi, useClass: rS, multi: !0, deps: [ft, be, Fi] },
          { provide: Wi, useClass: aS, multi: !0, deps: [ft] },
          { provide: cl, useClass: cl, deps: [Qi, ho, ao] },
          { provide: eg, useExisting: cl },
          { provide: Sm, useExisting: ho },
          { provide: ho, useClass: ho, deps: [ft] },
          { provide: ju, useClass: ju, deps: [be] },
          { provide: Qi, useClass: Qi, deps: [Wi, be] },
          { provide: Mm, useClass: ZI, deps: [] },
        ];
      let pS = (() => {
        class e {
          constructor(n) {
            if (n)
              throw new Error(
                "BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead."
              );
          }
          static withServerTransition(n) {
            return {
              ngModule: e,
              providers: [
                { provide: ao, useValue: n.appId },
                { provide: Am, useExisting: ao },
                QI,
              ],
            };
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(L(e, 12));
          }),
          (e.ɵmod = yt({ type: e })),
          (e.ɵinj = et({ providers: hS, imports: [BI, vA] })),
          e
        );
      })();
      "undefined" != typeof window && window;
      class Lm {}
      class Bm {}
      class jt {
        constructor(t) {
          (this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            t
              ? (this.lazyInit =
                  "string" == typeof t
                    ? () => {
                        (this.headers = new Map()),
                          t.split("\n").forEach((n) => {
                            const r = n.indexOf(":");
                            if (r > 0) {
                              const o = n.slice(0, r),
                                i = o.toLowerCase(),
                                s = n.slice(r + 1).trim();
                              this.maybeSetNormalizedName(o, i),
                                this.headers.has(i)
                                  ? this.headers.get(i).push(s)
                                  : this.headers.set(i, [s]);
                            }
                          });
                      }
                    : () => {
                        (this.headers = new Map()),
                          Object.keys(t).forEach((n) => {
                            let r = t[n];
                            const o = n.toLowerCase();
                            "string" == typeof r && (r = [r]),
                              r.length > 0 &&
                                (this.headers.set(o, r),
                                this.maybeSetNormalizedName(n, o));
                          });
                      })
              : (this.headers = new Map());
        }
        has(t) {
          return this.init(), this.headers.has(t.toLowerCase());
        }
        get(t) {
          this.init();
          const n = this.headers.get(t.toLowerCase());
          return n && n.length > 0 ? n[0] : null;
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values());
        }
        getAll(t) {
          return this.init(), this.headers.get(t.toLowerCase()) || null;
        }
        append(t, n) {
          return this.clone({ name: t, value: n, op: "a" });
        }
        set(t, n) {
          return this.clone({ name: t, value: n, op: "s" });
        }
        delete(t, n) {
          return this.clone({ name: t, value: n, op: "d" });
        }
        maybeSetNormalizedName(t, n) {
          this.normalizedNames.has(n) || this.normalizedNames.set(n, t);
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof jt
              ? this.copyFrom(this.lazyInit)
              : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate &&
              (this.lazyUpdate.forEach((t) => this.applyUpdate(t)),
              (this.lazyUpdate = null)));
        }
        copyFrom(t) {
          t.init(),
            Array.from(t.headers.keys()).forEach((n) => {
              this.headers.set(n, t.headers.get(n)),
                this.normalizedNames.set(n, t.normalizedNames.get(n));
            });
        }
        clone(t) {
          const n = new jt();
          return (
            (n.lazyInit =
              this.lazyInit && this.lazyInit instanceof jt
                ? this.lazyInit
                : this),
            (n.lazyUpdate = (this.lazyUpdate || []).concat([t])),
            n
          );
        }
        applyUpdate(t) {
          const n = t.name.toLowerCase();
          switch (t.op) {
            case "a":
            case "s":
              let r = t.value;
              if (("string" == typeof r && (r = [r]), 0 === r.length)) return;
              this.maybeSetNormalizedName(t.name, n);
              const o = ("a" === t.op ? this.headers.get(n) : void 0) || [];
              o.push(...r), this.headers.set(n, o);
              break;
            case "d":
              const i = t.value;
              if (i) {
                let s = this.headers.get(n);
                if (!s) return;
                (s = s.filter((a) => -1 === i.indexOf(a))),
                  0 === s.length
                    ? (this.headers.delete(n), this.normalizedNames.delete(n))
                    : this.headers.set(n, s);
              } else this.headers.delete(n), this.normalizedNames.delete(n);
          }
        }
        forEach(t) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach((n) =>
              t(this.normalizedNames.get(n), this.headers.get(n))
            );
        }
      }
      class SS {
        encodeKey(t) {
          return Hm(t);
        }
        encodeValue(t) {
          return Hm(t);
        }
        decodeKey(t) {
          return decodeURIComponent(t);
        }
        decodeValue(t) {
          return decodeURIComponent(t);
        }
      }
      const FS = /%(\d[a-f0-9])/gi,
        xS = {
          40: "@",
          "3A": ":",
          24: "$",
          "2C": ",",
          "3B": ";",
          "2B": "+",
          "3D": "=",
          "3F": "?",
          "2F": "/",
        };
      function Hm(e) {
        return encodeURIComponent(e).replace(FS, (t, n) => {
          var r;
          return null !== (r = xS[n]) && void 0 !== r ? r : t;
        });
      }
      function jm(e) {
        return `${e}`;
      }
      class tn {
        constructor(t = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = t.encoder || new SS()),
            t.fromString)
          ) {
            if (t.fromObject)
              throw new Error("Cannot specify both fromString and fromObject.");
            this.map = (function TS(e, t) {
              const n = new Map();
              return (
                e.length > 0 &&
                  e
                    .replace(/^\?/, "")
                    .split("&")
                    .forEach((o) => {
                      const i = o.indexOf("="),
                        [s, a] =
                          -1 == i
                            ? [t.decodeKey(o), ""]
                            : [
                                t.decodeKey(o.slice(0, i)),
                                t.decodeValue(o.slice(i + 1)),
                              ],
                        u = n.get(s) || [];
                      u.push(a), n.set(s, u);
                    }),
                n
              );
            })(t.fromString, this.encoder);
          } else
            t.fromObject
              ? ((this.map = new Map()),
                Object.keys(t.fromObject).forEach((n) => {
                  const r = t.fromObject[n];
                  this.map.set(n, Array.isArray(r) ? r : [r]);
                }))
              : (this.map = null);
        }
        has(t) {
          return this.init(), this.map.has(t);
        }
        get(t) {
          this.init();
          const n = this.map.get(t);
          return n ? n[0] : null;
        }
        getAll(t) {
          return this.init(), this.map.get(t) || null;
        }
        keys() {
          return this.init(), Array.from(this.map.keys());
        }
        append(t, n) {
          return this.clone({ param: t, value: n, op: "a" });
        }
        appendAll(t) {
          const n = [];
          return (
            Object.keys(t).forEach((r) => {
              const o = t[r];
              Array.isArray(o)
                ? o.forEach((i) => {
                    n.push({ param: r, value: i, op: "a" });
                  })
                : n.push({ param: r, value: o, op: "a" });
            }),
            this.clone(n)
          );
        }
        set(t, n) {
          return this.clone({ param: t, value: n, op: "s" });
        }
        delete(t, n) {
          return this.clone({ param: t, value: n, op: "d" });
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map((t) => {
                const n = this.encoder.encodeKey(t);
                return this.map
                  .get(t)
                  .map((r) => n + "=" + this.encoder.encodeValue(r))
                  .join("&");
              })
              .filter((t) => "" !== t)
              .join("&")
          );
        }
        clone(t) {
          const n = new tn({ encoder: this.encoder });
          return (
            (n.cloneFrom = this.cloneFrom || this),
            (n.updates = (this.updates || []).concat(t)),
            n
          );
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom
                .keys()
                .forEach((t) => this.map.set(t, this.cloneFrom.map.get(t))),
              this.updates.forEach((t) => {
                switch (t.op) {
                  case "a":
                  case "s":
                    const n =
                      ("a" === t.op ? this.map.get(t.param) : void 0) || [];
                    n.push(jm(t.value)), this.map.set(t.param, n);
                    break;
                  case "d":
                    if (void 0 === t.value) {
                      this.map.delete(t.param);
                      break;
                    }
                    {
                      let r = this.map.get(t.param) || [];
                      const o = r.indexOf(jm(t.value));
                      -1 !== o && r.splice(o, 1),
                        r.length > 0
                          ? this.map.set(t.param, r)
                          : this.map.delete(t.param);
                    }
                }
              }),
              (this.cloneFrom = this.updates = null));
        }
      }
      class NS {
        constructor() {
          this.map = new Map();
        }
        set(t, n) {
          return this.map.set(t, n), this;
        }
        get(t) {
          return (
            this.map.has(t) || this.map.set(t, t.defaultValue()),
            this.map.get(t)
          );
        }
        delete(t) {
          return this.map.delete(t), this;
        }
        has(t) {
          return this.map.has(t);
        }
        keys() {
          return this.map.keys();
        }
      }
      function $m(e) {
        return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer;
      }
      function Um(e) {
        return "undefined" != typeof Blob && e instanceof Blob;
      }
      function Gm(e) {
        return "undefined" != typeof FormData && e instanceof FormData;
      }
      class po {
        constructor(t, n, r, o) {
          let i;
          if (
            ((this.url = n),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = "json"),
            (this.method = t.toUpperCase()),
            (function PS(e) {
              switch (e) {
                case "DELETE":
                case "GET":
                case "HEAD":
                case "OPTIONS":
                case "JSONP":
                  return !1;
                default:
                  return !0;
              }
            })(this.method) || o
              ? ((this.body = void 0 !== r ? r : null), (i = o))
              : (i = r),
            i &&
              ((this.reportProgress = !!i.reportProgress),
              (this.withCredentials = !!i.withCredentials),
              i.responseType && (this.responseType = i.responseType),
              i.headers && (this.headers = i.headers),
              i.context && (this.context = i.context),
              i.params && (this.params = i.params)),
            this.headers || (this.headers = new jt()),
            this.context || (this.context = new NS()),
            this.params)
          ) {
            const s = this.params.toString();
            if (0 === s.length) this.urlWithParams = n;
            else {
              const a = n.indexOf("?");
              this.urlWithParams =
                n + (-1 === a ? "?" : a < n.length - 1 ? "&" : "") + s;
            }
          } else (this.params = new tn()), (this.urlWithParams = n);
        }
        serializeBody() {
          return null === this.body
            ? null
            : $m(this.body) ||
              Um(this.body) ||
              Gm(this.body) ||
              (function OS(e) {
                return (
                  "undefined" != typeof URLSearchParams &&
                  e instanceof URLSearchParams
                );
              })(this.body) ||
              "string" == typeof this.body
            ? this.body
            : this.body instanceof tn
            ? this.body.toString()
            : "object" == typeof this.body ||
              "boolean" == typeof this.body ||
              Array.isArray(this.body)
            ? JSON.stringify(this.body)
            : this.body.toString();
        }
        detectContentTypeHeader() {
          return null === this.body || Gm(this.body)
            ? null
            : Um(this.body)
            ? this.body.type || null
            : $m(this.body)
            ? null
            : "string" == typeof this.body
            ? "text/plain"
            : this.body instanceof tn
            ? "application/x-www-form-urlencoded;charset=UTF-8"
            : "object" == typeof this.body ||
              "number" == typeof this.body ||
              "boolean" == typeof this.body
            ? "application/json"
            : null;
        }
        clone(t = {}) {
          var n;
          const r = t.method || this.method,
            o = t.url || this.url,
            i = t.responseType || this.responseType,
            s = void 0 !== t.body ? t.body : this.body,
            a =
              void 0 !== t.withCredentials
                ? t.withCredentials
                : this.withCredentials,
            u =
              void 0 !== t.reportProgress
                ? t.reportProgress
                : this.reportProgress;
          let l = t.headers || this.headers,
            c = t.params || this.params;
          const d = null !== (n = t.context) && void 0 !== n ? n : this.context;
          return (
            void 0 !== t.setHeaders &&
              (l = Object.keys(t.setHeaders).reduce(
                (f, h) => f.set(h, t.setHeaders[h]),
                l
              )),
            t.setParams &&
              (c = Object.keys(t.setParams).reduce(
                (f, h) => f.set(h, t.setParams[h]),
                c
              )),
            new po(r, o, s, {
              params: c,
              headers: l,
              context: d,
              reportProgress: u,
              responseType: i,
              withCredentials: a,
            })
          );
        }
      }
      var de = (() => (
        ((de = de || {})[(de.Sent = 0)] = "Sent"),
        (de[(de.UploadProgress = 1)] = "UploadProgress"),
        (de[(de.ResponseHeader = 2)] = "ResponseHeader"),
        (de[(de.DownloadProgress = 3)] = "DownloadProgress"),
        (de[(de.Response = 4)] = "Response"),
        (de[(de.User = 5)] = "User"),
        de
      ))();
      class hl {
        constructor(t, n = 200, r = "OK") {
          (this.headers = t.headers || new jt()),
            (this.status = void 0 !== t.status ? t.status : n),
            (this.statusText = t.statusText || r),
            (this.url = t.url || null),
            (this.ok = this.status >= 200 && this.status < 300);
        }
      }
      class pl extends hl {
        constructor(t = {}) {
          super(t), (this.type = de.ResponseHeader);
        }
        clone(t = {}) {
          return new pl({
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class Ki extends hl {
        constructor(t = {}) {
          super(t),
            (this.type = de.Response),
            (this.body = void 0 !== t.body ? t.body : null);
        }
        clone(t = {}) {
          return new Ki({
            body: void 0 !== t.body ? t.body : this.body,
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class qm extends hl {
        constructor(t) {
          super(t, 0, "Unknown Error"),
            (this.name = "HttpErrorResponse"),
            (this.ok = !1),
            (this.message =
              this.status >= 200 && this.status < 300
                ? `Http failure during parsing for ${t.url || "(unknown url)"}`
                : `Http failure response for ${t.url || "(unknown url)"}: ${
                    t.status
                  } ${t.statusText}`),
            (this.error = t.error || null);
        }
      }
      function gl(e, t) {
        return {
          body: t,
          headers: e.headers,
          context: e.context,
          observe: e.observe,
          params: e.params,
          reportProgress: e.reportProgress,
          responseType: e.responseType,
          withCredentials: e.withCredentials,
        };
      }
      let zm = (() => {
        class e {
          constructor(n) {
            this.handler = n;
          }
          request(n, r, o = {}) {
            let i;
            if (n instanceof po) i = n;
            else {
              let u, l;
              (u = o.headers instanceof jt ? o.headers : new jt(o.headers)),
                o.params &&
                  (l =
                    o.params instanceof tn
                      ? o.params
                      : new tn({ fromObject: o.params })),
                (i = new po(n, r, void 0 !== o.body ? o.body : null, {
                  headers: u,
                  context: o.context,
                  params: l,
                  reportProgress: o.reportProgress,
                  responseType: o.responseType || "json",
                  withCredentials: o.withCredentials,
                }));
            }
            const s = (function MS(...e) {
              return Ao(e, _c(e));
            })(i).pipe(
              (function AS(e, t) {
                return Y(t) ? Mo(e, t, 1) : Mo(e, 1);
              })((u) => this.handler.handle(u))
            );
            if (n instanceof po || "events" === o.observe) return s;
            const a = s.pipe(
              (function IS(e, t) {
                return un((n, r) => {
                  let o = 0;
                  n.subscribe(ln(r, (i) => e.call(t, i, o++) && r.next(i)));
                });
              })((u) => u instanceof Ki)
            );
            switch (o.observe || "body") {
              case "body":
                switch (i.responseType) {
                  case "arraybuffer":
                    return a.pipe(
                      cn((u) => {
                        if (null !== u.body && !(u.body instanceof ArrayBuffer))
                          throw new Error("Response is not an ArrayBuffer.");
                        return u.body;
                      })
                    );
                  case "blob":
                    return a.pipe(
                      cn((u) => {
                        if (null !== u.body && !(u.body instanceof Blob))
                          throw new Error("Response is not a Blob.");
                        return u.body;
                      })
                    );
                  case "text":
                    return a.pipe(
                      cn((u) => {
                        if (null !== u.body && "string" != typeof u.body)
                          throw new Error("Response is not a string.");
                        return u.body;
                      })
                    );
                  default:
                    return a.pipe(cn((u) => u.body));
                }
              case "response":
                return a;
              default:
                throw new Error(
                  `Unreachable: unhandled observe type ${o.observe}}`
                );
            }
          }
          delete(n, r = {}) {
            return this.request("DELETE", n, r);
          }
          get(n, r = {}) {
            return this.request("GET", n, r);
          }
          head(n, r = {}) {
            return this.request("HEAD", n, r);
          }
          jsonp(n, r) {
            return this.request("JSONP", n, {
              params: new tn().append(r, "JSONP_CALLBACK"),
              observe: "body",
              responseType: "json",
            });
          }
          options(n, r = {}) {
            return this.request("OPTIONS", n, r);
          }
          patch(n, r, o = {}) {
            return this.request("PATCH", n, gl(o, r));
          }
          post(n, r, o = {}) {
            return this.request("POST", n, gl(o, r));
          }
          put(n, r, o = {}) {
            return this.request("PUT", n, gl(o, r));
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(L(Lm));
          }),
          (e.ɵprov = U({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class Wm {
        constructor(t, n) {
          (this.next = t), (this.interceptor = n);
        }
        handle(t) {
          return this.interceptor.intercept(t, this.next);
        }
      }
      const Qm = new V("HTTP_INTERCEPTORS");
      let RS = (() => {
        class e {
          intercept(n, r) {
            return r.handle(n);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = U({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const VS = /^\)\]\}',?\n/;
      let Zm = (() => {
        class e {
          constructor(n) {
            this.xhrFactory = n;
          }
          handle(n) {
            if ("JSONP" === n.method)
              throw new Error(
                "Attempted to construct Jsonp request without HttpClientJsonpModule installed."
              );
            return new ye((r) => {
              const o = this.xhrFactory.build();
              if (
                (o.open(n.method, n.urlWithParams),
                n.withCredentials && (o.withCredentials = !0),
                n.headers.forEach((h, p) => o.setRequestHeader(h, p.join(","))),
                n.headers.has("Accept") ||
                  o.setRequestHeader(
                    "Accept",
                    "application/json, text/plain, */*"
                  ),
                !n.headers.has("Content-Type"))
              ) {
                const h = n.detectContentTypeHeader();
                null !== h && o.setRequestHeader("Content-Type", h);
              }
              if (n.responseType) {
                const h = n.responseType.toLowerCase();
                o.responseType = "json" !== h ? h : "text";
              }
              const i = n.serializeBody();
              let s = null;
              const a = () => {
                  if (null !== s) return s;
                  const h = o.statusText || "OK",
                    p = new jt(o.getAllResponseHeaders()),
                    m =
                      (function kS(e) {
                        return "responseURL" in e && e.responseURL
                          ? e.responseURL
                          : /^X-Request-URL:/m.test(e.getAllResponseHeaders())
                          ? e.getResponseHeader("X-Request-URL")
                          : null;
                      })(o) || n.url;
                  return (
                    (s = new pl({
                      headers: p,
                      status: o.status,
                      statusText: h,
                      url: m,
                    })),
                    s
                  );
                },
                u = () => {
                  let { headers: h, status: p, statusText: m, url: _ } = a(),
                    D = null;
                  204 !== p &&
                    (D = void 0 === o.response ? o.responseText : o.response),
                    0 === p && (p = D ? 200 : 0);
                  let g = p >= 200 && p < 300;
                  if ("json" === n.responseType && "string" == typeof D) {
                    const w = D;
                    D = D.replace(VS, "");
                    try {
                      D = "" !== D ? JSON.parse(D) : null;
                    } catch (F) {
                      (D = w), g && ((g = !1), (D = { error: F, text: D }));
                    }
                  }
                  g
                    ? (r.next(
                        new Ki({
                          body: D,
                          headers: h,
                          status: p,
                          statusText: m,
                          url: _ || void 0,
                        })
                      ),
                      r.complete())
                    : r.error(
                        new qm({
                          error: D,
                          headers: h,
                          status: p,
                          statusText: m,
                          url: _ || void 0,
                        })
                      );
                },
                l = (h) => {
                  const { url: p } = a(),
                    m = new qm({
                      error: h,
                      status: o.status || 0,
                      statusText: o.statusText || "Unknown Error",
                      url: p || void 0,
                    });
                  r.error(m);
                };
              let c = !1;
              const d = (h) => {
                  c || (r.next(a()), (c = !0));
                  let p = { type: de.DownloadProgress, loaded: h.loaded };
                  h.lengthComputable && (p.total = h.total),
                    "text" === n.responseType &&
                      !!o.responseText &&
                      (p.partialText = o.responseText),
                    r.next(p);
                },
                f = (h) => {
                  let p = { type: de.UploadProgress, loaded: h.loaded };
                  h.lengthComputable && (p.total = h.total), r.next(p);
                };
              return (
                o.addEventListener("load", u),
                o.addEventListener("error", l),
                o.addEventListener("timeout", l),
                o.addEventListener("abort", l),
                n.reportProgress &&
                  (o.addEventListener("progress", d),
                  null !== i &&
                    o.upload &&
                    o.upload.addEventListener("progress", f)),
                o.send(i),
                r.next({ type: de.Sent }),
                () => {
                  o.removeEventListener("error", l),
                    o.removeEventListener("abort", l),
                    o.removeEventListener("load", u),
                    o.removeEventListener("timeout", l),
                    n.reportProgress &&
                      (o.removeEventListener("progress", d),
                      null !== i &&
                        o.upload &&
                        o.upload.removeEventListener("progress", f)),
                    o.readyState !== o.DONE && o.abort();
                }
              );
            });
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(L(Mm));
          }),
          (e.ɵprov = U({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const ml = new V("XSRF_COOKIE_NAME"),
        yl = new V("XSRF_HEADER_NAME");
      class Km {}
      let LS = (() => {
          class e {
            constructor(n, r, o) {
              (this.doc = n),
                (this.platform = r),
                (this.cookieName = o),
                (this.lastCookieString = ""),
                (this.lastToken = null),
                (this.parseCount = 0);
            }
            getToken() {
              if ("server" === this.platform) return null;
              const n = this.doc.cookie || "";
              return (
                n !== this.lastCookieString &&
                  (this.parseCount++,
                  (this.lastToken = mm(n, this.cookieName)),
                  (this.lastCookieString = n)),
                this.lastToken
              );
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(L(ft), L(Fi), L(ml));
            }),
            (e.ɵprov = U({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Dl = (() => {
          class e {
            constructor(n, r) {
              (this.tokenService = n), (this.headerName = r);
            }
            intercept(n, r) {
              const o = n.url.toLowerCase();
              if (
                "GET" === n.method ||
                "HEAD" === n.method ||
                o.startsWith("http://") ||
                o.startsWith("https://")
              )
                return r.handle(n);
              const i = this.tokenService.getToken();
              return (
                null !== i &&
                  !n.headers.has(this.headerName) &&
                  (n = n.clone({ headers: n.headers.set(this.headerName, i) })),
                r.handle(n)
              );
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(L(Km), L(yl));
            }),
            (e.ɵprov = U({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        BS = (() => {
          class e {
            constructor(n, r) {
              (this.backend = n), (this.injector = r), (this.chain = null);
            }
            handle(n) {
              if (null === this.chain) {
                const r = this.injector.get(Qm, []);
                this.chain = r.reduceRight(
                  (o, i) => new Wm(o, i),
                  this.backend
                );
              }
              return this.chain.handle(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(L(Bm), L(Re));
            }),
            (e.ɵprov = U({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        HS = (() => {
          class e {
            static disable() {
              return {
                ngModule: e,
                providers: [{ provide: Dl, useClass: RS }],
              };
            }
            static withOptions(n = {}) {
              return {
                ngModule: e,
                providers: [
                  n.cookieName ? { provide: ml, useValue: n.cookieName } : [],
                  n.headerName ? { provide: yl, useValue: n.headerName } : [],
                ],
              };
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = yt({ type: e })),
            (e.ɵinj = et({
              providers: [
                Dl,
                { provide: Qm, useExisting: Dl, multi: !0 },
                { provide: Km, useClass: LS },
                { provide: ml, useValue: "XSRF-TOKEN" },
                { provide: yl, useValue: "X-XSRF-TOKEN" },
              ],
            })),
            e
          );
        })(),
        jS = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = yt({ type: e })),
            (e.ɵinj = et({
              providers: [
                zm,
                { provide: Lm, useClass: BS },
                Zm,
                { provide: Bm, useExisting: Zm },
              ],
              imports: [
                [
                  HS.withOptions({
                    cookieName: "XSRF-TOKEN",
                    headerName: "X-XSRF-TOKEN",
                  }),
                ],
              ],
            })),
            e
          );
        })();
      const { isArray: $S } = Array,
        { getPrototypeOf: US, prototype: GS, keys: qS } = Object;
      const { isArray: QS } = Array;
      function JS(e, t) {
        return e.reduce((n, r, o) => ((n[r] = t[o]), n), {});
      }
      function YS(...e) {
        const t = (function xD(e) {
            return Y(gs(e)) ? e.pop() : void 0;
          })(e),
          { args: n, keys: r } = (function zS(e) {
            if (1 === e.length) {
              const t = e[0];
              if ($S(t)) return { args: t, keys: null };
              if (
                (function WS(e) {
                  return e && "object" == typeof e && US(e) === GS;
                })(t)
              ) {
                const n = qS(t);
                return { args: n.map((r) => t[r]), keys: n };
              }
            }
            return { args: e, keys: null };
          })(e),
          o = new ye((i) => {
            const { length: s } = n;
            if (!s) return void i.complete();
            const a = new Array(s);
            let u = s,
              l = s;
            for (let c = 0; c < s; c++) {
              let d = !1;
              fn(n[c]).subscribe(
                ln(
                  i,
                  (f) => {
                    d || ((d = !0), l--), (a[c] = f);
                  },
                  () => u--,
                  void 0,
                  () => {
                    (!u || !d) && (l || i.next(r ? JS(r, a) : a), i.complete());
                  }
                )
              );
            }
          });
        return t
          ? o.pipe(
              (function KS(e) {
                return cn((t) =>
                  (function ZS(e, t) {
                    return QS(t) ? e(...t) : e(t);
                  })(e, t)
                );
              })(t)
            )
          : o;
      }
      let Jm = (() => {
          class e {
            constructor(n, r) {
              (this._renderer = n),
                (this._elementRef = r),
                (this.onChange = (o) => {}),
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
            (e.ɵfac = function (n) {
              return new (n || e)(v(Cn), v(ct));
            }),
            (e.ɵdir = S({ type: e })),
            e
          );
        })(),
        bn = (() => {
          class e extends Jm {}
          return (
            (e.ɵfac = (function () {
              let t;
              return function (r) {
                return (
                  t ||
                  (t = (function ve(e) {
                    return Gt(() => {
                      const t = e.prototype.constructor,
                        n = t[xt] || Zs(t),
                        r = Object.prototype;
                      let o = Object.getPrototypeOf(e.prototype).constructor;
                      for (; o && o !== r; ) {
                        const i = o[xt] || Zs(o);
                        if (i && i !== n) return i;
                        o = Object.getPrototypeOf(o);
                      }
                      return (i) => new i();
                    });
                  })(e))
                )(r || e);
              };
            })()),
            (e.ɵdir = S({ type: e, features: [G] })),
            e
          );
        })();
      const Tt = new V("NgValueAccessor"),
        eT = { provide: Tt, useExisting: Q(() => Ji), multi: !0 },
        nT = new V("CompositionEventMode");
      let Ji = (() => {
        class e extends Jm {
          constructor(n, r, o) {
            super(n, r),
              (this._compositionMode = o),
              (this._composing = !1),
              null == this._compositionMode &&
                (this._compositionMode = !(function tT() {
                  const e = wn() ? wn().getUserAgent() : "";
                  return /android (\d+)/.test(e.toLowerCase());
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
          (e.ɵfac = function (n) {
            return new (n || e)(v(Cn), v(ct), v(nT, 8));
          }),
          (e.ɵdir = S({
            type: e,
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
                Ge("input", function (i) {
                  return r._handleInput(i.target.value);
                })("blur", function () {
                  return r.onTouched();
                })("compositionstart", function () {
                  return r._compositionStart();
                })("compositionend", function (i) {
                  return r._compositionEnd(i.target.value);
                });
            },
            features: [ee([eT]), G],
          })),
          e
        );
      })();
      const Me = new V("NgValidators"),
        rn = new V("NgAsyncValidators");
      function uy(e) {
        return null != e;
      }
      function ly(e) {
        const t = mi(e) ? Ao(e) : e;
        return Nh(t), t;
      }
      function cy(e) {
        let t = {};
        return (
          e.forEach((n) => {
            t = null != n ? Object.assign(Object.assign({}, t), n) : t;
          }),
          0 === Object.keys(t).length ? null : t
        );
      }
      function dy(e, t) {
        return t.map((n) => n(e));
      }
      function fy(e) {
        return e.map((t) =>
          (function oT(e) {
            return !e.validate;
          })(t)
            ? t
            : (n) => t.validate(n)
        );
      }
      function _l(e) {
        return null != e
          ? (function hy(e) {
              if (!e) return null;
              const t = e.filter(uy);
              return 0 == t.length
                ? null
                : function (n) {
                    return cy(dy(n, t));
                  };
            })(fy(e))
          : null;
      }
      function vl(e) {
        return null != e
          ? (function py(e) {
              if (!e) return null;
              const t = e.filter(uy);
              return 0 == t.length
                ? null
                : function (n) {
                    return YS(dy(n, t).map(ly)).pipe(cn(cy));
                  };
            })(fy(e))
          : null;
      }
      function gy(e, t) {
        return null === e ? [t] : Array.isArray(e) ? [...e, t] : [e, t];
      }
      function Cl(e) {
        return e ? (Array.isArray(e) ? e : [e]) : [];
      }
      function Xi(e, t) {
        return Array.isArray(e) ? e.includes(t) : e === t;
      }
      function Dy(e, t) {
        const n = Cl(t);
        return (
          Cl(e).forEach((o) => {
            Xi(n, o) || n.push(o);
          }),
          n
        );
      }
      function _y(e, t) {
        return Cl(t).filter((n) => !Xi(e, n));
      }
      class vy {
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
        _setValidators(t) {
          (this._rawValidators = t || []),
            (this._composedValidatorFn = _l(this._rawValidators));
        }
        _setAsyncValidators(t) {
          (this._rawAsyncValidators = t || []),
            (this._composedAsyncValidatorFn = vl(this._rawAsyncValidators));
        }
        get validator() {
          return this._composedValidatorFn || null;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn || null;
        }
        _registerOnDestroy(t) {
          this._onDestroyCallbacks.push(t);
        }
        _invokeOnDestroyCallbacks() {
          this._onDestroyCallbacks.forEach((t) => t()),
            (this._onDestroyCallbacks = []);
        }
        reset(t) {
          this.control && this.control.reset(t);
        }
        hasError(t, n) {
          return !!this.control && this.control.hasError(t, n);
        }
        getError(t, n) {
          return this.control ? this.control.getError(t, n) : null;
        }
      }
      class on extends vy {
        constructor() {
          super(...arguments),
            (this._parent = null),
            (this.name = null),
            (this.valueAccessor = null);
        }
      }
      class Ne extends vy {
        get formDirective() {
          return null;
        }
        get path() {
          return null;
        }
      }
      let Ey = (() => {
        class e extends class Cy {
          constructor(t) {
            this._cd = t;
          }
          is(t) {
            var n, r, o;
            return "submitted" === t
              ? !!(null === (n = this._cd) || void 0 === n
                  ? void 0
                  : n.submitted)
              : !!(null ===
                  (o =
                    null === (r = this._cd) || void 0 === r
                      ? void 0
                      : r.control) || void 0 === o
                  ? void 0
                  : o[t]);
          }
        } {
          constructor(n) {
            super(n);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(v(on, 2));
          }),
          (e.ɵdir = S({
            type: e,
            selectors: [
              ["", "formControlName", ""],
              ["", "ngModel", ""],
              ["", "formControl", ""],
            ],
            hostVars: 14,
            hostBindings: function (n, r) {
              2 & n &&
                yi("ng-untouched", r.is("untouched"))(
                  "ng-touched",
                  r.is("touched")
                )("ng-pristine", r.is("pristine"))("ng-dirty", r.is("dirty"))(
                  "ng-valid",
                  r.is("valid")
                )("ng-invalid", r.is("invalid"))("ng-pending", r.is("pending"));
            },
            features: [G],
          })),
          e
        );
      })();
      function go(e, t) {
        (function bl(e, t) {
          const n = (function my(e) {
            return e._rawValidators;
          })(e);
          null !== t.validator
            ? e.setValidators(gy(n, t.validator))
            : "function" == typeof n && e.setValidators([n]);
          const r = (function yy(e) {
            return e._rawAsyncValidators;
          })(e);
          null !== t.asyncValidator
            ? e.setAsyncValidators(gy(r, t.asyncValidator))
            : "function" == typeof r && e.setAsyncValidators([r]);
          const o = () => e.updateValueAndValidity();
          rs(t._rawValidators, o), rs(t._rawAsyncValidators, o);
        })(e, t),
          t.valueAccessor.writeValue(e.value),
          (function hT(e, t) {
            t.valueAccessor.registerOnChange((n) => {
              (e._pendingValue = n),
                (e._pendingChange = !0),
                (e._pendingDirty = !0),
                "change" === e.updateOn && by(e, t);
            });
          })(e, t),
          (function gT(e, t) {
            const n = (r, o) => {
              t.valueAccessor.writeValue(r), o && t.viewToModelUpdate(r);
            };
            e.registerOnChange(n),
              t._registerOnDestroy(() => {
                e._unregisterOnChange(n);
              });
          })(e, t),
          (function pT(e, t) {
            t.valueAccessor.registerOnTouched(() => {
              (e._pendingTouched = !0),
                "blur" === e.updateOn && e._pendingChange && by(e, t),
                "submit" !== e.updateOn && e.markAsTouched();
            });
          })(e, t),
          (function fT(e, t) {
            if (t.valueAccessor.setDisabledState) {
              const n = (r) => {
                t.valueAccessor.setDisabledState(r);
              };
              e.registerOnDisabledChange(n),
                t._registerOnDestroy(() => {
                  e._unregisterOnDisabledChange(n);
                });
            }
          })(e, t);
      }
      function rs(e, t) {
        e.forEach((n) => {
          n.registerOnValidatorChange && n.registerOnValidatorChange(t);
        });
      }
      function by(e, t) {
        e._pendingDirty && e.markAsDirty(),
          e.setValue(e._pendingValue, { emitModelToViewChange: !1 }),
          t.viewToModelUpdate(e._pendingValue),
          (e._pendingChange = !1);
      }
      function Il(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      const mo = "VALID",
        is = "INVALID",
        vr = "PENDING",
        yo = "DISABLED";
      function Tl(e) {
        return (ss(e) ? e.validators : e) || null;
      }
      function Iy(e) {
        return Array.isArray(e) ? _l(e) : e || null;
      }
      function Fl(e, t) {
        return (ss(t) ? t.asyncValidators : e) || null;
      }
      function Sy(e) {
        return Array.isArray(e) ? vl(e) : e || null;
      }
      function ss(e) {
        return null != e && !Array.isArray(e) && "object" == typeof e;
      }
      const xl = (e) => e instanceof Pl;
      function Fy(e) {
        return ((e) => e instanceof Py)(e) ? e.value : e.getRawValue();
      }
      function xy(e, t) {
        const n = xl(e),
          r = e.controls;
        if (!(n ? Object.keys(r) : r).length) throw new B(1e3, "");
        if (!r[t]) throw new B(1001, "");
      }
      function Ny(e, t) {
        xl(e),
          e._forEachChild((r, o) => {
            if (void 0 === t[o]) throw new B(1002, "");
          });
      }
      class Nl {
        constructor(t, n) {
          (this._pendingDirty = !1),
            (this._hasOwnPendingAsyncValidator = !1),
            (this._pendingTouched = !1),
            (this._onCollectionChange = () => {}),
            (this._parent = null),
            (this.pristine = !0),
            (this.touched = !1),
            (this._onDisabledChange = []),
            (this._rawValidators = t),
            (this._rawAsyncValidators = n),
            (this._composedValidatorFn = Iy(this._rawValidators)),
            (this._composedAsyncValidatorFn = Sy(this._rawAsyncValidators));
        }
        get validator() {
          return this._composedValidatorFn;
        }
        set validator(t) {
          this._rawValidators = this._composedValidatorFn = t;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn;
        }
        set asyncValidator(t) {
          this._rawAsyncValidators = this._composedAsyncValidatorFn = t;
        }
        get parent() {
          return this._parent;
        }
        get valid() {
          return this.status === mo;
        }
        get invalid() {
          return this.status === is;
        }
        get pending() {
          return this.status == vr;
        }
        get disabled() {
          return this.status === yo;
        }
        get enabled() {
          return this.status !== yo;
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
        setValidators(t) {
          (this._rawValidators = t), (this._composedValidatorFn = Iy(t));
        }
        setAsyncValidators(t) {
          (this._rawAsyncValidators = t),
            (this._composedAsyncValidatorFn = Sy(t));
        }
        addValidators(t) {
          this.setValidators(Dy(t, this._rawValidators));
        }
        addAsyncValidators(t) {
          this.setAsyncValidators(Dy(t, this._rawAsyncValidators));
        }
        removeValidators(t) {
          this.setValidators(_y(t, this._rawValidators));
        }
        removeAsyncValidators(t) {
          this.setAsyncValidators(_y(t, this._rawAsyncValidators));
        }
        hasValidator(t) {
          return Xi(this._rawValidators, t);
        }
        hasAsyncValidator(t) {
          return Xi(this._rawAsyncValidators, t);
        }
        clearValidators() {
          this.validator = null;
        }
        clearAsyncValidators() {
          this.asyncValidator = null;
        }
        markAsTouched(t = {}) {
          (this.touched = !0),
            this._parent && !t.onlySelf && this._parent.markAsTouched(t);
        }
        markAllAsTouched() {
          this.markAsTouched({ onlySelf: !0 }),
            this._forEachChild((t) => t.markAllAsTouched());
        }
        markAsUntouched(t = {}) {
          (this.touched = !1),
            (this._pendingTouched = !1),
            this._forEachChild((n) => {
              n.markAsUntouched({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        markAsDirty(t = {}) {
          (this.pristine = !1),
            this._parent && !t.onlySelf && this._parent.markAsDirty(t);
        }
        markAsPristine(t = {}) {
          (this.pristine = !0),
            (this._pendingDirty = !1),
            this._forEachChild((n) => {
              n.markAsPristine({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        markAsPending(t = {}) {
          (this.status = vr),
            !1 !== t.emitEvent && this.statusChanges.emit(this.status),
            this._parent && !t.onlySelf && this._parent.markAsPending(t);
        }
        disable(t = {}) {
          const n = this._parentMarkedDirty(t.onlySelf);
          (this.status = yo),
            (this.errors = null),
            this._forEachChild((r) => {
              r.disable(Object.assign(Object.assign({}, t), { onlySelf: !0 }));
            }),
            this._updateValue(),
            !1 !== t.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._updateAncestors(
              Object.assign(Object.assign({}, t), { skipPristineCheck: n })
            ),
            this._onDisabledChange.forEach((r) => r(!0));
        }
        enable(t = {}) {
          const n = this._parentMarkedDirty(t.onlySelf);
          (this.status = mo),
            this._forEachChild((r) => {
              r.enable(Object.assign(Object.assign({}, t), { onlySelf: !0 }));
            }),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: t.emitEvent,
            }),
            this._updateAncestors(
              Object.assign(Object.assign({}, t), { skipPristineCheck: n })
            ),
            this._onDisabledChange.forEach((r) => r(!1));
        }
        _updateAncestors(t) {
          this._parent &&
            !t.onlySelf &&
            (this._parent.updateValueAndValidity(t),
            t.skipPristineCheck || this._parent._updatePristine(),
            this._parent._updateTouched());
        }
        setParent(t) {
          this._parent = t;
        }
        updateValueAndValidity(t = {}) {
          this._setInitialStatus(),
            this._updateValue(),
            this.enabled &&
              (this._cancelExistingSubscription(),
              (this.errors = this._runValidator()),
              (this.status = this._calculateStatus()),
              (this.status === mo || this.status === vr) &&
                this._runAsyncValidator(t.emitEvent)),
            !1 !== t.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._parent &&
              !t.onlySelf &&
              this._parent.updateValueAndValidity(t);
        }
        _updateTreeValidity(t = { emitEvent: !0 }) {
          this._forEachChild((n) => n._updateTreeValidity(t)),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: t.emitEvent,
            });
        }
        _setInitialStatus() {
          this.status = this._allControlsDisabled() ? yo : mo;
        }
        _runValidator() {
          return this.validator ? this.validator(this) : null;
        }
        _runAsyncValidator(t) {
          if (this.asyncValidator) {
            (this.status = vr), (this._hasOwnPendingAsyncValidator = !0);
            const n = ly(this.asyncValidator(this));
            this._asyncValidationSubscription = n.subscribe((r) => {
              (this._hasOwnPendingAsyncValidator = !1),
                this.setErrors(r, { emitEvent: t });
            });
          }
        }
        _cancelExistingSubscription() {
          this._asyncValidationSubscription &&
            (this._asyncValidationSubscription.unsubscribe(),
            (this._hasOwnPendingAsyncValidator = !1));
        }
        setErrors(t, n = {}) {
          (this.errors = t), this._updateControlsErrors(!1 !== n.emitEvent);
        }
        get(t) {
          return (function _T(e, t, n) {
            if (
              null == t ||
              (Array.isArray(t) || (t = t.split(n)),
              Array.isArray(t) && 0 === t.length)
            )
              return null;
            let r = e;
            return (
              t.forEach((o) => {
                r = xl(r)
                  ? r.controls.hasOwnProperty(o)
                    ? r.controls[o]
                    : null
                  : (((e) => e instanceof CT)(r) && r.at(o)) || null;
              }),
              r
            );
          })(this, t, ".");
        }
        getError(t, n) {
          const r = n ? this.get(n) : this;
          return r && r.errors ? r.errors[t] : null;
        }
        hasError(t, n) {
          return !!this.getError(t, n);
        }
        get root() {
          let t = this;
          for (; t._parent; ) t = t._parent;
          return t;
        }
        _updateControlsErrors(t) {
          (this.status = this._calculateStatus()),
            t && this.statusChanges.emit(this.status),
            this._parent && this._parent._updateControlsErrors(t);
        }
        _initObservables() {
          (this.valueChanges = new we()), (this.statusChanges = new we());
        }
        _calculateStatus() {
          return this._allControlsDisabled()
            ? yo
            : this.errors
            ? is
            : this._hasOwnPendingAsyncValidator ||
              this._anyControlsHaveStatus(vr)
            ? vr
            : this._anyControlsHaveStatus(is)
            ? is
            : mo;
        }
        _anyControlsHaveStatus(t) {
          return this._anyControls((n) => n.status === t);
        }
        _anyControlsDirty() {
          return this._anyControls((t) => t.dirty);
        }
        _anyControlsTouched() {
          return this._anyControls((t) => t.touched);
        }
        _updatePristine(t = {}) {
          (this.pristine = !this._anyControlsDirty()),
            this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        _updateTouched(t = {}) {
          (this.touched = this._anyControlsTouched()),
            this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        _isBoxedValue(t) {
          return (
            "object" == typeof t &&
            null !== t &&
            2 === Object.keys(t).length &&
            "value" in t &&
            "disabled" in t
          );
        }
        _registerOnCollectionChange(t) {
          this._onCollectionChange = t;
        }
        _setUpdateStrategy(t) {
          ss(t) && null != t.updateOn && (this._updateOn = t.updateOn);
        }
        _parentMarkedDirty(t) {
          return (
            !t &&
            !(!this._parent || !this._parent.dirty) &&
            !this._parent._anyControlsDirty()
          );
        }
      }
      class Py extends Nl {
        constructor(t = null, n, r) {
          super(Tl(n), Fl(r, n)),
            (this.defaultValue = null),
            (this._onChange = []),
            (this._pendingChange = !1),
            this._applyFormState(t),
            this._setUpdateStrategy(n),
            this._initObservables(),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: !!this.asyncValidator,
            }),
            ss(n) &&
              n.initialValueIsDefault &&
              (this.defaultValue = this._isBoxedValue(t) ? t.value : t);
        }
        setValue(t, n = {}) {
          (this.value = this._pendingValue = t),
            this._onChange.length &&
              !1 !== n.emitModelToViewChange &&
              this._onChange.forEach((r) =>
                r(this.value, !1 !== n.emitViewToModelChange)
              ),
            this.updateValueAndValidity(n);
        }
        patchValue(t, n = {}) {
          this.setValue(t, n);
        }
        reset(t = this.defaultValue, n = {}) {
          this._applyFormState(t),
            this.markAsPristine(n),
            this.markAsUntouched(n),
            this.setValue(this.value, n),
            (this._pendingChange = !1);
        }
        _updateValue() {}
        _anyControls(t) {
          return !1;
        }
        _allControlsDisabled() {
          return this.disabled;
        }
        registerOnChange(t) {
          this._onChange.push(t);
        }
        _unregisterOnChange(t) {
          Il(this._onChange, t);
        }
        registerOnDisabledChange(t) {
          this._onDisabledChange.push(t);
        }
        _unregisterOnDisabledChange(t) {
          Il(this._onDisabledChange, t);
        }
        _forEachChild(t) {}
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
        _applyFormState(t) {
          this._isBoxedValue(t)
            ? ((this.value = this._pendingValue = t.value),
              t.disabled
                ? this.disable({ onlySelf: !0, emitEvent: !1 })
                : this.enable({ onlySelf: !0, emitEvent: !1 }))
            : (this.value = this._pendingValue = t);
        }
      }
      class Pl extends Nl {
        constructor(t, n, r) {
          super(Tl(n), Fl(r, n)),
            (this.controls = t),
            this._initObservables(),
            this._setUpdateStrategy(n),
            this._setUpControls(),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: !!this.asyncValidator,
            });
        }
        registerControl(t, n) {
          return this.controls[t]
            ? this.controls[t]
            : ((this.controls[t] = n),
              n.setParent(this),
              n._registerOnCollectionChange(this._onCollectionChange),
              n);
        }
        addControl(t, n, r = {}) {
          this.registerControl(t, n),
            this.updateValueAndValidity({ emitEvent: r.emitEvent }),
            this._onCollectionChange();
        }
        removeControl(t, n = {}) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            delete this.controls[t],
            this.updateValueAndValidity({ emitEvent: n.emitEvent }),
            this._onCollectionChange();
        }
        setControl(t, n, r = {}) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            delete this.controls[t],
            n && this.registerControl(t, n),
            this.updateValueAndValidity({ emitEvent: r.emitEvent }),
            this._onCollectionChange();
        }
        contains(t) {
          return this.controls.hasOwnProperty(t) && this.controls[t].enabled;
        }
        setValue(t, n = {}) {
          Ny(this, t),
            Object.keys(t).forEach((r) => {
              xy(this, r),
                this.controls[r].setValue(t[r], {
                  onlySelf: !0,
                  emitEvent: n.emitEvent,
                });
            }),
            this.updateValueAndValidity(n);
        }
        patchValue(t, n = {}) {
          null != t &&
            (Object.keys(t).forEach((r) => {
              this.controls[r] &&
                this.controls[r].patchValue(t[r], {
                  onlySelf: !0,
                  emitEvent: n.emitEvent,
                });
            }),
            this.updateValueAndValidity(n));
        }
        reset(t = {}, n = {}) {
          this._forEachChild((r, o) => {
            r.reset(t[o], { onlySelf: !0, emitEvent: n.emitEvent });
          }),
            this._updatePristine(n),
            this._updateTouched(n),
            this.updateValueAndValidity(n);
        }
        getRawValue() {
          return this._reduceChildren({}, (t, n, r) => ((t[r] = Fy(n)), t));
        }
        _syncPendingControls() {
          let t = this._reduceChildren(
            !1,
            (n, r) => !!r._syncPendingControls() || n
          );
          return t && this.updateValueAndValidity({ onlySelf: !0 }), t;
        }
        _forEachChild(t) {
          Object.keys(this.controls).forEach((n) => {
            const r = this.controls[n];
            r && t(r, n);
          });
        }
        _setUpControls() {
          this._forEachChild((t) => {
            t.setParent(this),
              t._registerOnCollectionChange(this._onCollectionChange);
          });
        }
        _updateValue() {
          this.value = this._reduceValue();
        }
        _anyControls(t) {
          for (const n of Object.keys(this.controls)) {
            const r = this.controls[n];
            if (this.contains(n) && t(r)) return !0;
          }
          return !1;
        }
        _reduceValue() {
          return this._reduceChildren(
            {},
            (t, n, r) => ((n.enabled || this.disabled) && (t[r] = n.value), t)
          );
        }
        _reduceChildren(t, n) {
          let r = t;
          return (
            this._forEachChild((o, i) => {
              r = n(r, o, i);
            }),
            r
          );
        }
        _allControlsDisabled() {
          for (const t of Object.keys(this.controls))
            if (this.controls[t].enabled) return !1;
          return Object.keys(this.controls).length > 0 || this.disabled;
        }
      }
      class CT extends Nl {
        constructor(t, n, r) {
          super(Tl(n), Fl(r, n)),
            (this.controls = t),
            this._initObservables(),
            this._setUpdateStrategy(n),
            this._setUpControls(),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: !!this.asyncValidator,
            });
        }
        at(t) {
          return this.controls[t];
        }
        push(t, n = {}) {
          this.controls.push(t),
            this._registerControl(t),
            this.updateValueAndValidity({ emitEvent: n.emitEvent }),
            this._onCollectionChange();
        }
        insert(t, n, r = {}) {
          this.controls.splice(t, 0, n),
            this._registerControl(n),
            this.updateValueAndValidity({ emitEvent: r.emitEvent });
        }
        removeAt(t, n = {}) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            this.controls.splice(t, 1),
            this.updateValueAndValidity({ emitEvent: n.emitEvent });
        }
        setControl(t, n, r = {}) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            this.controls.splice(t, 1),
            n && (this.controls.splice(t, 0, n), this._registerControl(n)),
            this.updateValueAndValidity({ emitEvent: r.emitEvent }),
            this._onCollectionChange();
        }
        get length() {
          return this.controls.length;
        }
        setValue(t, n = {}) {
          Ny(this, t),
            t.forEach((r, o) => {
              xy(this, o),
                this.at(o).setValue(r, {
                  onlySelf: !0,
                  emitEvent: n.emitEvent,
                });
            }),
            this.updateValueAndValidity(n);
        }
        patchValue(t, n = {}) {
          null != t &&
            (t.forEach((r, o) => {
              this.at(o) &&
                this.at(o).patchValue(r, {
                  onlySelf: !0,
                  emitEvent: n.emitEvent,
                });
            }),
            this.updateValueAndValidity(n));
        }
        reset(t = [], n = {}) {
          this._forEachChild((r, o) => {
            r.reset(t[o], { onlySelf: !0, emitEvent: n.emitEvent });
          }),
            this._updatePristine(n),
            this._updateTouched(n),
            this.updateValueAndValidity(n);
        }
        getRawValue() {
          return this.controls.map((t) => Fy(t));
        }
        clear(t = {}) {
          this.controls.length < 1 ||
            (this._forEachChild((n) => n._registerOnCollectionChange(() => {})),
            this.controls.splice(0),
            this.updateValueAndValidity({ emitEvent: t.emitEvent }));
        }
        _syncPendingControls() {
          let t = this.controls.reduce(
            (n, r) => !!r._syncPendingControls() || n,
            !1
          );
          return t && this.updateValueAndValidity({ onlySelf: !0 }), t;
        }
        _forEachChild(t) {
          this.controls.forEach((n, r) => {
            t(n, r);
          });
        }
        _updateValue() {
          this.value = this.controls
            .filter((t) => t.enabled || this.disabled)
            .map((t) => t.value);
        }
        _anyControls(t) {
          return this.controls.some((n) => n.enabled && t(n));
        }
        _setUpControls() {
          this._forEachChild((t) => this._registerControl(t));
        }
        _allControlsDisabled() {
          for (const t of this.controls) if (t.enabled) return !1;
          return this.controls.length > 0 || this.disabled;
        }
        _registerControl(t) {
          t.setParent(this),
            t._registerOnCollectionChange(this._onCollectionChange);
        }
      }
      const bT = { provide: on, useExisting: Q(() => Rl) },
        Vy = (() => Promise.resolve(null))();
      let Rl = (() => {
          class e extends on {
            constructor(n, r, o, i, s) {
              super(),
                (this._changeDetectorRef = s),
                (this.control = new Py()),
                (this._registered = !1),
                (this.update = new we()),
                (this._parent = n),
                this._setValidators(r),
                this._setAsyncValidators(o),
                (this.valueAccessor = (function Al(e, t) {
                  if (!t) return null;
                  let n, r, o;
                  return (
                    Array.isArray(t),
                    t.forEach((i) => {
                      i.constructor === Ji
                        ? (n = i)
                        : (function DT(e) {
                            return Object.getPrototypeOf(e.constructor) === bn;
                          })(i)
                        ? (r = i)
                        : (o = i);
                    }),
                    o || r || n || null
                  );
                })(0, i));
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
                (function Ml(e, t) {
                  if (!e.hasOwnProperty("model")) return !1;
                  const n = e.model;
                  return !!n.isFirstChange() || !Object.is(t, n.currentValue);
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
              go(this.control, this),
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
              Vy.then(() => {
                var r;
                this.control.setValue(n, { emitViewToModelChange: !1 }),
                  null === (r = this._changeDetectorRef) ||
                    void 0 === r ||
                    r.markForCheck();
              });
            }
            _updateDisabled(n) {
              const r = n.isDisabled.currentValue,
                o = "" === r || (r && "false" !== r);
              Vy.then(() => {
                var i;
                o && !this.control.disabled
                  ? this.control.disable()
                  : !o && this.control.disabled && this.control.enable(),
                  null === (i = this._changeDetectorRef) ||
                    void 0 === i ||
                    i.markForCheck();
              });
            }
            _getPath(n) {
              return this._parent
                ? (function ts(e, t) {
                    return [...t.path, e];
                  })(n, this._parent)
                : [n];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(
                v(Ne, 9),
                v(Me, 10),
                v(rn, 10),
                v(Tt, 10),
                v(Jg, 8)
              );
            }),
            (e.ɵdir = S({
              type: e,
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
              features: [ee([bT]), G, Nt],
            })),
            e
          );
        })(),
        Ly = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = yt({ type: e })),
            (e.ɵinj = et({})),
            e
          );
        })(),
        KT = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = yt({ type: e })),
            (e.ɵinj = et({ imports: [[Ly]] })),
            e
          );
        })(),
        JT = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = yt({ type: e })),
            (e.ɵinj = et({ imports: [KT] })),
            e
          );
        })();
      function YT(e, t) {
        1 & e &&
          (Lt(0, "h1", 8),
          fr(1, "Cl\xe9 invalide ! veuillez mettre une cl\xe9 valide."),
          Mt());
      }
      function XT(e, t) {
        1 & e &&
          (Lt(0, "h1", 9),
          fr(
            1,
            "Activation r\xe9ussie ! votre produit est d\xe9sormais actif."
          ),
          Mt());
      }
      const eF = function (e) {
        return { "transform scale-x-50": e };
      };
      function tF(e, t) {
        if (1 & e) {
          const n = (function Fh() {
            return y();
          })();
          Lt(0, "button", 10),
            Ge("click", function () {
              return (
                (function jc(e) {
                  return (A.lFrame.contextLView = e), e[8];
                })(n),
                cu().checking_key()
              );
            }),
            fr(1, "Activer"),
            Mt();
        }
        if (2 & e) {
          const n = cu();
          Yt("ngClass", sg(1, eF, n.show_spinner));
        }
      }
      function nF(e, t) {
        1 & e && su(0, "span", 11);
      }
      let rF = (() => {
          class e {
            constructor(n) {
              (this.http = n),
                (this.show_spinner = !1),
                (this.key_error = !1),
                (this.key_success = !1),
                (this.activation_key = ""),
                (this.api_url = "https://musk96.pythonanywhere.com/activate/");
            }
            checking_key() {
              (this.show_spinner = !0),
                (this.key_error = !1),
                (this.key_success = !1);
              let n = { key: this.activation_key };
              this.http.post(this.api_url, n).subscribe((r) => {
                "success" == r.status
                  ? this.http.post("/activate/", n).subscribe((o) => {
                      "success" == o.status
                        ? ((this.show_spinner = !1),
                          (this.key_success = !0),
                          setTimeout(() => {
                            location.reload();
                          }, 3e3))
                        : ((this.show_spinner = !1), (this.key_error = !0));
                    })
                  : ((this.show_spinner = !1), (this.key_error = !0));
              });
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(v(zm));
            }),
            (e.ɵcmp = Ms({
              type: e,
              selectors: [["app-root"]],
              decls: 10,
              vars: 5,
              consts: [
                [
                  1,
                  "fixed",
                  "w-1/3",
                  "bg-white",
                  "mx-auto",
                  "right-0",
                  "left-0",
                  "top-1/2",
                  "transform",
                  "-translate-y-1/2",
                  "rounded-xl",
                  "shadow-lg",
                ],
                [1, "text-center", "py-4", "text-2xl", "font-semibold"],
                [1, "text-center", "pb-4", "text-sm"],
                [
                  "type",
                  "text",
                  "placeholder",
                  "Cl\xe9 d'activation",
                  1,
                  "block",
                  "w-3/4",
                  "mx-auto",
                  "p-4",
                  "border",
                  "border-gray-200",
                  "shadow-sm",
                  "rounded-lg",
                  "focus:ring-transparent",
                  "focus:border-cyan-500",
                  "focus:outline-none",
                  3,
                  "ngModel",
                  "ngModelChange",
                ],
                ["class", "pt-8 text-red-600 text-center", 4, "ngIf"],
                ["class", "pt-8 text-green-600 text-center", 4, "ngIf"],
                [
                  "class",
                  "block w-1/2 mx-auto my-8 py-2 bg-cyan-500 text-white text-lg font-bold rounded-lg hover:bg-cyan-400 transition duration-500",
                  3,
                  "ngClass",
                  "click",
                  4,
                  "ngIf",
                ],
                [
                  "class",
                  "block w-12 h-12 mx-auto border-t border-cyan-500 my-8 rounded-full spinning",
                  4,
                  "ngIf",
                ],
                [1, "pt-8", "text-red-600", "text-center"],
                [1, "pt-8", "text-green-600", "text-center"],
                [
                  1,
                  "block",
                  "w-1/2",
                  "mx-auto",
                  "my-8",
                  "py-2",
                  "bg-cyan-500",
                  "text-white",
                  "text-lg",
                  "font-bold",
                  "rounded-lg",
                  "hover:bg-cyan-400",
                  "transition",
                  "duration-500",
                  3,
                  "ngClass",
                  "click",
                ],
                [
                  1,
                  "block",
                  "w-12",
                  "h-12",
                  "mx-auto",
                  "border-t",
                  "border-cyan-500",
                  "my-8",
                  "rounded-full",
                  "spinning",
                ],
              ],
              template: function (n, r) {
                1 & n &&
                  (Lt(0, "div", 0)(1, "h1", 1),
                  fr(2, "Activation requise"),
                  Mt(),
                  Lt(3, "p", 2),
                  fr(
                    4,
                    "Assurez vous d'\xeatre connect\xe9 \xe0 internet durant l'activation."
                  ),
                  Mt(),
                  Lt(5, "input", 3),
                  Ge("ngModelChange", function (i) {
                    return (r.activation_key = i);
                  }),
                  Mt(),
                  Kr(6, YT, 2, 0, "h1", 4),
                  Kr(7, XT, 2, 0, "h1", 5),
                  Kr(8, tF, 2, 3, "button", 6),
                  Kr(9, nF, 1, 0, "span", 7),
                  Mt()),
                  2 & n &&
                    (Qn(5),
                    Yt("ngModel", r.activation_key),
                    Qn(1),
                    Yt("ngIf", r.key_error),
                    Qn(1),
                    Yt("ngIf", r.key_success),
                    Qn(1),
                    Yt("ngIf", !r.show_spinner),
                    Qn(1),
                    Yt("ngIf", r.show_spinner));
              },
              directives: [Ji, Ey, Rl, _m, ym],
              styles: [
                "@keyframes spine{to{transform:rotate(360deg)}}.spinning[_ngcontent-%COMP%]{animation:spine 1s linear infinite}",
              ],
            })),
            e
          );
        })(),
        oF = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = yt({ type: e, bootstrap: [rF] })),
            (e.ɵinj = et({ providers: [], imports: [[pS, jS, JT]] })),
            e
          );
        })();
      (function eA() {
        Qg = !1;
      })(),
        fS()
          .bootstrapModule(oF)
          .catch((e) => console.error(e));
    },
  },
  (Y) => {
    Y((Y.s = 636));
  },
]);
