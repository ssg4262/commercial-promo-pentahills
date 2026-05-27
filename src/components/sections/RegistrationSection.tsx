"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { cn, formatKoreanPhone } from "@/lib/utils";
import SectionWrapper from "./SectionWrapper";
import RevealOnScroll from "@/components/common/RevealOnScroll";

const GAS_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbwH699VdDNh9WwvPTNtqHtstj-MB_BDuuO3EYl3MpZEkmwPDmEMZW-QtQMdLbUiooTE/exec?project=apartment-promo";

const schema = z.object({
  name: z.string().min(2, "이름을 2자 이상 입력해주세요"),
  phone: z.string().regex(
    /^(01[016789]-?\d{3,4}-?\d{4}|02-?\d{3,4}-?\d{4}|0[3-9]\d-?\d{3,4}-?\d{4})$/,
    "올바른 전화번호를 입력해주세요"
  ),
  email: z.string().email("올바른 이메일을 입력해주세요").optional().or(z.literal("")),
  privacyConsent: z.literal(true, { message: "개인정보 수집에 동의해주세요" }),
  honeypot: z.string().max(0).optional(),
});

type FormData = z.infer<typeof schema>;

export default function RegistrationSection() {
  const [policyOpen, setPolicyOpen] = useState(false);
  const [done, setDone] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", phone: "", email: "", privacyConsent: false as unknown as true, honeypot: "" },
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const body = new globalThis.FormData();
      body.append("name", data.name);
      body.append("phone", data.phone);
      body.append("email", data.email || "");

      await fetch(GAS_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        body,
      });
    },
    onSuccess: () => { setDone(true); reset(); },
  });

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("phone", formatKoreanPhone(e.target.value), { shouldValidate: true });
  };

  if (done) {
    return (
      <section id="registration" className="relative py-16 md:py-32 bg-[#FBF6F3]">
        <RevealOnScroll>
          <div className="mx-auto max-w-md py-16 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-cta-phone/30 text-cta-phone">
              <Check size={24} strokeWidth={1} />
            </div>
            <h3 className="heading-display text-2xl text-neutral-900">등록 완료</h3>
            <p className="mt-4 text-sm text-neutral-500">
              관심고객 등록이 접수되었습니다. 빠른 시일 내 연락드리겠습니다.
            </p>
            <button
              onClick={() => setDone(false)}
              className="mt-8 border border-cta-phone px-6 py-3 rounded-lg text-[11px] font-medium uppercase tracking-[0.1em] text-cta-phone transition hover:bg-cta-phone hover:text-white"
            >
              추가 등록
            </button>
          </div>
        </RevealOnScroll>
      </section>
    );
  }

  return (
    <section
      id="registration"
      className="relative py-16 md:py-32 bg-[#FBF6F3] overflow-hidden"
    >
      {/* Subtle warm glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-cta-phone/5 blur-[150px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl section-padding">
        {/* Header */}
        <div className="mb-10 md:mb-20 text-center">
          <span className="label-caps mb-4 block text-cta-phone">
            Registration
          </span>
          <h2 className="heading-display text-[35px] md:text-[45px] lg:text-[57px] text-cta-phone">
            관심고객 등록
          </h2>
          <p className="mt-5 text-base text-neutral-500 max-w-lg mx-auto leading-relaxed">
            관심고객으로 등록하시면<br className="sm:hidden" /> 분양 관련 최신 소식을 빠르게 안내드립니다.
          </p>
          <div className="mt-6 mx-auto h-px w-12 bg-cta-phone/40" />
        </div>

        <RevealOnScroll>
          <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="mx-auto max-w-lg">
            <input type="text" tabIndex={-1} autoComplete="off" className="absolute -left-[9999px] h-0 w-0 opacity-0" {...register("honeypot")} />

            {/* Name */}
            <div className="mb-6">
              <label className="mb-2 block text-[13px] font-bold tracking-[0.05em] text-neutral-700">
                이름 *
              </label>
              <input
                type="text"
                placeholder="홍길동"
                className={cn(
                  "w-full rounded-lg border bg-white px-4 py-3.5 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-300",
                  errors.name ? "border-red-400" : "border-neutral-200 focus:border-cta-phone focus:ring-1 focus:ring-cta-phone/20"
                )}
                {...register("name")}
              />
              {errors.name && <p className="mt-1.5 text-[11px] text-red-500">{errors.name.message}</p>}
            </div>

            {/* Phone */}
            <div className="mb-6">
              <label className="mb-2 block text-[13px] font-bold tracking-[0.05em] text-neutral-700">
                연락처 *
              </label>
              <input
                type="tel"
                placeholder="010-0000-0000"
                className={cn(
                  "w-full rounded-lg border bg-white px-4 py-3.5 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-300",
                  errors.phone ? "border-red-400" : "border-neutral-200 focus:border-cta-phone focus:ring-1 focus:ring-cta-phone/20"
                )}
                value={watch("phone")}
                onChange={handlePhoneChange}
              />
              {errors.phone && <p className="mt-1.5 text-[11px] text-red-500">{errors.phone.message}</p>}
            </div>

            {/* Email */}
            <div className="mb-10">
              <label className="mb-2 block text-[13px] font-bold tracking-[0.05em] text-neutral-700">
                이메일 <span className="normal-case tracking-normal font-normal text-neutral-400">(선택)</span>
              </label>
              <input
                type="email"
                placeholder="example@email.com"
                className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-3.5 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-300 focus:border-cta-phone focus:ring-1 focus:ring-cta-phone/20"
                {...register("email")}
              />
            </div>

            {/* Consent */}
            <div className="mb-10 rounded-lg border border-neutral-200 bg-white p-5">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 accent-cta-phone"
                  {...register("privacyConsent")}
                />
                <span className="text-sm text-neutral-700">
                  <span className="font-medium text-cta-phone">[필수]</span> 개인정보 수집 · 이용 동의
                </span>
              </label>
              {errors.privacyConsent && (
                <p className="mt-2 text-[11px] text-red-500">{errors.privacyConsent.message}</p>
              )}

              <button
                type="button"
                onClick={() => setPolicyOpen(!policyOpen)}
                className="mt-3 flex items-center gap-1 text-[11px] text-neutral-400 transition hover:text-neutral-600"
              >
                약관 보기
                <ChevronDown size={12} className={cn("transition", policyOpen && "rotate-180")} />
              </button>
              {policyOpen && (
                <p className="mt-3 max-h-24 overflow-y-auto text-[11px] leading-relaxed text-neutral-400">
                  수집항목: 이름, 연락처, 이메일(선택) | 수집목적: 분양 관련 정보 안내 및 상담 |
                  보유기간: 수집일로부터 1년 | 동의를 거부할 권리가 있으며, 거부 시 관심고객 등록이 제한됩니다.
                </p>
              )}

            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={mutation.isPending}
              className={cn(
                "group flex w-full items-center justify-center gap-3 rounded-lg py-5 text-[13px] font-semibold uppercase tracking-[0.15em] transition-all",
                mutation.isPending
                  ? "cursor-wait bg-neutral-200 text-neutral-400"
                  : "bg-cta-phone text-white hover:bg-cta-phone-dark shadow-lg shadow-cta-phone/20 hover:shadow-cta-phone/35"
              )}
            >
              {mutation.isPending ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border border-neutral-400 border-t-transparent" />
                  접수 중
                </>
              ) : (
                <>
                  관심고객 등록
                  <ArrowRight size={14} strokeWidth={1.5} className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>

            {mutation.isError && (
              <p className="mt-4 text-center text-[11px] text-red-500">
                오류가 발생했습니다. 다시 시도해주세요.
              </p>
            )}
          </form>
        </RevealOnScroll>
      </div>
    </section>
  );
}
