import { motion, AnimatePresence } from "framer-motion"
import PageTemplate from "../../Components/Layout/PageTemplate"
import { useRef, useState } from "react"

const ContactPage = () => {
  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const countryCodeRef = useRef()
  const phoneRef = useRef()
  const subjectRef = useRef()
  const messageRef = useRef()
  const formRef = useRef()
  const [showSuccess, setShowSuccess] = useState(false)
  const [isAiLoading, setIsAiLoading] = useState(false)

  const handleAiEnhanceMessage = async () => {
    const currentUserMessage = messageRef.current.value
    if (!currentUserMessage.trim()) {
      return
    }

    setIsAiLoading(true)
    let aiMessage = null; // Initialize aiMessage
    try {
      // IMPORTANT SECURITY WARNING:
      // The API key is exposed in the client-side code here.
      // This is NOT recommended for production applications.
      // Use a backend or serverless function to protect your API key.
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY; // For Vite
      // Or for Create React App: const apiKey = process.env.REACT_APP_GEMINI_API_KEY;

      if (!apiKey) {
        throw new Error("Gemini API key is not configured. Please check your .env file.");
      }

      // --- Actual Gemini API Call --- 
      const geminiApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`; 

      // Refined prompt to get a direct rewritten message
      const prompt = `Transform the following user's raw text into a formal, and professional message suitable for a photography service inquiry. Output ONLY the rewritten message and the message should contain all what user has written, without any extra explanation, options, or introductory phrases. Dont add greetings and subjects. Raw user text: "${currentUserMessage}"`;

      const requestBody = {
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
        // Add generationConfig, safetySettings if needed, as per Gemini API docs
        // For example, to encourage shorter responses, you might add:
        // generationConfig: {
        //   maxOutputTokens: 150 // Adjust as needed
        // }
      };

      const response = await fetch(geminiApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Gemini API Error Data:', errorData);
        let detailedError = errorData.error?.message || 'Gemini API request failed.';
        if (errorData.error?.details) {
          detailedError += ` Details: ${JSON.stringify(errorData.error.details)}`;
        }
        throw new Error(detailedError);
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
        aiMessage = data.candidates[0].content.parts[0].text;
      } else {
        console.error('Unexpected Gemini API response structure. Full response:', data);
        throw new Error('Could not extract AI message from Gemini response. Check console for the full response data.');
      }
      // --- End of Actual Gemini API Call ---

      if (aiMessage) {
        messageRef.current.value = aiMessage.trim(); // .trim() to remove any leading/trailing whitespace
      }

    } catch (error) {
      console.error("AI Message Enhancement Error Full:", error);
      alert(`Error enhancing message: ${error.message}. Check console for details. Ensure your API key is correct, the .env variable is properly named, and the Gemini model is supported.`);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Collect form data
    const formData = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      countryCode: countryCodeRef.current.value,
      phone: phoneRef.current.value,
      subject: subjectRef.current.value,
      message: messageRef.current.value
    }

    // Create WhatsApp message text
    const ownerWhatsappNumber = "923264002982" // Include country code (92 for Pakistan)
    const formattedPhone = `${formData.countryCode}${formData.phone.replace(/^0+/, '')}` // Remove leading zeros if present
    
    let messageText = `🌟 *PHOTOGRAPHY BOOKING INQUIRY* 🌟\n\n` +
      `Dear Arham Photography,\n\n` +
      `I would like to inquire about your photography services.\n\n` +
      `*Client Details:*\n` +
      `👤 *Name:* ${formData.firstName} ${formData.lastName}\n` +
      `📱 *Contact:* ${formattedPhone}\n\n` +
      `*Service Required:* ${formData.subject} Photography\n\n` +
      `*Client Message:*\n${formData.message}\n\n` +
      `I look forward to your response.\n` +
      `Thank you.`
      
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(messageText)
    
    // Create WhatsApp URL with correct country code format
    const whatsappUrl = `https://wa.me/${ownerWhatsappNumber}?text=${encodedMessage}`
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank')

    // Reset the form
    formRef.current.reset()
    
    // Show success message
    setShowSuccess(true)
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false)
    }, 3000)
  }

  return (
    <PageTemplate
      title="Contact Us"
      description="Let's create something beautiful together"
      heroImage="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop"
    >
      {/* Success Message */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
              <span>Message sent successfully!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 h-fit"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
              
              <div className="space-y-6 text-gray-300">
                <div>
                  <h3 className="text-white font-semibold mb-1">Phone</h3>
                  <p>03264002982</p>
                </div>
                
                <div>
                  <h3 className="text-white font-semibold mb-1">Email</h3>
                  <p>arhamawan200@gmail.com</p>
                </div>
                
                <div>
                  <h3 className="text-white font-semibold mb-1">Address</h3>
                  <p>College road Lahore</p>
                </div>
                
                <div>
                  <h3 className="text-white font-semibold mb-1">Appointment Hours</h3>
                  <div className="space-y-1">
                    <p>Monday-Friday | 9 am - 7 pm</p>
                    <p>Saturday-Sunday | 10 am - 4 pm</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Whatsapp Me</h2>
              
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      ref={firstNameRef}
                      required
                      className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      ref={lastNameRef}
                      required
                      className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                    Phone Number *
                  </label>
                  <div className="flex flex-wrap md:flex-nowrap gap-2 w-full">
                    <select
                      id="countryCode"
                      name="countryCode"
                      ref={countryCodeRef}
                      required
                      className="w-full md:w-auto md:min-w-[130px] px-3 py-2 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:border-white transition-colors"
                      defaultValue="+92"
                    >
                      <option value="+92">+92 (Pakistan)</option>
                      <option value="+1">+1 (US/Canada)</option>
                      <option value="+44">+44 (UK)</option>
                      <option value="+91">+91 (India)</option>
                      <option value="+971">+971 (UAE)</option>
                      <option value="+966">+966 (Saudi)</option>
                      <option value="+61">+61 (Australia)</option>
                      <option value="+49">+49 (Germany)</option>
                    </select>
                  <input
                      type="tel"
                      id="phone"
                      name="phone"
                      ref={phoneRef}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:border-white transition-colors"
                      placeholder="Your phone number"
                  />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                    Type of Photography *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    ref={subjectRef}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-gray-700/100 border border-gray-600 text-white focus:outline-none focus:border-white transition-colors"
                  >
                    <option value="">Select a type</option>
                    <option value="wedding">Wedding Photography</option>
                    <option value="portrait">Portrait Photography</option>
                    <option value="nature">Nature Photography</option>
                    <option value="product">Product Photography</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    Message *
                  </label>
                  <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    ref={messageRef}
                    required
                    rows="4"
                      className="w-full px-4 py-2 pr-12 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:border-white transition-colors"
                      placeholder="Type your message or click the icon to enhance with AI"
                  ></textarea>
                    <button
                      type="button"
                      onClick={handleAiEnhanceMessage}
                      disabled={isAiLoading}
                      className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-gray-700/60 hover:bg-gray-600/80 text-gray-300 hover:text-white rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-sky-500"
                      aria-label="Enhance message with AI"
                      title="Enhance message with AI"
                    >
                      {isAiLoading ? (
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                           <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-3 rounded-lg bg-white text-gray-900 font-medium hover:bg-gray-100 transition-colors"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTemplate>
  )
}

export default ContactPage 