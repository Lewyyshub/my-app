"use client";
import { useState } from "react";
import Image from "next/image";
import copyIcon from "@/app/icons/copy.png";

export default function Home() {
  const [password, setPassword] = useState<string>("PTx1f5DaFX");
  const [length, setLength] = useState<number>(10);
  const [includeUpper, setIncludeUpper] = useState<boolean>(true);
  const [includeLower, setIncludeLower] = useState<boolean>(false);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
  const [strength, setStrength] = useState<string>("Strong");

  const calculateStrength = (pwd: string): string => {
    let score = 0;
    if (pwd.length >= 12) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 1) return "Too Weak!";
    if (score === 2) return "Weak";
    if (score === 3) return "Medium";
    return "Strong";
  };

  const generatePassword = () => {
    let charset = "";
    if (includeUpper) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLower) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+[]{}|;:,.<>?/";

    if (charset.length === 0) return;

    let newPassword: string = "";
    for (let i = 0; i < length; i++) {
      newPassword += charset[Math.floor(Math.random() * charset.length)];
    }
    setPassword(newPassword);
    setStrength(calculateStrength(newPassword));
  };

  return (
    <div className="w-full max-w-[540px] mx-auto px-4">
      <h1 className="text-[#817D92] font-bold text-center text-base md:text-2xl">
        Password Generator
      </h1>
      <section className="bg-[#24232C] mt-4 w-full p-4 flex justify-between md:px-8 md:py-5">
        <h1 className="text-[32px] font-[700] text-[#E6E5EA] md:text-xl truncate">
          {password}
        </h1>
        <button onClick={() => navigator.clipboard.writeText(password)}>
          <Image src={copyIcon} alt="Copy Icon" width={21} height={24} />
        </button>
      </section>
      <section className="mt-4 p-4 bg-[#24232C] md:px-8 md:py-8">
        <section className="flex justify-between items-center">
          <h2 className="text-[#E6E5EA] font-bold md:text-lg">
            Characters Length
          </h2>
          <h2 className="text-[#A4FFAF] text-2xl font-bold md:text-3xl">
            {length}
          </h2>
        </section>
        <input
          className="w-full accent-[#A4FFAF] mt-2"
          type="range"
          min="4"
          max="20"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
        />

        {[
          {
            id: "uppercase",
            label: "Include Uppercase Letters",
            state: includeUpper,
            setState: setIncludeUpper,
          },
          {
            id: "lowercase",
            label: "Include Lowercase Letters",
            state: includeLower,
            setState: setIncludeLower,
          },
          {
            id: "numbers",
            label: "Include Numbers",
            state: includeNumbers,
            setState: setIncludeNumbers,
          },
          {
            id: "symbols",
            label: "Include Symbols",
            state: includeSymbols,
            setState: setIncludeSymbols,
          },
        ].map(({ id, label, state, setState }) => (
          <section key={id} className="mt-4 flex gap-5 md:mt-5 md:gap-6">
            <input
              type="checkbox"
              id={id}
              checked={state}
              onChange={() => setState(!state)}
              className="w-[20px] h-[20px] accent-[#A4FFAF]"
            />
            <label
              htmlFor={id}
              className="text-[#E6E5EA] text-[18px] font-[700]"
            >
              {label}
            </label>
          </section>
        ))}

        <section className="bg-[#18171F] mt-7 p-4 flex justify-between md:px-8 md:py-6">
          <h2 className="text-[#817D92] text-base font-bold md:text-lg">
            STRENGTH
          </h2>
          <div className="flex gap-2 md:gap-4 items-center">
            <h2 className="text-[#E6E5EA] text-base font-bold md:text-xl">
              {strength}
            </h2>
            <div className="flex gap-1">
              {Array.from(
                {
                  length:
                    strength === "Too Weak!"
                      ? 1
                      : strength === "Weak"
                      ? 2
                      : strength === "Medium"
                      ? 3
                      : 4,
                },
                (_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-6 ${
                      strength === "Too Weak!"
                        ? "bg-red-500"
                        : strength === "Weak"
                        ? "bg-orange-400"
                        : strength === "Medium"
                        ? "bg-yellow-300"
                        : "bg-green-500"
                    }
                `}
                  ></div>
                )
              )}
            </div>
          </div>
        </section>

        <section className="group mt-4">
          <button
            className="w-full flex justify-center items-center gap-2 py-4 bg-[#A4FFAF] border-2 hover:bg-[#24232C] hover:border-[#A4FFAF] hover:text-[#A4FFAF] duration-200 md:py-5 md:gap-4"
            onClick={generatePassword}
          >
            <h2 className="text-[#24232C] font-bold text-lg group-hover:text-[#A4FFAF] md:text-lg">
              GENERATE
            </h2>
          </button>
        </section>
      </section>
    </div>
  );
}
