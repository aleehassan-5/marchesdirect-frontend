import { Suspense } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactForm, ContactHeader } from "@/components/ContactForm";

// ContactForm uses useSearchParams() (to prefill from a listing's "ref"/"titre"
// query params). Next.js requires that to be wrapped in a Suspense boundary
// on any statically-generated page, or `next build` fails outright - it's not
// just a warning. This was missing, which is the most likely reason the
// Vercel build failed.
export default function ContactPage() {
  return (
    <>
      <Header />
      <div className="max-w-[520px] mx-auto px-5 py-14 md:py-20">
        <ContactHeader />
        <Suspense fallback={<div className="card p-6 text-ink-soft text-[14px]">...</div>}>
          <ContactForm />
        </Suspense>
      </div>
      <Footer />
    </>
  );
}
