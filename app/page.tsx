import { SignedIn, SignedOut, SignUpButton, SignOutButton } from "@clerk/nextjs";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import WhatToAsk from "@/components/WhatToAsk";
import Pricing from "@/components/Pricing";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


export default async function Home() {

  const user = await currentUser();
  if(user) redirect("/dashboard")

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <HowItWorks />
      <WhatToAsk/>
      <Pricing/>
      <CTA/>
      <Footer/>
    </div>
  )
}