import React, { useState } from "react";
import { CheckCircle, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_YourStripePublicKeyHere"); // Replace with your Stripe public key

export default function ModernSite() {
  const [openCategory, setOpenCategory] = useState(null);
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [selectedMetal, setSelectedMetal] = useState("");
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const metals = {
    "Smooth Plate": {
      "16 GA": { weight: 2.5 },
      "14 GA": { weight: 3.125 },
      "13 GA": { weight: 3.75 },
      "12 GA": { weight: 4.375 },
      "11 GA": { weight: 5.0 },
      "10 GA": { weight: 5.625 },
      "3/16 GA": { weight: 7.5 },
      "1/4 GA": { weight: 10.21 },
      "1/2 GA": { weight: 20.15 },
    },
    "Diamond Plate": {
      "1/8 GA": { weight: 6.16 },
      "3/16 GA": { weight: 8.75 },
      "1/4 GA": { weight: 11.25 },
      "5/16 GA": { weight: 13.82 },
      "3/8 GA": { weight: 16.35 },
      "1/2 GA": { weight: 21.47 },
    },
  };

  const calculatePrice = () => {
    if (!selectedMetal || !length || !width) return null;
    const [type, gauge] = selectedMetal.split(": ");
    const weightPerSqFt = metals[type][gauge].weight;
    const sqft = (length / 12) * (width / 12);
    const totalWeight = sqft * weightPerSqFt;
    return (totalWeight * 1.35).toFixed(2);
  };

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.name === item.name);
      if (existing) {
        return prev.map((p) =>
          p.name === item.name ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeOneFromCart = (name) => {
    setCart((prev) => {
      return prev
        .map((item) =>
          item.name === name ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0);
    });
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const taxRate = 0.08875;
  const totalWithTax = totalPrice * (1 + taxRate);

  const serviceItem = { name: "Email: Lecapife@gmail.com | Call Lecapife Office at (718) 342-3305 for a quote", phone: "tel:17183423305" };

  const categories = [
    { name: "Welding Rods & Spooling Wire", items: [ { name: "7014 3/32", price: 30 }, { name: "7014 ⅛", price: 30 }, { name: "7018 3/32", price: 30 }, { name: "7018 ⅛", price: 30 }, { name: "6013 3/32", price: 30 }, { name: "6013 ⅛", price: 30 }, { name: "6011 3/32", price: 30 }, { name: "6011 ⅛", price: 30 }, { name: "Spooling Wire", price: 90 } ] },
    { name: "Paint & Paint Brushes", items: [
      { name: "PRIMER", price: 40.00 }, { name: "BLACK PRIMER", price: 40.00 }, { name: "RED PRIMER", price: 40.00 }, { name: "GRAY PRIMER", price: 40.00 },
      { name: "PAINT", price: 45.00 }, { name: "FLAT BLACK", price: 45.00 }, { name: "GLOSS BLACK", price: 45.00 }, { name: "DARK BROWN", price: 45.00 }, { name: "WHITE GLOSS", price: 45.00 }, { name: "MEDIUM GRAY", price: 45.00 },
      { name: "Paint Brush 1\"", price: 0.75 }, { name: "Paint Brush 1 ½\"", price: 1.00 }, { name: "Paint Brush 2\"", price: 1.25 }, { name: "Paint Brush 2 ½\"", price: 1.50 }, { name: "Paint Brush 3\"", price: 1.75 }, { name: "Paint Brush 4\"", price: 2.00 },
      { name: "2-Pack, 4-1/2 inch Wool roller", price: 4.50 }, { name: "Paint roller 4\"", price: 2.00 }, { name: "Paint roller 7\"", price: 4.00 }, { name: "Paint roller 9\"", price: 5.00 }
    ]},
    { name: "Cutting Wheels & Grinding Wheels", items: [
      { name: "4” Cutting Wheel", price: 2.00 },
      { name: "5” Cutting Wheel", price: 2.25 },
      { name: "6” Cutting Wheel", price: 2.50 },
      { name: "7” Cutting Wheel", price: 3.00 },
      { name: "9” Cutting Wheel", price: 3.75 },
      { name: "12” Cutting Wheel", price: 5.50 },
      { name: "14” Cutting Wheel", price: 8.00 },
      { name: "4” Grinding Wheel", price: 2.50 },
      { name: "5” Grinding Wheel", price: 2.75 },
      { name: "7” Grinding Wheel", price: 3.75 }
    ] },
    { name: "Flap Discs", items: [
      { name: "100 pc Box", price: 350.00 },
      { name: "75 pc Box", price: 281.25 },
      { name: "48 pc Box", price: 192.00 },
      { name: "24 pc Box", price: 102.00 },
      { name: "10 pc Pack", price: 45.00 },
      { name: "5 pc Pack", price: 23.75 }
    ] },
    { name: "Sheet Metal (Cut to Size)", type: "cut", items: Object.entries(metals).flatMap(([type, gauges]) => Object.entries(gauges).map(([gauge]) => ({ name: `${type}: ${gauge}` }))) },
    { name: "Steel Steps", type: "powder", items: [serviceItem] },
    { name: "Powder Coating", type: "powder", items: [serviceItem] },
    { name: "Sand Blasting", type: "powder", items: [serviceItem] },
    { name: "Fabrication", type: "powder", items: [serviceItem] },
    { name: "Bending", type: "powder", items: [serviceItem] },
  ];

  const toggleCategory = (index) => {
    setOpenCategory(openCategory === index ? null : index);
  };

  const handleCheckout = async () => {
    if (!name || !phone) {
      alert("Please enter your name and phone number before checking out.");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const stripe = await stripePromise;

    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart, customer: { name, phone }, total: totalWithTax.toFixed(2) }),
    });

    const session = await response.json();

    const result = await stripe.redirectToCheckout({ sessionId: session.id });
    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-green-900 via-green-800 to-green-900 text-white">
      <section id="categories" className="py-20 border-t border-yellow-500/30">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-yellow-400">Our Product and Service Categories</h2>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {categories.map((cat, i) => {
              const isOpen = openCategory === i;
              return (
                <Card key={i} className="bg-green-800 border-yellow-500/30">
                  <CardHeader onClick={() => toggleCategory(i)}>
                    <CardTitle className="flex items-center gap-2 text-white cursor-pointer">
                      <CheckCircle className="h-5 w-5 text-yellow-400" /> {cat.name}
                    </CardTitle>
                  </CardHeader>
                  {isOpen && (
                    <CardContent>
                      {cat.type === "cut" ? (
                        <>
                          <select value={selectedMetal} onChange={(e) => setSelectedMetal(e.target.value)} className="w-full p-2 rounded bg-green-700 text-white border border-yellow-500/50">
                            <option value="">-- Choose metal --</option>
                            {cat.items.map((item, idx) => (<option key={idx} value={item.name}>{item.name}</option>))}
                          </select>
                          <div className="flex gap-2 mt-4">
                            <Input type="number" placeholder="Length" value={length} onChange={(e) => setLength(e.target.value)} className="bg-green-700 text-white placeholder-white border border-yellow-500/50" />
                            <Input type="number" placeholder="Width" value={width} onChange={(e) => setWidth(e.target.value)} className="bg-green-700 text-white placeholder-white border border-yellow-500/50" />
                          </div>
                          {calculatePrice() && (
                            <button onClick={() => addToCart({ name: selectedMetal, price: parseFloat(calculatePrice()) })} className="mt-4 px-4 py-2 bg-yellow-500 text-black font-bold rounded hover:bg-yellow-400">Add to Cart (${calculatePrice()})</button>
                          )}
                        </>
                      ) : cat.type === "powder" ? (
                        <a href={cat.items[0].phone} className="text-yellow-400 font-bold underline">{cat.items[0].name}</a>
                      ) : (
                        cat.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center mb-2 p-2 border border-yellow-500/50 rounded bg-green-700">
                            <span className="font-bold text-black bg-white px-2 py-1 rounded">{item.name}</span>
                            {item.price && <span className="text-yellow-400 font-bold">${item.price.toFixed(2)}</span>}
                            {item.price && (
                              <button onClick={() => addToCart(item)} className="ml-4 flex items-center gap-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-500">
                                <ShoppingCart className="h-4 w-4" /> Add
                              </button>
                            )}
                          </div>
                        ))
                      )}
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>

          {cart.length > 0 && (
            <div className="mt-6 p-4 bg-green-800 border border-yellow-500/50 rounded">
              <h3 className="text-2xl text-yellow-400 font-bold mb-4">Your Cart</h3>
              {cart.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center border-b border-yellow-500/30 py-2">
                  <span>{item.name} (x{item.qty})</span>
                  <span>${(item.price * item.qty).toFixed(2)}</span>
                  <div className="flex items-center gap-2 ml-4">
                    <button onClick={() => removeOneFromCart(item.name)} className="text-red-400">Remove One</button>
                  </div>
                </div>
              ))}
              <p className="mt-4 text-yellow-400 font-bold">Subtotal: ${totalPrice.toFixed(2)}</p>
              <p className="text-yellow-400 font-bold">Tax: ${(totalPrice * taxRate).toFixed(2)}</p>
              <p className="text-yellow-400 font-bold">Total: ${totalWithTax.toFixed(2)}</p>

              <div className="mt-4 space-y-2">
                <Input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} className="bg-green-700 text-white placeholder-white border border-yellow-500/50 text-white" />
                <Input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="bg-green-700 text-white placeholder-white border border-yellow-500/50 text-white" />
              </div>

              <button onClick={handleCheckout} className="mt-4 w-full bg-yellow-500 text-black py-2 rounded font-bold hover:bg-yellow-400">Checkout with Stripe</button>
            </div>
          )}

          <div className="mt-10 text-center text-white">
            <p>Email: <span className="text-yellow-400">Lecapife@gmail.com</span></p>
            <p>Call Lecapife Office at <span className="text-yellow-400">(718) 342-3305</span></p>
          </div>
        </div>
      </section>
    </div>
  );
}
