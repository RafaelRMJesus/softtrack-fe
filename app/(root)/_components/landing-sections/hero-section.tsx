import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/app/(root)/_components/ui/badge";
import { Button } from "@/components/ui/button";
import { HeroCards } from "@/app/(root)/_components/hero-cards";
import { Syne } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Sparkle2SVG,
  SparkleSVG,
  CurlySVG,
  ExplosionSVG,
  ThreeLinesSVG,
  CircleArrowSVG,
  ZapSVG,
  ExclamationSVG,
} from "@/svgs/svgs";

const syne = Syne({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
}); 

export const Hero = () => {
  return (
    <section className="mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24">
      <div className="flex flex-col lg:flex-row justify-center items-center gap-10">
        <div className="text-center lg:text-start space-y-6 max-w-3xl">
          <Badge variant={"neutral"}>Powered by Softtek</Badge>
          <main className={cn("text-5xl md:text-7xl font-bold", syne.className)}>
            <h1 className="inline">
              Transforme <br /> <span className="inline text-verde">Dados</span>{" "}
              em
            </h1>{" "}
            <h2 className="inline font-bold">
              <span className="inline text-roxo font-bold">Decisões</span>{" "}
              através de Análise Preditiva
            </h2>
          </main>
          <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          Antecipe tendências e fique à frente da concorrência, acelerando seu processo decisório com inteligência artificial de ponta.
          </p>
          <div className="space-y-4 md:space-x-4">
            <Button className="w-2/3 sm:w-1/3">Quero saber mais</Button>
            <Link href="/video">
              <Button variant={"outline"}>
                Softtrack Video Pitch
                <ArrowUpRight size={20} />
              </Button>
            </Link>
          </div>
        </div>
        <div className="z-10">
          <HeroCards />
        </div>
      </div>
      {/* SVG Decorations */}
      <div
        className="absolute top-0 left-0 transform rotate-12"
        style={{ top: "16%", left: "7%" }}
      >
        <Sparkle2SVG />
      </div>
      <div
        className="absolute top-0 left-0 transform rotate-12 hidden lg:block"
        style={{ top: "19%", left: "9%", fill: "#5623E2" }}
      >
        <SparkleSVG />
      </div>
      <div
        className="absolute top-0 left-0 transform rotate-12 hidden md:block"
        style={{ top: "105%", left: "90%", fill: "#5623E2" }}
      >
        <CurlySVG />
      </div>
      <div className="absolute top-0 left-0" style={{ top: "16%", left: "75%" }}>
        <ExplosionSVG />
      </div>
      <div
        className="absolute top-0 left-0 transform rotate-180 hidden lg:block"
        style={{ top: "78%", left: "47%" }}
      >
        <ThreeLinesSVG />
      </div>
      <div
        className="absolute top-0 left-0 transform rotate-45 hidden 2xl:block"
        style={{ top: "75%", left: "-2%" }}
      >
        <CircleArrowSVG />
      </div>
      <div
        className="absolute top-0 left-0 transform rotate-12 hidden md:block"
        style={{ top: "34%", left: "92%" }}
      >
        <ZapSVG />
      </div>
      <div
        className="absolute top-0 left-0 transform rotate-12 hidden lg:block"
        style={{ top: "16%", left: "37%" }}
      >
        <ExclamationSVG />
      </div>
      {/* Shadow Effect */}
      <div className="shadow"></div>
    </section>
  );
};
