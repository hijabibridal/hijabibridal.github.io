const TermsAndConditionsPage = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
        <p className="mb-6">
          Welcome to our Pet Gadget Insider! Please read the following terms and conditions carefully before using this website. By accessing or using our site, you agree to be bound by these terms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Content Disclaimer</h2>
        <p>
          All content provided on this website is intended for general informational purposes regarding pet products and lifestyle. We are not licensed veterinarians, nor do we provide professional medical or veterinary advice. Always consult with a qualified veterinarian or specialist before making decisions about your pet's health or treatment.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Affiliate Disclosure</h2>
        <p>
          Some of the links on our site are affiliate links, including those from the Amazon Associates program and other affiliate networks. This means we may earn a small commission—at no additional cost to you—if you make a purchase through one of these links. These commissions help support the maintenance and content creation for this blog. We only recommend products we believe add value to our readers.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">You will not reproduce, republish, or redistribute any of our content without express written permission.</li>
          <li className="mb-2">You will use comment sections in a respectful and appropriate manner, free from harassment, spam, or offensive material.</li>
          <li className="mb-2">You are responsible for evaluating the accuracy, completeness, and usefulness of any information or products before making a purchase or acting on advice.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Limitation of Liability</h2>
        <p className="mb-4">
          We strive to provide up-to-date and accurate content, but we make no warranties regarding the completeness, accuracy, or reliability of any information. We are not responsible for:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">Product performance, effectiveness, or safety</li>
          <li className="mb-2">Errors or inaccuracies in product descriptions or recommendations</li>
          <li className="mb-2">Content or practices of third-party websites linked on our blog</li>
        </ul>
        <p>
          You agree to use this site at your own discretion and acknowledge that any reliance on the content is at your own risk.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">5. Modifications to These Terms</h2>
        <p>
          We may update or revise these terms and conditions at any time without prior notice. Any changes will be effective immediately upon posting. Continued use of our site following changes implies your acceptance of the revised terms.
        </p>
      </section>
    </div>
  );
};

export default TermsAndConditionsPage;