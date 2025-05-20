import React from "react";
import Header from "../components/Header";

function AboutUs() {
  return (
    <section id="aboutus" className="py-2  min-vh-100 main-section">
      <div className="container-fluid">
        <Header title='About Us'/>
        <div className="content">
          <div className="row align-items-center">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sit
              amet lacus nec magna commodo imperdiet. Vivamus vestibulum, odio a
              tincidunt dignissim, justo nisl fermentum risus, vitae viverra
              arcu lacus sed augue. Sed vehicula ullamcorper diam, nec fermentum
              orci feugiat id.
            </p>

            <h2 class="mt-5">Our Mission</h2>
            <p>
              Our mission is to deliver innovative solutions that empower
              businesses to achieve operational excellence. We are committed to
              integrity, collaboration, and continuous improvement in everything
              we do.
            </p>

            <h2 class="mt-4">Core Values</h2>
            <ul>
              <li>Integrity and transparency</li>
              <li>Customer-centric innovation</li>
              <li>Teamwork and accountability</li>
              <li>Commitment to excellence</li>
            </ul>

            <h2 class="mt-4">Contact Us</h2>
            <p>
              For inquiries, please reach out to our team via the contact form
              or by emailing{" "}
              <a href="mailto:info@example.com">info@example.com</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
