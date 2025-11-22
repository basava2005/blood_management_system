import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Search, MapPin, MessageCircle, Shield, Award, Facebook, Instagram, Linkedin } from "lucide-react";
import Header from "@/components/header";
import { motion } from "framer-motion";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-6 lg:px-8 text-center"
        >
          <h2 className="text-5xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Save Lives, Connect Hearts
          </h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Join the largest blood donation network. Earn credits for every donation and connect instantly with those in need.
          </p>

          <div className="flex justify-center gap-6 flex-wrap">
            <Button size="lg" className="px-8 shadow hover:scale-105 transition">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="px-8 hover:scale-105 transition">
              How It Works
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Registration Options */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-10">
          
          {[
            {
              title: "Blood Donor",
              desc: "Register as a donor, help save lives, and earn credits for future needs",
              icon: <Heart size={32} className="text-secondary" />,
              href: "/api/login",
              bg: "bg-secondary/10",
              btn: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
            },
            {
              title: "Blood Finder",
              desc: "Find donors near your location and connect instantly via WhatsApp",
              icon: <Search size={32} className="text-accent" />,
              href: "/api/login",
              bg: "bg-accent/10",
              btn: "bg-accent text-accent-foreground hover:bg-accent/90",
            }
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              viewport={{ once: true }}
            >
              <Card className="shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
                <CardContent className="p-8 text-center">
                  <div className={`${card.bg} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-float`}>
                    {card.icon}
                  </div>
                  <h3 className="text-3xl font-semibold mb-3">{card.title}</h3>
                  <p className="text-muted-foreground mb-6">{card.desc}</p>

                  <Button asChild className={`w-full py-6 text-lg font-medium ${card.btn}`}>
                    <a href={card.href}>Continue</a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Credit System */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Credit System</h2>
          <p className="text-lg text-muted-foreground mb-12">Earn credits for every donation and redeem them when you need blood</p>

          <div className="grid md:grid-cols-3 gap-10 max-w-4xl mx-auto">
            {[
              { icon: <Heart size={32} className="text-secondary" />, title: "Earn Credits", desc: "Get 5 credits for each successful blood donation", bg: "bg-secondary/10" },
              { icon: <Award size={32} className="text-primary" />, title: "Use Credits", desc: "Redeem credits for free blood when needed", bg: "bg-primary/10" },
              { icon: <Shield size={32} className="text-accent" />, title: "6-Month Rule", desc: "Safe tracking for donation intervals", bg: "bg-accent/10" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                viewport={{ once: true }}
              >
                <Card className="text-center shadow hover:shadow-lg transition">
                  <CardContent className="p-8">
                    <div className={`${item.bg} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-float-slow`}>
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
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
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Why Choose PulseConnect?</h2>
          <p className="text-lg text-muted-foreground mb-12">Advanced features designed for fast and safe blood donation</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { icon: <MapPin size={32} className="text-primary" />, title: "Location-Based", desc: "Find donors within your nearest radius" },
              { icon: <MessageCircle size={32} className="text-secondary" />, title: "Direct Contact", desc: "Instant WhatsApp communication" },
              { icon: <Shield size={32} className="text-accent" />, title: "Safe Tracking", desc: "Donation intervals monitored" },
              { icon: <Award size={32} className="text-purple-600" />, title: "Reward System", desc: "Earn credits, unlock benefits" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-primary/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-14">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-4 gap-10">
          
          <div className="md:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Heart className="text-white" size={22} />
              </div>
              <div>
                <h1 className="text-xl font-bold">PulseConnect</h1>
                <p className="text-sm text-muted-foreground">Blood Bank Network</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-6">
              Connecting blood donors with those in need — making donation simple, safe, and rewarding.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-4">
              <Facebook className="text-muted-foreground hover:text-primary cursor-pointer" />
              <Instagram className="text-muted-foreground hover:text-primary cursor-pointer" />
              <Linkedin className="text-muted-foreground hover:text-primary cursor-pointer" />
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li><a href="#">About Us</a></li>
              <li><a href="#">How It Works</a></li>
              <li><a href="#">Safety Guidelines</a></li>
              <li><a href="#">Support</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Emergency</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li><a href="#">Blood Banks</a></li>
              <li><a href="#">Hospitals</a></li>
              <li><a href="#">24/7 Helpline</a></li>
              <li><a href="#">Emergency Services</a></li>
            </ul>
          </div>
        </div>

        <div className="text-center text-muted-foreground mt-10 border-t pt-6">
          © 2024 PulseConnect — Saving lives, one connection at a time.
        </div>
      </footer>
    </div>
  );
}
