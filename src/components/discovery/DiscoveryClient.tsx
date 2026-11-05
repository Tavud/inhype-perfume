'use client';

import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ExternalLink,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import {
  DiscoveryAnswers,
  Locale,
  PerfumeProduct,
  ScentCharacter,
  ScentFamily,
  ScentIntensity,
  ScentOccasion,
} from '@/types/perfume';
import { getDictionary } from '@/i18n/dictionaries';
import {
  getLocalizedText,
  matchFragrancesToAnswers,
  SCENT_FAMILY_LIST,
} from '@/data/catalog';
import { ProductCard } from '@/components/catalog/ProductCard';
import { siteConfig } from '@/lib/config';

interface DiscoveryClientProps {
  locale: Locale;
  catalogProducts: PerfumeProduct[];
}

const CHARACTER_LIST: ScentCharacter[] = [
  'intimate',
  'enveloping',
  'architectural',
  'luminous',
  'mysterious',
];

const INTENSITY_LIST: ScentIntensity[] = [
  'delicate',
  'moderate',
  'expressive',
  'intense',
];

const OCCASION_LIST: ScentOccasion[] = [
  'daily-signature',
  'evening-soiree',
  'warm-season',
  'cold-season',
];

const TOTAL_STEPS = 5;

export function DiscoveryClient({
  locale,
  catalogProducts,
}: DiscoveryClientProps) {
  const dict = getDictionary(locale);

  const [currentStep, setCurrentStep] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState<DiscoveryAnswers>({
    character: undefined,
    families: [],
    intensity: undefined,
    occasion: undefined,
    budgetRange: 'any',
  });

  const toggleFamily = (family: ScentFamily) => {
    setAnswers((prev) => {
      if (prev.families.includes(family)) {
        return {
          ...prev,
          families: prev.families.filter((f) => f !== family),
        };
      }
      if (prev.families.length >= 3) {
        return {
          ...prev,
          families: [...prev.families.slice(1), family],
        };
      }
      return {
        ...prev,
        families: [...prev.families, family],
      };
    });
  };

  const canAdvance = useMemo(() => {
    if (currentStep === 1) return Boolean(answers.character);
    if (currentStep === 2) return answers.families.length > 0;
    if (currentStep === 3) return Boolean(answers.intensity);
    if (currentStep === 4) return Boolean(answers.occasion);
    if (currentStep === 5) return Boolean(answers.budgetRange);
    return false;
  }, [currentStep, answers]);

  const handleNext = () => {
    if (!canAdvance) return;
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((s) => s + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrev = () => {
    if (showResults) {
      setShowResults(false);
      return;
    }
    setCurrentStep((s) => Math.max(1, s - 1));
  };

  const handleRestart = () => {
    setAnswers({
      character: undefined,
      families: [],
      intensity: undefined,
      occasion: undefined,
      budgetRange: 'any',
    });
    setCurrentStep(1);
    setShowResults(false);
  };

  const matchedResults = useMemo(() => {
    if (!showResults) return [];
    return matchFragrancesToAnswers(answers, catalogProducts);
  }, [showResults, answers, catalogProducts]);

  const progressPercentage = showResults
    ? 100
    : Math.round((currentStep / TOTAL_STEPS) * 100);

  return (
    <div className="bg-obsidian min-h-[82vh] py-12 lg:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-champagne/30 text-champagne text-[11px] uppercase tracking-editorial">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{dict.discovery.eyebrow}</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-ivory font-normal">
            {dict.discovery.title}
          </h1>
          <p className="text-sm sm:text-base text-ivory/70">
            {dict.discovery.subtitle}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs uppercase tracking-editorial text-champagne">
            <span>
              {showResults
                ? dict.discovery.results.eyebrow
                : `${dict.discovery.stepOf} ${currentStep} / ${TOTAL_STEPS}`}
            </span>
            <span>{progressPercentage}%</span>
          </div>
          <div className="w-full h-1 bg-ivory/10 overflow-hidden">
            <div
              className="h-full bg-champagne transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {!showResults ? (
          /* Quiz Step Container */
          <div className="p-6 sm:p-10 border border-champagne/25 bg-[#1A1817] space-y-8">
            {/* Step 1: Character */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="font-serif text-2xl sm:text-3xl text-ivory">
                    {dict.discovery.questions.characterTitle}
                  </h2>
                  <p className="text-sm text-ivory/65">
                    {dict.discovery.questions.characterSubtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {CHARACTER_LIST.map((char) => {
                    const selected = answers.character === char;
                    return (
                      <button
                        key={char}
                        type="button"
                        onClick={() =>
                          setAnswers((prev) => ({ ...prev, character: char }))
                        }
                        className={`p-4 sm:p-5 border text-left transition-colors flex items-center justify-between gap-4 ${
                          selected
                            ? 'border-champagne bg-burgundy text-white'
                            : 'border-champagne/25 bg-obsidian/70 text-ivory hover:border-champagne/60'
                        }`}
                      >
                        <span className="text-sm font-medium">
                          {dict.characters[char]}
                        </span>
                        {selected && (
                          <Check className="w-4 h-4 shrink-0 text-champagne" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Olfactory Families (Multi-select up to 3) */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="font-serif text-2xl sm:text-3xl text-ivory">
                    {dict.discovery.questions.familiesTitle}
                  </h2>
                  <p className="text-sm text-ivory/65">
                    {dict.discovery.questions.familiesSubtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                  {SCENT_FAMILY_LIST.map((fam) => {
                    const selected = answers.families.includes(fam);
                    return (
                      <button
                        key={fam}
                        type="button"
                        onClick={() => toggleFamily(fam)}
                        className={`p-4 border text-left transition-colors flex items-center justify-between gap-3 ${
                          selected
                            ? 'border-champagne bg-burgundy text-white'
                            : 'border-champagne/25 bg-obsidian/70 text-ivory hover:border-champagne/60'
                        }`}
                      >
                        <span className="text-sm font-medium">
                          {dict.scentFamilies[fam]}
                        </span>
                        {selected && (
                          <Check className="w-4 h-4 shrink-0 text-champagne" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 3: Intensity */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="font-serif text-2xl sm:text-3xl text-ivory">
                    {dict.discovery.questions.intensityTitle}
                  </h2>
                  <p className="text-sm text-ivory/65">
                    {dict.discovery.questions.intensitySubtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {INTENSITY_LIST.map((int) => {
                    const selected = answers.intensity === int;
                    return (
                      <button
                        key={int}
                        type="button"
                        onClick={() =>
                          setAnswers((prev) => ({ ...prev, intensity: int }))
                        }
                        className={`p-4 sm:p-5 border text-left transition-colors flex items-center justify-between gap-4 ${
                          selected
                            ? 'border-champagne bg-burgundy text-white'
                            : 'border-champagne/25 bg-obsidian/70 text-ivory hover:border-champagne/60'
                        }`}
                      >
                        <span className="text-sm font-medium">
                          {dict.intensities[int]}
                        </span>
                        {selected && (
                          <Check className="w-4 h-4 shrink-0 text-champagne" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 4: Occasion / Season */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="font-serif text-2xl sm:text-3xl text-ivory">
                    {dict.discovery.questions.occasionTitle}
                  </h2>
                  <p className="text-sm text-ivory/65">
                    {dict.discovery.questions.occasionSubtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {OCCASION_LIST.map((occ) => {
                    const selected = answers.occasion === occ;
                    return (
                      <button
                        key={occ}
                        type="button"
                        onClick={() =>
                          setAnswers((prev) => ({ ...prev, occasion: occ }))
                        }
                        className={`p-4 sm:p-5 border text-left transition-colors flex items-center justify-between gap-4 ${
                          selected
                            ? 'border-champagne bg-burgundy text-white'
                            : 'border-champagne/25 bg-obsidian/70 text-ivory hover:border-champagne/60'
                        }`}
                      >
                        <span className="text-sm font-medium">
                          {dict.occasions[occ]}
                        </span>
                        {selected && (
                          <Check className="w-4 h-4 shrink-0 text-champagne" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 5: Budget */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="font-serif text-2xl sm:text-3xl text-ivory">
                    {dict.discovery.questions.budgetTitle}
                  </h2>
                  <p className="text-sm text-ivory/65">
                    {dict.discovery.questions.budgetSubtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {(
                    [
                      {
                        key: 'under-80k',
                        label: dict.discovery.budgetOptions.under80k,
                      },
                      {
                        key: '80k-140k',
                        label: dict.discovery.budgetOptions.between80kAnd140k,
                      },
                      {
                        key: 'above-140k',
                        label: dict.discovery.budgetOptions.above140k,
                      },
                      {
                        key: 'any',
                        label: dict.discovery.budgetOptions.any,
                      },
                    ] as const
                  ).map((opt) => {
                    const selected = answers.budgetRange === opt.key;
                    return (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() =>
                          setAnswers((prev) => ({
                            ...prev,
                            budgetRange: opt.key,
                          }))
                        }
                        className={`p-4 sm:p-5 border text-left transition-colors flex items-center justify-between gap-4 ${
                          selected
                            ? 'border-champagne bg-burgundy text-white'
                            : 'border-champagne/25 bg-obsidian/70 text-ivory hover:border-champagne/60'
                        }`}
                      >
                        <span className="text-sm font-medium">{opt.label}</span>
                        {selected && (
                          <Check className="w-4 h-4 shrink-0 text-champagne" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Navigation Controls */}
            <div className="pt-6 border-t border-champagne/20 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentStep === 1}
                className="px-5 py-3 border border-champagne/30 disabled:opacity-30 text-xs uppercase tracking-editorial text-ivory hover:border-champagne transition-colors inline-flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{dict.discovery.prevStep}</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={!canAdvance}
                className="px-8 py-3.5 bg-burgundy hover:bg-burgundy-light disabled:opacity-40 text-white text-xs uppercase tracking-editorial transition-colors inline-flex items-center gap-2"
              >
                <span>
                  {currentStep === TOTAL_STEPS
                    ? dict.discovery.seeResults
                    : dict.discovery.nextStep}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Results View */
          <div className="space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-champagne/20 pb-6">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-editorial text-champagne">
                  {dict.discovery.results.eyebrow}
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl text-ivory">
                  {dict.discovery.results.title}
                </h2>
                <p className="text-sm text-ivory/70">
                  {dict.discovery.results.subtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={handleRestart}
                className="px-5 py-2.5 border border-champagne/40 hover:border-champagne text-xs uppercase tracking-editorial text-champagne hover:text-ivory transition-colors inline-flex items-center gap-2 self-start sm:self-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{dict.discovery.restartQuiz}</span>
              </button>
            </div>

            {matchedResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {matchedResults.slice(0, 6).map((match) => (
                  <div key={match.product.id} className="flex flex-col">
                    {/* Match Score Header */}
                    <div className="p-4 border border-b-0 border-champagne/30 bg-[#1F1C1A] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] uppercase tracking-editorial text-champagne">
                          {dict.discovery.results.matchScore}
                        </span>
                        <span className="font-serif text-xl text-ivory">
                          {match.matchPercentage}%
                        </span>
                      </div>
                      <ul className="space-y-1 text-xs text-ivory/75">
                        {match.matchedReasons.map((reason, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-champagne">·</span>
                            <span>{getLocalizedText(reason, locale)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex-1">
                      <ProductCard product={match.product} locale={locale} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-10 sm:p-14 border border-champagne/25 bg-[#1A1817] text-center space-y-5">
                <h3 className="font-serif text-2xl sm:text-3xl text-ivory">
                  {dict.discovery.results.noExactMatchTitle}
                </h3>
                <p className="text-sm text-ivory/75 max-w-lg mx-auto leading-relaxed">
                  {dict.discovery.results.noExactMatchText}
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={handleRestart}
                    className="px-6 py-3 bg-burgundy text-white text-xs uppercase tracking-editorial inline-flex items-center gap-2"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{dict.discovery.restartQuiz}</span>
                  </button>
                  <a
                    href={siteConfig.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 border border-champagne/40 text-ivory text-xs uppercase tracking-editorial inline-flex items-center gap-2"
                  >
                    <span>{dict.discovery.results.consultSpecialist}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
