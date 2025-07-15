import { cn } from "@/lib/utils";
import { actions, isInputError } from "astro:actions";
import { Check, CheckCircle, Send, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const form = event.currentTarget;

    const formData = new FormData(form);

    try {
      const { data, error } = await actions.contact.sendContact(formData);

      if (isInputError(error)) {
        setEmailError(true);
        toast.error(error.fields.email, {
          icon: <XCircle className="text-red-500" size={20} />,
        });
      }

      if (data) {
        setEmailError(false);
        toast.success(
          "Thank you for contacting us! We have received your message.",
          {
            icon: <Check className="text-green-500" size={20} />,
          }
        );
        form.reset();
      }
      // TODO: remove me - replace with email or sum
      console.log(data);
    } catch (error) {
      toast.error("An error occurred while sending the message.", {
        icon: <XCircle className="text-red-500" size={20} />,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="bg-gray-50 p-8 rounded-xl" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className={cn(
              "block text-sm font-medium text-gray-700 mb-2",
              emailError && "text-red-600"
            )}
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className={cn(
              "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
              emailError && "border-red-600"
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-6">
        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="mb-6">
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Tell me about your project..."
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-800 text-white px-6 py-4 rounded-lg hover:bg-blue-900 transition-colors duration-200 flex items-center justify-center group"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
        <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transhtmlForm duration-200" />
      </button>
    </form>
  );
};
