"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/utils/cn";
import { ModeToggle } from '@/csr_comps/modetoggle';
import Image from 'next/image'
import devergoLogo from '@/public/images/devergologo.png'
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (

    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-[100]", className)}
    >
    <HoverBorderGradient
      containerClassName="rounded-full"
      className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
    >
    <Menu setActive={setActive}>
        <Image
          src={devergoLogo}
          alt="Picture of the author" 
          sizes="100vw"
          className="w-[150px]"  //oppure width heigth
        />
        <MenuItem setActive={setActive} active={active} item="Services">
          <div className="text-sm grid grid-cols-3 gap-10 p-4">
            <ProductItem
              title="Web Development"
              href="/services/web_development"
              src="/images/web_development.png"
              description="Crafting responsive and dynamic websites that drive your business forward."
            />
            <ProductItem
              title="Native Mobile Apps"
              href="/services/native_mobile_apps"
              src="/images/native_mobile_apps.png"
              description="Building innovative mobile apps to enhance user engagement on the go."
            />
            <ProductItem
              title="UI/UX design"
              href="/services/ui_ux_design"
              src="/images/ui_ux_design.png"
              description="Intuitive and delightful user experiences that captivate your audience."
            />
            <ProductItem
              title="AI solutions"
              href="/services/ai_solutions"
              src="/images/ai_solutions.png"
              description="Empowering Tomorrow with Intelligent AI Solutions Today."
            />
            <ProductItem
              title="Cloud integration"
              href="/services/cloud_integration"
              src="/images/cloud_integration.png"
              description="Seamlessly integrating cloud solutions to boost your operational efficiency."
            />
            <ProductItem
              title="Custom software dev"
              href="/services/custom_software_development"
              src="/images/custom_software_development.png"
              description="Creating tailored software solutions that fit your unique business needs."
            />
            <ProductItem
              title="App modernization"
              href="/services/app_modernization"
              src="/images/app_modernization.png"
              description="Enhance performance and scalability of your legacy applications."
            />
            <ProductItem
              title="MVP Services"
              href="/services/mvp_services"
              src="/images/mvp_services.png"
              description="Delivering minimum viable products to validate your ideas quickly and efficiently."
            />
            <ProductItem
              title="Data Analytics"
              href="/services/data_analytics"
              src="/images/data_analytics.png"
              description="Unlock Insights, Drive Success: Transform Your Data into Actionable Intelligence."
            />
            <ProductItem
              title="DevOps Engineering"
              href="/services/devops_engineering"
              src="/images/devops_engineering.png"
              description="Streamline, Automate, Innovate: Empower Your DevOps Ecosystem."
            />
            <ProductItem
              title="UrgentTech Aid"
              href="/services/urgenttech_aid"
              src="/images/urgenttech_aid.png"
              description="We provide swift technical support when you need it the most."
            />
            <ProductItem
              title="API Dev & Integration"
              href="/services/api_dev_integration"
              src="/images/api_dev_integration.png"
              description="Connect your systems with robust API development and integration."
            />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Portfolio">
          <div className="  text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Algochurn"
              href="https://algochurn.com"
              src="https://assets.aceternity.com/demos/algochurn.webp"
              description="Prepare for tech interviews like never before."
            />
            <ProductItem
              title="Tailwind Master Kit"
              href="https://tailwindmasterkit.com"
              src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
              description="Production ready Tailwind css components for your next project"
            />
            <ProductItem
              title="Moonbeam"
              href="https://gomoonbeam.com"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
              description="Never write from scratch again. Go from idea to blog in minutes."
            />
            <ProductItem
              title="Rogue"
              href="https://userogue.com"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
              description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
            />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="AI">
          <div className="  text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Algochurn"
              href="https://algochurn.com"
              src="https://assets.aceternity.com/demos/algochurn.webp"
              description="Prepare for tech interviews like never before."
            />
            <ProductItem
              title="Tailwind Master Kit"
              href="https://tailwindmasterkit.com"
              src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
              description="Production ready Tailwind css components for your next project"
            />
            <ProductItem
              title="Moonbeam"
              href="https://gomoonbeam.com"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
              description="Never write from scratch again. Go from idea to blog in minutes."
            />
            <ProductItem
              title="Rogue"
              href="https://userogue.com"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
              description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
            />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Technologies">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/web-dev">Web Development</HoveredLink>
            <HoveredLink href="/interface-design">Interface Design</HoveredLink>
            <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
            <HoveredLink href="/branding">Branding</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={null} item="Company" />
        <ModeToggle />
      </Menu>
      </HoverBorderGradient>
    </div>

  );
}
