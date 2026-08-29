'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Truck, Check } from 'lucide-react';
import { useCart } from './CartContext';

export default function CartDrawer() {
  const { cart, isOpen, closeCart, updateQuantity, removeFromCart, subtotal, itemCount, clearCart } =
    useCart();
  const [checkingOut, setCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const freeShippingThreshold = 60;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  if (!isOpen) return null;

  const handleCheckout = () => {
    setCheckingOut(true);
    setTimeout(() => {
      setCheckingOut(false);
      setOrderComplete(true);
      clearCart();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-paper hairline-l shadow-float flex flex-col font-sans">
          
          {/* Header */}
          <div className="p-4 sm:p-6 hairline-b flex items-center justify-between bg-paper-card">
            <div>
              <div className="micro-label text-ink-muted">LOGISTICS BAY // DISPATCH</div>
              <h2 className="text-lg font-bold uppercase tracking-tight text-ink font-sans">
                Requisition Cart ({itemCount})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-2 text-ink-muted hover:text-ink transition-colors hover:bg-paper-subtle"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Gauge */}
          <div className="p-3 bg-paper-subtle hairline-b font-mono text-[11px]">
            {amountToFreeShipping > 0 ? (
              <div className="space-y-1.5">
                <div className="flex justify-between text-ink-muted">
                  <span>FREE DOMESTIC DISPATCH AT $60</span>
                  <span className="font-bold text-ink">${amountToFreeShipping.toFixed(2)} REMAINING</span>
                </div>
                <div className="w-full h-1.5 bg-paper hairline-border">
                  <div
                    className="h-full bg-ink transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-emerald-800 font-bold uppercase">
                <Truck className="w-3.5 h-3.5" />
                <span>UNLOCKED: Free Ground Shipping Applied</span>
              </div>
            )}
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {orderComplete ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="micro-label text-emerald-700">SPEC REQUISITION CONFIRMED</div>
                  <h3 className="text-xl font-bold uppercase text-ink">Order Dispatched</h3>
                  <p className="text-xs text-ink-muted font-sans max-w-xs mx-auto">
                    Your zero-fluff merchandise has been queued for production and single-ink screenprinting. Tracking details will transmit via email.
                  </p>
                </div>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setOrderComplete(false);
                      closeCart();
                    }}
                    className="px-5 py-2.5 bg-ink text-paper text-xs font-mono font-bold uppercase hover:bg-ink-light transition-colors"
                  >
                    Return to Catalog
                  </button>
                </div>
              </div>
            ) : cart.length === 0 ? (
              <div className="py-16 text-center space-y-3 font-mono">
                <div className="text-ink-subtle text-3xl">∅</div>
                <div className="text-xs text-ink-muted uppercase">Requisition cart is empty</div>
                <p className="text-xs text-ink-subtle max-w-xs mx-auto font-sans">
                  Select a spec garment or kitchen hardware unit from the catalog to begin requisition.
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-paper-card hairline-border flex gap-3 items-start"
                >
                  <div className="w-20 h-20 bg-paper hairline-border relative flex-shrink-0 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="text-[10px] font-mono text-ink-subtle uppercase">{item.sku}</div>
                    <div className="font-bold text-xs uppercase text-ink line-clamp-1">
                      {item.title}
                    </div>
                    <div className="text-[11px] font-mono text-ink-muted flex gap-2">
                      <span>SIZE: {item.size}</span>
                      <span>•</span>
                      <span>COLOR: {item.color}</span>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <div className="flex items-center hairline-border bg-paper">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 text-ink-muted hover:text-ink hover:bg-paper-subtle transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono font-bold text-ink">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 text-ink-muted hover:text-ink hover:bg-paper-subtle transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-ink">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-ink-subtle hover:text-accent transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Summary */}
          {cart.length > 0 && !orderComplete && (
            <div className="p-4 sm:p-6 hairline-t bg-paper-card space-y-4">
              <div className="space-y-1.5 font-mono text-xs">
                <div className="flex justify-between text-ink-muted">
                  <span>SUBTOTAL</span>
                  <span className="text-ink font-bold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-ink-muted">
                  <span>DISPATCH LOGISTICS</span>
                  <span className="text-ink">
                    {subtotal >= freeShippingThreshold ? 'FREE' : '$5.00'}
                  </span>
                </div>
                <div className="flex justify-between text-ink font-bold pt-2 hairline-t text-sm">
                  <span>ESTIMATED TOTAL</span>
                  <span>
                    ${(subtotal + (subtotal >= freeShippingThreshold ? 0 : 5)).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleCheckout}
                  disabled={checkingOut}
                  className="w-full py-3.5 bg-ink text-paper font-mono text-xs font-bold uppercase tracking-wider hover:bg-ink-light transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {checkingOut ? (
                    <span>TRANSMITTING SPEC ORDER...</span>
                  ) : (
                    <>
                      <span>PROCEED TO REQUISITION CHECKOUT</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
                <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-ink-subtle text-center">
                  <ShieldCheck className="w-3 h-3 text-emerald-700" />
                  <span>100% Zero-Fluff Guarantee • Unbleached Kraft Mailers</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
