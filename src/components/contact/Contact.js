import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import Title from '../layouts/Title';
import ContactLeft from './ContactLeft';

const Contact = () => {
  const form = useRef();
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  // const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Track form submission

  // Email Validation
  const emailValidation = () => {
    return String(email)
      .toLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  };

  // Handle form submission
  const handleSend = (e) => {
    e.preventDefault();

    if (isSubmitting) return; // Prevent multiple submissions

    if (username === "") {
      setErrMsg("Username is required!");
    } else if (phoneNumber === "") {
      setErrMsg("Phone number is required!");
    } else if (email === "") {
      setErrMsg("Please give your Email!");
    } else if (!emailValidation(email)) {
      setErrMsg("Give a valid Email!");
    // } else if (subject === "") {
    //   setErrMsg("Please give your Subject!");
    } else if (message === "") {
      setErrMsg("Message is required!");
    } else {
      setIsSubmitting(true); // Set submitting state to true

      // Sending the email
      emailjs
        .sendForm(
          'service_i89yxwl', 
          'template_yqvqq9e', 
          form.current, 
          'aYEqkFjQKa1r8-kUu'
        )
        .then(
          () => {
            setSuccessMsg(`Thank you dear ${username}, Your message has been sent successfully!`);
            setErrMsg("");
            setUsername("");
            setPhoneNumber("");
            setEmail("");
            // setSubject("");
            setMessage("");
            setIsSubmitting(false); // Reset submitting state after success
          },
          (error) => {
            setErrMsg("Failed to send the message, please try again.");
            console.log('FAILED...', error.text);
            setIsSubmitting(false); // Reset submitting state after failure
          }
        );
    }
  };

  return (
    <section id="contact" className="w-full py-20 border-b-[1px] border-b-black">
      <div className="flex justify-center items-center text-center">
        <Title title="CONTACT" des="Contact With Me" />
      </div>
      <div className="w-full">
        <div className="w-full h-auto flex flex-col lgl:flex-row justify-between">
          <ContactLeft />
          <div className="w-full lgl:w-[60%] h-full py-10 bg-gradient-to-r from-[#1e2024] to-[#23272b] flex flex-col gap-8 p-4 lgl:p-8 rounded-lg shadow-shadowOne">
            <form ref={form} className="w-full flex flex-col gap-4 lgl:gap-6 py-2 lgl:py-5" onSubmit={handleSend}>
              {errMsg && (
                <p className="py-3 bg-gradient-to-r from-[#1e2024] to-[#23272b] shadow-shadowOne text-center text-orange-500 text-base tracking-wide animate-bounce">
                  {errMsg}
                </p>
              )}
              {successMsg && (
                <p className="py-3 bg-gradient-to-r from-[#1e2024] to-[#23272b] shadow-shadowOne text-center text-green-500 text-base tracking-wide animate-bounce">
                  {successMsg}
                </p>
              )}
              <div className="w-full flex flex-col lgl:flex-row gap-10">
                <div className="w-full lgl:w-1/2 flex flex-col gap-4">
                  <p className="text-sm text-gray-400 uppercase tracking-wide">Your name</p>
                  <input
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    className={`${errMsg === "Username is required!" && "outline-designColor"} contactInput`}
                    type="text"
                    name="user_name"
                  />
                </div>
                <div className="w-full lgl:w-1/2 flex flex-col gap-4">
                  <p className="text-sm text-gray-400 uppercase tracking-wide">Phone Number</p>
                  <input
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    value={phoneNumber}
                    className={`${errMsg === "Phone number is required!" && "outline-designColor"} contactInput`}
                    type="text"
                    name="user_phone"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-sm text-gray-400 uppercase tracking-wide">Email</p>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className={`${errMsg === "Please give your Email!" && "outline-designColor"} contactInput`}
                  type="email"
                  name="user_email"
                />
              </div>
              
              <div className="flex flex-col gap-4">
                <p className="text-sm text-gray-400 uppercase tracking-wide">Message</p>
                <textarea
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                  className={`${errMsg === "Message is required!" && "outline-designColor"} contactTextArea`}
                  cols="30"
                  rows="8"
                  name="message"
                ></textarea>
              </div>
              <div className="w-full">
                <button
                  type="submit"
                  className="w-full h-12 bg-[#141518] rounded-lg text-base text-gray-400 tracking-wider uppercase hover:text-white duration-300 hover:border-[1px] hover:border-designColor border-transparent"
                  disabled={isSubmitting} // Disable button while submitting
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
