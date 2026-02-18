import { useState } from "react";
import Navbar from "../components/Navbar";

const STEPS = [
  {
    text: "Choose a gift voucher (number of pieces) with a nominal value of 500 EUR, 1000 EUR or any amount as you prefer.",
  },
  {
    text: "Enter the personal or company details of the recipient for whom you wish to issue the gift voucher.",
  },
  {
    text: "We will issue you an invoice to your personal email address.",
  },
  {
    text: "After payment of the invoice, we will physically send you a Gift Voucher by post & courier to your postal address or electronically via email.",
  },
];

const inputClass =
  "w-full border border-[#181818] rounded-md px-3 py-2.5 text-sm text-[#181818] bg-white focus:outline-none focus:ring-1 focus:ring-[#5E17EB] placeholder:text-[#888]";
const labelClass = "block text-sm font-medium text-[#181818] mb-1.5";

export default function Vouchers() {
  const [quantity, setQuantity] = useState(1);
  const [selectedValue, setSelectedValue] = useState(null); // '500' | '1000' | 'custom'
  const [customValue, setCustomValue] = useState("");
  const [sender, setSender] = useState({ fullName: "", email: "", contact: "" });
  const [receiver, setReceiver] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
  });
  const [receiveMethod, setReceiveMethod] = useState("");
  const [invoiceToCompany, setInvoiceToCompany] = useState(false);
  const [notes, setNotes] = useState("");
  const [agreeStorage, setAgreeStorage] = useState(false);

  return (
    <div className="min-h-screen bg-[#FFFBF7]">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-20">
        {/* Title + intro */}
        <h1
          className="text-4xl sm:text-5xl font-normal text-[#181818] mb-6"
          style={{ fontFamily: "Sentient, serif" }}
        >
          Gift Vouchers
        </h1>
        <div className="max-w-3xl space-y-4 mb-12" style={{ fontFamily: "Lato, sans-serif" }}>
          <p className="text-base text-[#181818] leading-relaxed">
            Reward your loved ones, friends, and employees with an Ayurvedic wellness weekend or a
            healing Ayurvedic stay.
          </p>
          <p className="text-base text-[#181818] leading-relaxed">
            Gift certificates are always welcome, for every occasion and sometimes even
            &apos;just because&apos;.
          </p>
          <p className="text-base text-[#181818] leading-relaxed">
            And since you want to make your loved ones, friends, and employees happy without
            telling them specifically when and what to do, our gift voucher is accepted at all
            Ayurvedic resorts in Austria, Hungary, Sri Lanka, and Thailand, which are exclusively
            offered by Raya Longlife.
          </p>
        </div>

        {/* Image + numbered steps */}
        <section className="grid grid-cols-1 lg:grid-cols-[1fr,1.2fr] gap-10 lg:gap-14 mb-20">
          <div className="relative">
            <img
              src="/leaves.jpg"
              alt=""
              className="w-full object-cover rounded-lg aspect-[16/10] object-center"
            />
          </div>
          <div className="flex flex-col gap-4">
            {STEPS.map((step, i) => (
              <div key={i} className="flex gap-4 items-stretch">
                <div
                  className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-md text-white text-xl font-semibold"
                  style={{ backgroundColor: "#5E17EB", fontFamily: "Lato, sans-serif" }}
                >
                  {i + 1}
                </div>
                <div
                  className="flex-1 border border-[#181818] rounded-md px-4 py-3 bg-white text-sm text-[#181818] leading-relaxed"
                  style={{ fontFamily: "Lato, sans-serif" }}
                >
                  {step.text}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Form section */}
        <section className="relative bg-white rounded-2xl shadow-md border border-[#E0D4C8]/50 p-6 sm:p-8 md:p-10 overflow-hidden">
          {/* Decorative leaves bottom-right */}
          <div
            className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 opacity-20 pointer-events-none bg-cover bg-bottom bg-no-repeat"
            style={{ backgroundImage: "url(/leaves.jpg)" }}
            aria-hidden="true"
          />

          <h2
            className="text-xl sm:text-2xl font-bold text-[#181818] text-center mb-10"
            style={{ fontFamily: "Lato, sans-serif" }}
          >
            BUY THEM A GIFT VOUCHER NOW.
          </h2>

          <div className="relative z-10 max-w-4xl mx-auto space-y-8">
            {/* Number + Value */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className={labelClass} style={{ fontFamily: "Lato, sans-serif" }}>
                  Number
                </label>
                <div className="inline-flex items-center border border-[#181818] rounded-md overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-4 py-2.5 bg-white hover:bg-[#F4F4F4] text-[#181818] border-r border-[#181818]"
                  >
                    -
                  </button>
                  <span
                    className="px-6 py-2.5 border-r border-[#181818] text-[#181818] min-w-[3rem] text-center"
                    style={{ fontFamily: "Lato, sans-serif" }}
                  >
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-4 py-2.5 bg-white hover:bg-[#F4F4F4] text-[#181818]"
                  >
                    +
                  </button>
                </div>
              </div>
              <div>
                <label className={labelClass} style={{ fontFamily: "Lato, sans-serif" }}>
                  Select Value
                </label>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedValue("500")}
                    className={`px-5 py-2.5 rounded-md border text-sm font-medium transition-colors ${selectedValue === "500" ? "bg-[#5E17EB] text-white border-[#5E17EB]" : "bg-white text-[#181818] border-[#181818] hover:bg-[#F4F4F4]"}`}
                    style={{ fontFamily: "Lato, sans-serif" }}
                  >
                    VALUE €500
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedValue("1000")}
                    className={`px-5 py-2.5 rounded-md border text-sm font-medium transition-colors ${selectedValue === "1000" ? "bg-[#5E17EB] text-white border-[#5E17EB]" : "bg-white text-[#181818] border-[#181818] hover:bg-[#F4F4F4]"}`}
                    style={{ fontFamily: "Lato, sans-serif" }}
                  >
                    VALUE €1000
                  </button>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#181818]" style={{ fontFamily: "Lato, sans-serif" }}>
                      Select your value €
                    </span>
                    <input
                      type="number"
                      placeholder="—"
                      value={customValue}
                      onChange={(e) => {
                        setCustomValue(e.target.value);
                        if (e.target.value) setSelectedValue("custom");
                      }}
                      className="w-24 border border-[#181818] rounded-md px-2 py-2 text-sm bg-white"
                      style={{ fontFamily: "Lato, sans-serif" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Sender Details */}
            <div>
              <h3
                className="text-sm font-semibold text-[#181818] uppercase tracking-wide mb-3"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                Sender Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-[#555] mb-1 block" style={{ fontFamily: "Lato, sans-serif" }}>
                    Full name*
                  </label>
                  <input
                    type="text"
                    placeholder="Full name"
                    value={sender.fullName}
                    onChange={(e) => setSender((s) => ({ ...s, fullName: e.target.value }))}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-xs text-[#555] mb-1 block" style={{ fontFamily: "Lato, sans-serif" }}>
                    Email*
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    value={sender.email}
                    onChange={(e) => setSender((s) => ({ ...s, email: e.target.value }))}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-xs text-[#555] mb-1 block" style={{ fontFamily: "Lato, sans-serif" }}>
                    Contact number*
                  </label>
                  <input
                    type="tel"
                    placeholder="Contact number"
                    value={sender.contact}
                    onChange={(e) => setSender((s) => ({ ...s, contact: e.target.value }))}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* Receiver Details */}
            <div>
              <h3
                className="text-sm font-semibold text-[#181818] uppercase tracking-wide mb-3"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                Receiver Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <label className="text-xs text-[#555] mb-1 block" style={{ fontFamily: "Lato, sans-serif" }}>
                    First name*
                  </label>
                  <input
                    type="text"
                    placeholder="First name"
                    value={receiver.firstName}
                    onChange={(e) => setReceiver((r) => ({ ...r, firstName: e.target.value }))}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-xs text-[#555] mb-1 block" style={{ fontFamily: "Lato, sans-serif" }}>
                    Last name*
                  </label>
                  <input
                    type="text"
                    placeholder="Last name"
                    value={receiver.lastName}
                    onChange={(e) => setReceiver((r) => ({ ...r, lastName: e.target.value }))}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-xs text-[#555] mb-1 block" style={{ fontFamily: "Lato, sans-serif" }}>
                    Email*
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    value={receiver.email}
                    onChange={(e) => setReceiver((r) => ({ ...r, email: e.target.value }))}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-xs text-[#555] mb-1 block" style={{ fontFamily: "Lato, sans-serif" }}>
                    Contact number*
                  </label>
                  <input
                    type="tel"
                    placeholder="Contact number"
                    value={receiver.contact}
                    onChange={(e) => setReceiver((r) => ({ ...r, contact: e.target.value }))}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-xs text-[#555] mb-1 block" style={{ fontFamily: "Lato, sans-serif" }}>
                    Select receive method
                  </label>
                  <select
                    value={receiveMethod}
                    onChange={(e) => setReceiveMethod(e.target.value)}
                    className={inputClass + " appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 24 24%27 stroke=%27%23181818%27%3E%3Cpath stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%272%27 d=%27M19 9l-7 7-7-7%27/%3E%3C/svg%3E')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat pr-9"}
                  >
                    <option value="">Select</option>
                    <option value="post">Post &amp; courier</option>
                    <option value="email">Electronically via email</option>
                  </select>
                </div>
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer" style={{ fontFamily: "Lato, sans-serif" }}>
              <input
                type="checkbox"
                checked={invoiceToCompany}
                onChange={(e) => setInvoiceToCompany(e.target.checked)}
                className="w-4 h-4 rounded border-[#181818] text-[#5E17EB] focus:ring-[#5E17EB]"
              />
              <span className="text-sm text-[#181818]">Invoice to company (optional)</span>
            </label>

            <div>
              <label className={labelClass} style={{ fontFamily: "Lato, sans-serif" }}>
                Further notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                placeholder="Additional comments…"
                className={inputClass + " resize-y"}
              />
            </div>

            <label className="flex items-start gap-2 cursor-pointer" style={{ fontFamily: "Lato, sans-serif" }}>
              <input
                type="checkbox"
                checked={agreeStorage}
                onChange={(e) => setAgreeStorage(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded border-[#181818] text-[#5E17EB] focus:ring-[#5E17EB]"
              />
              <span className="text-sm text-[#181818]">
                I AGREE TO THE STORAGE OF THE DATA PROVIDED IN MY INQUIRY.
              </span>
            </label>

            <div className="flex justify-center pt-4">
              <button
                type="button"
                className="px-12 py-3.5 rounded-md bg-[#5E17EB] text-white font-medium tracking-wide hover:bg-[#4B12BD] transition-colors"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                SEND
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
