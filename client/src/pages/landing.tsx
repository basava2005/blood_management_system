import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Search, MapPin, MessageCircle, Shield, Award } from "lucide-react";
import Header from "@/components/header";
import { motion } from "framer-motion";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_left,rgba(255,50,50,0.4),transparent)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-extrabold text-foreground drop-shadow-sm"
          >
            Save Lives, Connect Hearts
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Join the largest blood donation network. Connect donors with those in need, earn credits, and make a real impact.
          </motion.p>

          {/* Registration Cards */}
          <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto mt-16">
            
            {/* Donor Card */}
            <motion.div whileHover={{ scale: 1.03 }} className="transition-transform">
              <Card className="backdrop-blur-xl bg-card/60 border border-border/60 shadow-lg hover:shadow-xl">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="bg-secondary/15 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                      <Heart className="text-secondary" size={36} />
                    </div>
                    <h3 className="text-2xl font-semibold text-foreground">Blood Donor</h3>
                    <p className="text-muted-foreground">Register, donate, and earn credits for future use.</p>
                  </div>

                  <Button
                    asChild
                    className="w-full bg-secondary shadow-md shadow-secondary/30 hover:shadow-lg hover:shadow-secondary/40"
                  >
                    <a href="/api/login">Register as Donor</a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Blood Finder */}
            <motion.div whileHover={{ scale: 1.03 }} className="transition-transform">
              <Card className="backdrop-blur-xl bg-card/60 border border-border/60 shadow-lg hover:shadow-xl">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="bg-accent/15 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                      <Search className="text-accent" size={36} />
                    </div>
                    <h3 className="text-2xl font-semibold text-foreground">Blood Finder</h3>
                    <p className="text-muted-foreground">Locate donors near you & contact them instantly.</p>
                  </div>

                  <Button
                    asChild
                    className="w-full bg-accent shadow-md shadow-accent/30 hover:shadow-lg hover:shadow-accent/40"
                  >
                    <a href="/api/login">Find Blood Donors</a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Credit System */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Credit System</h2>
          <p className="text-lg text-muted-foreground mb-12">Earn credits with every donation & redeem them when needed.</p>

          <div className="grid md:grid-cols-3 gap-10 max-w-4xl mx-auto">
            {[ 
              { icon: Heart, title: "Earn Credits", desc: "Get 5 credits for every donation", color: "secondary" },
              { icon: Award, title: "Use Credits", desc: "Redeem credits when you need blood", color: "primary" },
              { icon: Shield, title: "6-Month Rule", desc: "Track donation intervals safely", color: "accent" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
              >
                <Card className="text-center shadow-md hover:shadow-xl transition-shadow bg-card/70 backdrop-blur-xl">
                  <CardContent className="p-6">
                    <div className={`bg-${item.color}/15 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <item.icon className={`text-${item.color}`} size={32} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold">Why Choose PulseConnect?</h2>
          <p className="text-muted-foreground text-lg mt-4 mb-12">
            Advanced features for fast, safe, and rewarding blood donation.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: MapPin, title: "Location-Based", desc: "Find donors within 5km using GPS", color: "primary" },
              { icon: MessageCircle, title: "Direct Contact", desc: "WhatsApp donors instantly", color: "secondary" },
              { icon: Shield, title: "Safe Tracking", desc: "Donation safety monitoring", color: "accent" },
              { icon: Award, title: "Reward System", desc: "Earn rewards for helping others", color: "purple-600" },
            ].map((f, i) => (
              <motion.div key={i} whileHover={{ scale: 1.05 }} className="cursor-pointer">
                <div className={`bg-${f.color}/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <f.icon className={`text-${f.color}`} size={34} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-14">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12">
          {/* Branding */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-red-500 w-10 h-10 rounded-full flex items-center justify-center shadow-md">
                <Heart className="text-white" size={20} />
              </div>
              <div>
                <h1 className="text-xl font-bold">PulseConnect</h1>
                <p className="text-xs text-muted-foreground">Blood Bank Network</p>
              </div>
            </div>
            <p className="text-muted-foreground">
              Connecting donors & recipients with a secure, fast, and rewarding blood donation experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a className="hover:text-primary" href="#">About Us</a></li>
              <li><a className="hover:text-primary" href="#">How It Works</a></li>
              <li><a className="hover:text-primary" href="#">Safety Guidelines</a></li>
              <li><a className="hover:text-primary" href="#">Support</a></li>
            </ul>
          </div>

          {/* Emergency */}
          <div>
            <h3 className="font-semibold mb-4">Emergency</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a className="hover:text-accent" href="#">Blood Banks</a></li>
              <li><a className="hover:text-accent" href="#">Hospitals</a></li>
              <li><a className="hover:text-accent" href="#">24/7 Helpline</a></li>
              <li><a className="hover:text-accent" href="#">Contact Emergency Services</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 mt-10 border-t text-center text-muted-foreground">
          © 2024 PulseConnect — Saving lives, one connection at a time.
        </div>
      </footer>
    </div>
  );
}
