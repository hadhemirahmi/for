"use client";

import React from "react";
import {
  Navbar,
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

export default function App() {
  const StarIcon = () => <span className="text-yellow-500">★</span>;
  const CheckIcon = () => <span className="text-green-500 text-xl">✓</span>;

  const bgColors = {
    blue: "bg-blue-100",
    green: "bg-green-100",
    purple: "bg-purple-100",
  };

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <Navbar className="sticky top-0 z-50 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            className="mr-4 cursor-pointer py-1.5 font-bold text-2xl"
          >
            WebDev Courses
          </Typography>

          <div className="flex items-center gap-4">
            <ul className="hidden lg:flex gap-6">
              {["Page", "Account", "Docs"].map((item) => (
                <Typography
                  key={item}
                  as="li"
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  <a href="#">{item}</a>
                </Typography>
              ))}
            </ul>

            <div className="flex gap-x-2">
              <Button
                variant="text"
                size="sm"
                className="hidden lg:inline-block"
              >
                LOG IN
              </Button>
              <Button size="sm" className="hidden lg:inline-block rounded-full">
                BLOCKS
              </Button>
            </div>
          </div>
        </div>
      </Navbar>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-50 pt-20 px-4">
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <Typography variant="h1" className="mb-6 font-bold">
            Unlock the Power of the Web with Our Expert Courses
          </Typography>

          <Typography variant="lead" className="mb-12 text-gray-600">
            Are you ready to embark on an exciting journey into the world of web
            development?
          </Typography>

          <div className="flex justify-center gap-4 mb-16">
            <Button size="lg" className="rounded-full">
              VIEW ALL COURSES
            </Button>
            <Button size="lg" variant="outlined" className="rounded-full">
              SEE PRICING
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Typography variant="h2" className="mb-16">
            Why Choose Our Courses?
          </Typography>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Expert Instructors",
                desc: "Learn from professionals working at top tech companies.",
                color: "blue",
              },
              {
                title: "Lifetime Access",
                desc: "Access course materials forever.",
                color: "green",
              },
              {
                title: "Certificate Included",
                desc: "Earn a shareable certificate.",
                color: "purple",
              },
            ].map((feature, index) => (
              <Card key={index} className="shadow-lg">
                <CardBody className="text-center">
                  <div
                    className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center ${
                      bgColors[feature.color]
                    }`}
                  >
                    <CheckIcon />
                  </div>
                  <Typography variant="h5" className="mb-4">
                    {feature.title}
                  </Typography>
                  <Typography className="text-gray-600">
                    {feature.desc}
                  </Typography>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Typography variant="h2" className="mb-16">
            Popular Courses
          </Typography>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((course) => (
              <Card key={course} className="shadow-xl">
                <CardBody>
                  <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg mb-6"></div>
                  <div className="flex justify-between mb-4">
                    <Typography variant="h5">
                      Advanced React & Next.js
                    </Typography>
                    <div className="flex gap-1">
                      <StarIcon />
                      <Typography variant="small">4.9</Typography>
                    </div>
                  </div>
                  <Typography className="text-gray-600">
                    Master modern web development with React and Next.js.
                  </Typography>
                </CardBody>
                <CardFooter>
                  <Button fullWidth className="rounded-full">
                    Enroll Now →
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
