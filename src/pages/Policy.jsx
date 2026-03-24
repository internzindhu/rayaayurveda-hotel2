import Navbar from "../components/Navbar";

export default function Policy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-32 space-y-12">

        {/* Complaint Handling Policy */}
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Raya Long Life – Customer Complaint Handling Policy</h1>
          <p className="text-gray-600 mb-8">
            At Raya Long Life, we are committed to delivering a smooth and reliable travel experience. If you encounter any
            issue during booking, payment, or your travel service, we are here to help.
          </p>

          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">1. How to Submit a Complaint</h2>
              <p className="text-gray-700 leading-relaxed mb-3">You may contact us through any of the following methods:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
                <li>Email: <a href="mailto:support@rayalonglife.com" className="text-emerald-600 hover:underline">support@rayalonglife.com</a></li>
                <li>Online Complaint Form</li>
                <li>Phone / WhatsApp</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-2">When submitting a complaint, please include:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Your booking reference number</li>
                <li>Name and contact details</li>
                <li>Description of the issue</li>
                <li>Any supporting documents or screenshots</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Acknowledgement Timeline</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Complaints are acknowledged within 48 hours.</li>
                <li>You will receive a ticket/reference number for tracking.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Resolution Timeline</h2>
              <p className="text-gray-700 leading-relaxed mb-3">We aim to resolve:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3">
                <li>Simple complaints within 7 days</li>
                <li>Supplier-related cases (e.g., hotels, Resorts) within 7–14 days</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Certain cases may take longer depending on supplier response times, but we will keep you updated.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Escalation</h2>
              <p className="text-gray-700 leading-relaxed">
                If you are not satisfied with the initial response, you may request escalation to a supervisor or manager.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Fair Handling Commitment</h2>
              <p className="text-gray-700 leading-relaxed mb-3">Raya Long Life assures:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Transparent and timely communication</li>
                <li>Objective assessment of all complaints</li>
                <li>No discrimination or bias</li>
                <li>Protection of customer data and privacy</li>
              </ul>
            </section>

          </div>
        </div>

        {/* Refund & Cancellation Policy */}
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Raya Long Life – Refund &amp; Cancellation Policy</h1>
          <p className="text-gray-600 mb-8">
            Bookings made through Raya Long Life are subject to the cancellation and refund policies of the respective
            suppliers such as hotels, resorts, airlines, and activity providers. Raya Long Life acts as an intermediary
            and does not control supplier rules.
          </p>

          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Cancellation Terms</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3">
                <li>Each product (hotel, flight, activity) has specific cancellation conditions.</li>
                <li>These will be displayed at the time of booking.</li>
                <li>Some bookings may be non-refundable.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Customers are advised to review cancellation terms before completing the booking.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Refund Eligibility</h2>
              <p className="text-gray-700 leading-relaxed mb-3">A refund may be applicable if:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>The booking is refundable under supplier terms</li>
                <li>The customer cancels within the allowed period</li>
                <li>The supplier cancels or fails to deliver the service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Refund Amount</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                If a refund is approved, the final refund amount will be:
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg px-6 py-4 mb-3">
                <p className="text-gray-800 font-medium">Refund = (Supplier Refund Amount) – (OTA Service Fee of 1%)</p>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Raya Long Life charges a 1% service fee on the refunded amount. No additional hidden charges apply.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Refund Method</h2>
              <p className="text-gray-700 leading-relaxed">
                Refunds are issued only to the original payment method used at the time of booking.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Refund Processing Time</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3">
                <li>Raya Long Life processing: 3–7 working days</li>
                <li>Bank or card processor: 7–21 working days</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">Processing times may vary depending on the bank.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Non-Refundable Conditions</h2>
              <p className="text-gray-700 leading-relaxed mb-3">Refunds cannot be provided if:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>The booking was clearly marked non-refundable</li>
                <li>You are a no-show</li>
                <li>Cancellation occurs after the penalty period</li>
                <li>The supplier rejects the refund request</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Special Circumstances</h2>
              <p className="text-gray-700 leading-relaxed">
                In rare cases such as political unrest, natural disasters, or force majeure, suppliers may apply special
                refund rules which may differ from standard terms.
              </p>
            </section>

            <div className="pt-6 border-t">
              <p className="text-sm text-gray-500">Last updated: March 2026</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
