import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, FileText, MessageSquare, Phone } from "lucide-react";

const Help = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      question: "How do I add new birds to inventory?",
      answer:
        "Navigate to the Inventory page and click on 'Add Birds' button. Fill in the required details such as bird type, quantity, and coup assignment. Click 'Save' to update your inventory.",
    },
    {
      question: "How can I track egg production?",
      answer:
        "Egg production can be tracked from the Dashboard where you'll see production charts. For detailed tracking, go to the Inventory section and select the 'Layers' tab to record daily egg collection.",
    },
    {
      question: "How do I generate financial reports?",
      answer:
        "Go to the Financials page and click on 'Generate Report'. Select the report type (Income, Expense, or Profit/Loss), specify the date range, and click 'Generate'.",
    },
    {
      question: "Can I export data from the system?",
      answer:
        "Yes, you can export data in various formats. Go to Settings > Advanced and click on 'Export Data'. Choose the data type and format you prefer.",
    },
    {
      question: "How do I add a new customer?",
      answer:
        "Navigate to the Customers page and click on 'Add Customer'. Fill in the customer details such as name, contact information, and any notes. Click 'Save' to add the customer to your database.",
    },
    {
      question: "How can I set up alerts for low inventory?",
      answer:
        "Go to Admin > Configure Farm Settings > Set Alerts. Here you can configure threshold levels for feed stock, medication, and other supplies. When inventory falls below these levels, you'll receive notifications.",
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Helmet>
        <title>Help & Support | Poultry Farm Management System</title>
      </Helmet>

      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title="Help & Support"
          notificationCount={2}
          userName="John Doe"
        />

        {/* Help Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="container mx-auto space-y-6 max-w-4xl">
            <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
              <div className="flex-1">
                <h1 className="text-2xl font-semibold">How can we help you?</h1>
                <p className="text-muted-foreground">
                  Find answers to common questions or contact our support team
                </p>
              </div>
              <div className="w-full md:w-1/3">
                <Input
                  placeholder="Search for help..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <Tabs defaultValue="faq" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="faq">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  FAQs
                </TabsTrigger>
                <TabsTrigger value="documentation">
                  <FileText className="mr-2 h-4 w-4" />
                  Documentation
                </TabsTrigger>
                <TabsTrigger value="contact">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Contact Support
                </TabsTrigger>
              </TabsList>

              {/* FAQs Tab */}
              <TabsContent
                value="faq"
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
              >
                <h2 className="text-xl font-semibold mb-4">
                  Frequently Asked Questions
                </h2>

                {filteredFaqs.length === 0 ? (
                  <div className="text-center py-8">
                    <HelpCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-lg font-medium">No results found</p>
                    <p className="text-sm text-muted-foreground">
                      We couldn't find any FAQs matching your search. Try
                      different keywords or browse all FAQs.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => setSearchQuery("")}
                    >
                      Clear Search
                    </Button>
                  </div>
                ) : (
                  <Accordion type="single" collapsible className="w-full">
                    {filteredFaqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
              </TabsContent>

              {/* Documentation Tab */}
              <TabsContent
                value="documentation"
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
              >
                <h2 className="text-xl font-semibold mb-4">Documentation</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Getting Started Guide</CardTitle>
                      <CardDescription>
                        Learn the basics of using the Poultry Farm Management
                        System
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        This guide covers system navigation, setting up your
                        farm profile, and basic operations.
                      </p>
                      <Button variant="outline">View Guide</Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Inventory Management</CardTitle>
                      <CardDescription>
                        Detailed guide on managing your farm inventory
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Learn how to track birds, feed, medications, and
                        equipment in your inventory.
                      </p>
                      <Button variant="outline">View Guide</Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Financial Management</CardTitle>
                      <CardDescription>
                        Guide to managing farm finances and reports
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Learn how to record income, expenses, and generate
                        financial reports.
                      </p>
                      <Button variant="outline">View Guide</Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Customer Management</CardTitle>
                      <CardDescription>
                        Guide to managing customers and sales
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Learn how to manage customer information, track sales,
                        and maintain relationships.
                      </p>
                      <Button variant="outline">View Guide</Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Contact Support Tab */}
              <TabsContent
                value="contact"
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
              >
                <h2 className="text-xl font-semibold mb-4">Contact Support</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center text-center">
                        <MessageSquare className="h-8 w-8 text-primary mb-2" />
                        <h3 className="font-medium mb-1">Chat Support</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Chat with our support team in real-time
                        </p>
                        <Button>Start Chat</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center text-center">
                        <Phone className="h-8 w-8 text-primary mb-2" />
                        <h3 className="font-medium mb-1">Phone Support</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Call us directly for immediate assistance
                        </p>
                        <Button variant="outline">+1 (555) 123-4567</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center text-center">
                        <FileText className="h-8 w-8 text-primary mb-2" />
                        <h3 className="font-medium mb-1">Submit Ticket</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Create a support ticket for complex issues
                        </p>
                        <Button variant="secondary">New Ticket</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Send us a message</CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you as soon
                      as possible
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">
                            Name
                          </label>
                          <Input id="name" placeholder="Your name" />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="email"
                            className="text-sm font-medium"
                          >
                            Email
                          </label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Your email"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="subject"
                          className="text-sm font-medium"
                        >
                          Subject
                        </label>
                        <Input
                          id="subject"
                          placeholder="How can we help you?"
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="message"
                          className="text-sm font-medium"
                        >
                          Message
                        </label>
                        <Textarea
                          id="message"
                          placeholder="Describe your issue in detail..."
                          rows={5}
                        />
                      </div>

                      <Button type="submit" className="w-full md:w-auto">
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 p-4 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Poultry Farm Management System. All
          rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Help;
