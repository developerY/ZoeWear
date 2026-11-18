/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SiteComparisonCard {
  title: string;
  tag: string;
  desc: string;
}

export interface KinematicScenario {
  labels: string[];
  wrist: number[];
  waist: number[];
  ankle: number[];
  title: string;
  stat: string;
  body: string;
}

export interface NeuroMlModel {
  model: string;
  shortLabel: string;
  placement: string;
  target: string;
  sensitivity: number | null;
  specificity: number | null;
  accuracy: number;
  citationId: number;
}

export interface LifestyleScenario {
  label: string;
  icon: string;
  problemTitle: string;
  problemPoints: string[];
  solutionTitle: string;
  solutionPoints: string[];
}

export interface ManuscriptSection {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  subsections: {
    heading?: string;
    paragraphs: string[];
    bullets?: { label: string; text: string }[];
  }[];
  table?: {
    caption: string;
    headers: string[];
    rows: string[][];
  };
}

export interface CitationItem {
  id: number;
  title: string;
  url: string;
  domain: 'Vascular & PPG' | 'Step & Metabolic Kinematics' | 'Biomechanics & ML' | 'Neurology & Rehab' | 'Clinical Hygiene & Ergonomics';
}

export const SITE_COMPARISON_DATA: Record<'ankle' | 'wrist', SiteComparisonCard[]> = {
  ankle: [
    {
      title: 'Mechanical Coupling',
      tag: 'Direct Locomotor Link',
      desc: 'Affixed directly to the distal tibia/supramalleolar region, capturing unmistakable heel-strike shockwaves and toe-off accelerations with near-zero false positives.',
    },
    {
      title: 'Vascular Access',
      tag: 'Posterior Tibial Artery',
      desc: 'Targets the deep, 1.96–2.05 mm posterior tibial artery within a stable cylindrical geometry—preserving systolic, dicrotic notch, and diastolic PPG peaks.',
    },
    {
      title: 'Ergonomic & Social Profile',
      tag: 'Zero Wrist Interference',
      desc: 'Complies with NHS Bare Below the Elbows rules, accommodates lifting wraps/boxing gloves, and allows wearing luxury watches without double-wristing.',
    },
  ],
  wrist: [
    {
      title: 'Mechanical Coupling',
      tag: 'Decoupled Arm-Swing Proxy',
      desc: 'Relies on arm swing heuristics that fail when pushing strollers/walkers (>67% undercount) or generate +5,470 false steps/day in older adults from hand tasks.',
    },
    {
      title: 'Vascular Access',
      tag: 'Superficial Radial/Ulnar Beds',
      desc: 'Highly reactive to cold-induced sympathetic vasoconstriction and radiocarpal tendon motion, increasing active heart rate error rates by ~30%.',
    },
    {
      title: 'Ergonomic & Social Profile',
      tag: 'High Physical & Style Conflict',
      desc: 'Banned in sterile clinical care, crushed under powerlifting wrist wraps, and visually clashes with formal attire or traditional horology.',
    },
  ],
};

export const KINEMATIC_SCENARIOS: Record<'all' | 'slow' | 'obstructed' | 'hand', KinematicScenario> = {
  all: {
    labels: [
      'Ultra-Slow Walk (0.3–0.5 m/s)',
      'Upper Limb Obstructed (Walker)',
      'Sedentary Hand Tasks (Cards/Dishes)',
    ],
    wrist: [45.0, 67.0, 57.0],
    waist: [15.0, 8.0, 2.0],
    ankle: [3.5, 1.5, 0.0],
    title: 'Comprehensive Locomotor Comparison',
    stat: 'Ankle Error < 5% Across All Conditions',
    body: 'Across slow rehabilitation walking, assisted ambulation, and hand-intensive daily chores, ankle sensors maintain clinical precision. In free-living older adults, wrist devices register a 180% increase in false steps (+5,470 erroneous steps/day) compared to hip or ankle placement.',
  },
  slow: {
    labels: ['Ultra-Slow Walk (0.3–0.5 m/s)'],
    wrist: [45.0],
    waist: [15.0],
    ankle: [3.5],
    title: 'Post-Operative & Pathological Gait (0.3–0.5 m/s)',
    stat: 'Wrist Fails Completely in ~33% of Trials',
    body: 'In post-stroke and early post-operative patients walking below 0.6 m/s, diminished arm swing falls below wrist algorithmic thresholds, frequently recording zero steps despite continuous walking. Ankle accelerometers detect stance and swing phases with <5.0% error.',
  },
  obstructed: {
    labels: ['Upper Limb Obstructed (Walker / Stroller)'],
    wrist: [67.0],
    waist: [8.0],
    ankle: [1.5],
    title: 'Constrained Upper Extremities',
    stat: '>67% Step Undercounting at the Wrist',
    body: 'Pushing a stroller, carrying groceries, or leaning on a walker/cane dampens upper-limb swing while lower-limb ambulation continues unimpeded. Ankle placement decouples step detection from arm posture, keeping error rates strictly below 2.0%.',
  },
  hand: {
    labels: ['Sedentary Hand Tasks (Cards / Dishes)'],
    wrist: [57.0],
    waist: [2.0],
    ankle: [0.0],
    title: 'Non-Ambulatory Hand Artifacts',
    stat: '0.0% False Positives at the Ankle',
    body: 'Folding laundry, brushing teeth, washing dishes, and playing cards generate rhythmic wrist accelerations that exceed 57% MAPE in consumer wristbands. Because the ankle remains stationary during seated hand tasks, false step generation is completely eliminated.',
  },
};

export const PPG_HR_METRICS = [
  {
    state: 'Resting State',
    wristMae: 1.5,
    wristDetail: '< 2.0 bpm (ambient light & strap fit sensitivity)',
    ankleMae: 1.4,
    ankleDetail: '< 1.5 bpm (posterior tibial artery baseline)',
  },
  {
    state: 'Walking & Hand Motion',
    wristMae: 10.0,
    wristDetail: '5.0 – 15.0+ bpm (Midpoint ~10.0 bpm, +30% error)',
    ankleMae: 2.82,
    ankleDetail: '1.86 – 3.78 bpm (Midpoint 2.82 bpm w/ SVD + EKF)',
  },
];

export const PPG_DETAIL_COPY: Record<'anatomy' | 'morphology', { title: string; body: string }> = {
  anatomy: {
    title: 'Posterior Tibial Artery (1.96–2.05 mm caliber)',
    body: 'Resides in a protected fascial compartment resistant to strap compression and cold-induced sympathetic vasoconstriction. Unlike the dorsalis pedis (absent in Type B anatomical variants), it offers a reliable, high-amplitude optical target.',
  },
  morphology: {
    title: 'Preserved Pulse Wave Morphology',
    body: 'The supramalleolar ankle provides a stable cylindrical contour that maintains optimal sensor contact pressure without radiocarpal tendon shift—preserving the systolic peak, dicrotic notch, and diastolic peak needed to assess arterial stiffness.',
  },
};

export const PAD_SENSITIVITY_DATA = [
  { label: 'Traditional Cuff ABI', value: 19.1, tone: 'neutral' as const, note: 'Limited by calcified, non-compressible vessels' },
  { label: 'Ankle Optical PPGamp', value: 55.3, tone: 'ocean' as const, note: 'Direct systolic microvascular pulse amplitude' },
  { label: 'Ankle Optical PPGratio', value: 68.1, tone: 'seaglass' as const, note: 'Pulsatile AC / non-pulsatile DC perfusion ratio' },
];

export const STRIKE_DETAILS: Record<'ffs' | 'rfs', { badge: string; text: string; activeBandPct: number; impactBandPct: number }> = {
  ffs: {
    badge: 'Achilles Eccentric Attenuation',
    text: 'Forefoot Strike (FFS): Increases ankle joint compliance, allowing the Achilles tendon and plantarflexor musculature to perform eccentric negative work. Absorbs a significantly higher fraction of impact shockwave energy distally at the ankle, shielding the knee and hip.',
    activeBandPct: 78,
    impactBandPct: 28,
  },
  rfs: {
    badge: 'High-Frequency Skeletal Shockwave',
    text: 'Rearfoot Strike (RFS): Transmits a sharp high-frequency impact transient (9–20 Hz) directly up the tibia, knee, and hip immediately upon heel contact. Continuous ankle IMU monitoring alerts runners and clinicians to elevated tibial loading rates associated with medial tibial stress syndrome (MTSS).',
    activeBandPct: 44,
    impactBandPct: 86,
  },
};

export const NEURO_ML_MODELS: NeuroMlModel[] = [
  {
    model: 'Random Forest',
    shortLabel: 'Random Forest (Left Ankle FoG)',
    placement: 'Left Shank / Ankle',
    target: 'Freezing of Gait (FoG)',
    sensitivity: 78.39,
    specificity: 91.66,
    accuracy: 88.09,
    citationId: 64,
  },
  {
    model: 'Convolutional Neural Net',
    shortLabel: 'CNN (Bilateral Ankles FoG)',
    placement: 'Bilateral Ankles',
    target: 'Freezing of Gait (FoG)',
    sensitivity: 96.0,
    specificity: 83.0,
    accuracy: 91.0,
    citationId: 66,
  },
  {
    model: 'SVM / KNN',
    shortLabel: 'SVM / KNN (Ankle IMU)',
    placement: 'Ankle IMU',
    target: 'General Gait Impairment',
    sensitivity: null,
    specificity: null,
    accuracy: 94.9,
    citationId: 68,
  },
  {
    model: 'CNN (Multichannel)',
    shortLabel: 'Multichannel CNN (Exoskeleton)',
    placement: 'Bilateral Ankles',
    target: 'Exoskeleton Control',
    sensitivity: 99.2,
    specificity: 98.5,
    accuracy: 99.2,
    citationId: 69,
  },
];

export const LIFESTYLE_DATA: Record<'clinical' | 'athletic' | 'style', LifestyleScenario> = {
  clinical: {
    label: 'Healthcare & Infection Control',
    icon: 'medical_services',
    problemTitle: 'The Clinical Paradox: "Bare Below the Elbows"',
    problemPoints: [
      'NHS and global infection-control protocols strictly prohibit wristwatches and fitness bands to prevent transmission of MRSA, VRE, and C. difficile.',
      'Porous wristband crevices harbor dense bacterial colonies and obstruct complete alcohol-based hand rub sanitization.',
      'Nurses and physicians walk 10,000–15,000 steps per shift under high physiological stress yet cannot wear wrist monitors.',
    ],
    solutionTitle: 'The Ankle Advantage: Sterile-Field Compliance',
    solutionPoints: [
      'Worn covertly beneath scrub trousers and enclosed within clinical footwear, completely outside the sterile hand-to-patient contact zone.',
      'Enables 100% adherence to infection-control dress codes while continuously tracking frontline staff fatigue, sleep recovery, and cardiovascular strain.',
    ],
  },
  athletic: {
    label: 'Strength & Combat Sports',
    icon: 'fitness_center',
    problemTitle: 'Mechanical Interference in Lifting & Combat Sports',
    problemPoints: [
      'Olympic weightlifting (snatch, clean) and front squats force extreme wrist extension, requiring tight canvas/elastane wrist wraps.',
      'Wrist wraps press rigid tracker casings painfully into carpal bones, occlude venous blood flow (ruining PPG), and kettlebells/barbells shatter glass sensors.',
      'Boxers and MMA athletes must tape wrists and wear padded gloves, making rigid wrist devices hazardous to training partners.',
    ],
    solutionTitle: 'The Ankle Advantage: Unencumbered Joint Mechanics',
    solutionPoints: [
      'Tucked safely beneath a sock above the medial malleolus, shielded from barbell impacts, kettlebell racks, and grappling friction.',
      'Preserves natural radiocarpal mobility and wrist-wrap support while capturing uninterrupted heart rate and training load.',
    ],
  },
  style: {
    label: 'Luxury Horology & Formal Style',
    icon: 'watch',
    problemTitle: 'The Zero-Sum Sartorial Dilemma',
    problemPoints: [
      'Smartwatches force enthusiasts to abandon mechanical heirlooms and luxury horology—or resort to aesthetically cluttered "double-wristing."',
      'Glowing screens and haptic notifications disrupt etiquette in corporate boardrooms, formal galas, and uniformed professions.',
    ],
    solutionTitle: 'The Ankle Advantage: Invisible 24/7 Biometrics',
    solutionPoints: [
      'Completely liberates the wrist for traditional mechanical watches, fine jewelry, or a clean, minimalist aesthetic.',
      'Operates in total visual and digital silence beneath a trouser leg or sock, compiling continuous HRV and sleep datasets without social intrusion.',
    ],
  },
};

export const LIFESTYLE_COMPARISON_TABLE = [
  {
    dimension: 'Hospital Hygiene ("Bare Below Elbows")',
    wrist: 'Prohibited; harbors MRSA/VRE & blocks hand rub',
    ankle: '100% compliant beneath scrubs & footwear',
  },
  {
    dimension: 'Heavy Lifting & Combat Gear',
    wrist: 'Crushed under wrist wraps/gloves; glass shatters',
    ankle: 'Unobstructed wrist extension; shielded under sock',
  },
  {
    dimension: 'Mechanical Watches & Jewelry',
    wrist: 'Forces "double-wristing" or abandoning heirlooms',
    ankle: 'Complete wrist freedom; zero visual clutter',
  },
  {
    dimension: 'Formal & Corporate Etiquette',
    wrist: 'Glowing screens distract in boardrooms & galas',
    ankle: 'Operates in total visual and digital silence',
  },
];

export const MANUSCRIPT_SECTIONS: ManuscriptSection[] = [
  {
    id: 'abstract',
    number: '00',
    title: 'Abstract & Anatomical Shift',
    subtitle: 'Why clinical remote monitoring and sports biomechanics are pivoting from the distal forearm to the supramalleolar ankle',
    subsections: [
      {
        paragraphs: [
          'The continuous monitoring of human physiology and kinematics has been fundamentally transformed by the advent and proliferation of wearable sensor technology. Historically, both the consumer electronics sector and the clinical remote-monitoring industry have overwhelmingly favored wrist-worn form factors. The ubiquitous adoption of smartwatches and fitness bands on the distal forearm is largely a product of historical convention—capitalizing on the societal normalization of wristwatches—and consumer convenience. However, as the demand for clinical-grade diagnostic accuracy, advanced biomechanical analysis, and unobtrusive longitudinal monitoring escalates, the severe limitations of the wrist as a primary sensor location have been exposed.',
          'The wrist, while highly accessible, presents a dynamically chaotic and mechanically decoupled environment. This decoupling introduces profound artifacts into both kinematic and optical physiological data streams. The upper extremities are frequently engaged in high-acceleration activities completely independent of whole-body locomotion, which systematically confounds inertial measurement unit (IMU) algorithms designed to track energy expenditure, ambulation, and step counts. Furthermore, the peripheral vasculature of the distal forearm and wrist is highly susceptible to temperature-induced vasoconstriction, variable hydrostatic pressures, and dense motion artifacts, all of which degrade the reliability of continuous photoplethysmography (PPG).',
          'In response to these intrinsic limitations, biomedical engineering, sports science, and clinical biomechanics have increasingly pivoted toward the lower extremities, specifically identifying the ankle and the supramalleolar region as the optimal site for sensor placement. The ankle offers a direct, unyielding mechanical coupling to the human locomotor system and provides superior access to deep, stable vascular structures. Comprehensive analysis of current literature indicates that ankle-worn devices deliver unparalleled accuracy in quantifying slow and pathological gait, provide robust hemodynamic monitoring capabilities, enable advanced ground reaction force estimations, and bypass the stringent occupational and athletic constraints that frequently prohibit wrist-worn accessories.',
        ],
      },
    ],
  },
  {
    id: 'vascular-ppg',
    number: '01',
    title: 'Vascular Anatomy & the Physics of Photoplethysmography (PPG) at the Ankle',
    subtitle: 'Posterior tibial artery targeting, motion artifact suppression via SVD/EKF, and Peripheral Arterial Disease screening',
    subsections: [
      {
        heading: 'Anatomical Targeting: The Posterior Tibial Artery',
        paragraphs: [
          'Photoplethysmography (PPG) is a non-invasive optical technique that measures microvascular blood volume changes to estimate parameters such as heart rate (HR), heart rate variability (HRV), and peripheral oxygen saturation (SpO2). Wrist-worn PPG sensors typically rely on illuminating the capillary beds superficial to the radial and ulnar arteries. However, the distal upper extremities are highly reactive to autonomic nervous system modulation. Environmental cold stress or sympathetic nervous system arousal induces rapid peripheral vasoconstriction, which significantly reduces the amplitude of the pulsatile alternating current (AC) component of the PPG signal relative to the non-pulsatile direct current (DC) component [1].',
          'In contrast, the ankle provides direct optical access to the posterior tibial artery and, in some configurations, the dorsalis pedis artery. Anatomical and ultrasonographic studies comparing these lower extremity vessels demonstrate that the posterior tibial artery is generally larger in caliber—averaging between 1.96 and 2.05 millimeters in diameter—and resides in a fascial compartment that makes it less susceptible to external compression from sensor straps or footwear compared to the more superficial dorsalis pedis [5]. Furthermore, human vascular anatomy exhibits significant variance; for instance, the dorsalis pedis artery is entirely absent or severely underdeveloped in a measurable percentage of the population (classified as a Type B vascular pattern), whereas the posterior tibial artery is a robust, reliable continuation of the popliteal artery [6].',
          'Ankle-worn PPG sensors targeting the posterior tibial artery yield a consistently high signal-to-noise ratio. The surrounding musculoskeletal geometry of the supramalleolar region provides an ideal cylindrical contour for maintaining stable, uniform sensor tension. Sensor contact pressure is a critical, yet frequently overlooked variable in PPG signal acquisition and cuffless blood pressure estimation [9]. Excessive contact pressure obliterates the superficial microvascular bed, while insufficient pressure allows ambient light leakage and limits photon penetration depth [4]. The ankle’s structural stability preserves the morphological integrity of the PPG waveform—specifically the distinct presence of the systolic peak, the dicrotic notch, and the diastolic peak—which is absolutely essential for extracting advanced hemodynamic features like arterial stiffness and left ventricular ejection characteristics [10].',
        ],
      },
      {
        heading: 'Mitigation of Motion Artifacts & Algorithmic Cleaning',
        paragraphs: [
          'The primary failure mode of wearable optical sensors is the corruption of the PPG signal by motion artifacts. During ambulatory activities, the chaotic, multidirectional accelerations characteristic of human hand movements cause the wrist sensor to shift relative to the skin, altering the optical path length and introducing massive baseline wander [12]. Under intense physical activity, the error rates of wrist-worn optical heart rate monitors increase by an average of 30% compared to resting states [14].',
          'Because the ankle follows a highly predictable, cyclical trajectory during locomotion and is not subjected to the erratic, high-frequency grasping and reaching movements of the hands, the baseline PPG signal is significantly more stable. When motion artifacts do occur at the ankle, they are highly periodic and closely correlated with the fundamental frequency of the gait cycle. This periodicity allows for highly effective algorithmic cleaning. Researchers have demonstrated that applying sophisticated signal processing techniques—such as Hankel matrix formulations combined with Singular Value Decomposition (SVD) and adaptive filtering using a reference accelerometer—can isolate and remove the motion-correlated components of the ankle PPG signal [12].',
          'The resulting accuracy is striking. Studies evaluating ankle-worn optical sensors demonstrate Mean Absolute Errors (MAE) as low as 1.86 to 3.78 beats per minute during walking and hand-moving scenarios, representing an extreme degree of precision that frequently outperforms leading wrist-worn consumer devices under identical conditions [15].',
        ],
      },
      {
        heading: 'Hydrostatic Pressure & Peripheral Arterial Disease (PAD) Diagnostics',
        paragraphs: [
          'The dependent position of the ankle introduces a unique physiological variable absent at the wrist: significant fluctuations in hydrostatic pressure. When a human transitions from a supine to a standing posture, the hydrostatic column of blood exerts increased pressure on the lower extremity vasculature (approximately 80 mmHg at the mid-calf for an average adult), leading to venous blood pooling and a reflex arteriolar vasoconstriction known as the venoarteriolar reflex [16]. Monitoring the continuous PPG signal at the ankle allows researchers to observe these microvascular adaptations to orthostatic stress, providing a direct window into the autonomic regulation of peripheral vascular tone.',
          'More profoundly, the ankle is the primary anatomical site for the diagnosis and continuous monitoring of Peripheral Arterial Disease (PAD), a systemic manifestation of atherosclerosis characterized by arterial stenosis in the lower limbs. The clinical gold standard for PAD screening is the Ankle-Brachial Index (ABI), which compares the systolic blood pressure at the ankle to that of the brachial artery [19]. Standard ABI measurements, however, exhibit reduced sensitivity and frequent false negatives in patients with medial arterial calcification—a common pathology in advanced diabetes and chronic kidney disease—because the calcified tibial arteries become mechanically non-compressible under a blood pressure cuff [20].',
          'Integrating ankle-worn PPG with traditional hemodynamic assessments resolves this critical diagnostic limitation. The amplitude of the PPG signal (PPGamp) and the ratio of pulsatile to non-pulsatile components (PPGratio) at the posterior tibial artery demonstrate exceptional sensitivity in detecting PAD, effectively bypassing the issue of arterial incompressibility. Clinical evidence indicates that when examining below-knee levels with single-artery stenosis, traditional ABI yields a markedly low diagnostic sensitivity of 19.1%. In stark contrast, the PPGratio derived from an ankle sensor achieves a sensitivity of 68.1%, and PPGamp achieves 55.3% [19]. The capacity to continuously and non-invasively monitor lower extremity perfusion via an ankle wearable represents a massive physiological advantage for the early detection, prognosis, and longitudinal management of peripheral vascular pathologies [19].',
        ],
      },
    ],
    table: {
      caption: 'Table 1: Cardiovascular & Optical PPG Signal Comparison',
      headers: [
        'Cardiovascular Metric',
        'Sensor Placement',
        'Signal Quality / Accuracy Characteristics',
        'Primary Sources of Artifact',
      ],
      rows: [
        ['Heart Rate (Resting)', 'Wrist', 'High Accuracy (MAE < 2 bpm)', 'Ambient light, poor strap fit'],
        [
          'Heart Rate (Active)',
          'Wrist',
          'High Variance (MAE 5 - 15+ bpm)',
          'Erratic limb acceleration, flexor tendon movement [14]',
        ],
        [
          'Heart Rate (Active)',
          'Ankle',
          'High Accuracy (MAE < 4 bpm)',
          'Predictable gait cadence, effectively filtered [15]',
        ],
        [
          'PPG Morphology',
          'Wrist',
          'Often degraded by extreme joint articulation',
          'Radiocarpal flexion/extension [12]',
        ],
        [
          'PPG Morphology',
          'Ankle',
          'Highly preserved (clear dicrotic notch)',
          'Maintained by stable cylindrical contact [9]',
        ],
      ],
    },
  },
  {
    id: 'kinematic-superiority',
    number: '02',
    title: 'Kinematic Superiority: Precision in Step Quantification & Gait Speed',
    subtitle: 'Eliminating non-ambulatory hand false positives, capturing slow post-stroke gait, and modeling metabolic cost',
    subsections: [
      {
        paragraphs: [
          'The fundamental purpose of an inertial activity tracker is to quantify human locomotion. The wrist-worn activity tracker inherently relies on a biomechanical assumption: that the rhythmic swing of the arm correlates directly and proportionately with the steps taken by the lower limbs. While this heuristic holds true for healthy adults engaged in vigorous, unimpeded running, it collapses entirely under the realities of free-living conditions, pathological gait, and standard activities of daily living (ADLs).',
        ],
      },
      {
        heading: 'Eradicating Upper-Limb Artifacts & False Positives',
        paragraphs: [
          'Wrist-worn devices are notoriously vulnerable to false positive step detection. The upper extremities perform a vast array of high-acceleration, non-ambulatory movements. Activities such as washing dishes, folding laundry, playing cards, and brushing teeth generate rhythmic accelerations that consumer wristband algorithms frequently misclassify as locomotion [21]. Research demonstrates that the Mean Absolute Percentage Error (MAPE) for wrist-worn devices during sedentary, hand-heavy household tasks can exceed 57% [21].',
          'Conversely, when the upper limbs are constrained during actual walking—such as when pushing a stroller, carrying a heavy box, or leaning on a shopping cart or walking aid—the wrist tracker fails to detect the dampened arm swing. This results in severe step undercounting, with error rates soaring above 67% when the user relies on a walker or cane [21].',
          'By relocating the sensor to the ankle, the IMU is directly coupled to the prime movers of locomotion. The ankle experiences massive, unmistakable acceleration transients during the heel-strike phase of the gait cycle, followed by a distinct deceleration during midstance, and a secondary acceleration peak during toe-off [24]. These kinematic signatures are virtually impossible to replicate through sedentary activities, ensuring that step counts derived from ankle monitors represent true ambulatory events. Studies explicitly show that ankle-worn accelerometers maintain an error rate approaching 0% during non-ambulatory arm movements, effectively immunizing the dataset against upper-body artifacts [21].',
        ],
      },
      {
        heading: 'Precision in Slow, Pathological & Geriatric Gait',
        paragraphs: [
          'The algorithmic limitations of wrist accelerometry are most severely pronounced in populations that do not exhibit a vigorous, healthy arm swing. In older adults, the decoupling between arm swing and leg movement causes wrist-worn actigraphy to fail dramatically. Comprehensive studies utilizing the research-grade ActiGraph device demonstrated that for older adults, wrist-worn placement registered a 180% increase in false steps—equivalent to over 5,470 erroneous steps per day—compared to hip or ankle placements [26].',
          'For patients recovering from major surgeries or neurological events, the failure mode reverses: wrist trackers drastically undercount steps because these patients walk at speeds below the threshold required to trigger the algorithmic heuristic at the wrist. In early post-operative monitoring of orthopedic and abdominal surgery patients, walking speeds frequently drop below 0.6 meters per second (m/s). At these reduced velocities, popular commercial wrist trackers yield unacceptably high MAPEs, failing to register any steps in nearly a third of walking trials [27].',
          'Ankle-worn accelerometers demonstrate exceptional resilience to ultra-low gait speeds. Studies evaluating stroke survivors and functionally impaired older adults walking at speeds as low as 0.3 to 0.5 m/s reveal that waist and wrist sensors produce unacceptable errors (often >10%) and experience total algorithmic failures, recording zero steps despite continuous ambulation [23]. Under identical conditions, accelerometers positioned at the ankle maintain error rates strictly below 5%, successfully distinguishing stance and swing phases even when forward progression is painfully slow [28].',
          'The clinical implications of this accuracy are profound. In inpatient rehabilitation units, the quantification of physical activity acts as a primary metric for functional recovery and discharge readiness. If a wrist device records zero steps for a post-stroke patient who successfully, albeit slowly, completed a grueling 10-meter walk test, the resulting data is not only clinically invalid but profoundly demotivating to the patient [27]. Ankle devices guarantee that every biomechanical effort exerted by the patient is captured, quantified, and appropriately rewarded.',
        ],
      },
      {
        heading: 'Energy Expenditure & Metabolic Categorization',
        paragraphs: [
          'Estimating Energy Expenditure (EE) and categorizing physical activity into Metabolic Equivalents (METs) is a cornerstone of epidemiological research, sports science, and personal fitness tracking. The traditional methodological approach utilizes linear or non-linear regression equations based on the integration of acceleration counts over specific epochs (e.g., 10-second or 60-second windows). The predictive validity of these models relies entirely on how closely the measured acceleration correlates with the actual mechanical work performed by the body against gravity.',
          'Because the lower extremities account for the overwhelming majority of the body’s active muscle mass and are the primary engines of human locomotion, the mechanical work measured directly at the ankle correlates heavily with whole-body oxygen consumption (VO₂) and metabolic demand. Studies developing novel Vector Magnitude (VM) algorithms for ankle-worn ActiGraph GT3X and GT9X monitors demonstrate that ankle predictions of EE closely mirror indirect calorimetry, which remains the laboratory gold standard for measuring metabolic cost [32]. During free-living trials and structured cardiopulmonary exercise testing on treadmills, the correlation between hip and ankle devices displays very high consistency (r > 0.90), whereas wrist-worn sensors exhibit significantly larger divergence and a systemic overestimation of Moderate-to-Vigorous Physical Activity (MVPA) [26].',
          'Furthermore, predictive models utilizing ankle accelerometry effectively differentiate between varying intensities of locomotion. By applying specifically tuned thresholds to the coefficient of variation (CV) of the acceleration signal, ankle algorithms can accurately stratify sedentary time, Light Physical Activity (LPA), and MVPA [32]. Wrist algorithms struggle immensely with this stratification. They frequently confuse the high-frequency, low-load movements of typing or gesticulating with moderate physical activity, while simultaneously misclassifying steady-state, hands-in-pockets walking as sedentary behavior. Complex machine learning architectures, including N-gram time series models that analyze the sequential patterns of acceleration, confirm that monitoring at the ankle provides the most robust single-site data stream for classifying specific activity types and their associated energetic costs [37].',
        ],
      },
    ],
    table: {
      caption: 'Table 2: Step Count Accuracy Across Gait Speeds & Constraints',
      headers: ['Gait Condition & Speed', 'Sensor Location', 'Step Count Error (MAPE / Bias)', 'Algorithmic Reliability'],
      rows: [
        ['Ultra-Slow Walk (0.3 - 0.5 m/s)', 'Wrist', '> 40.0% (Frequent zero-step failures)', 'Poor [27]'],
        ['Ultra-Slow Walk (0.3 - 0.5 m/s)', 'Waist / Hip', '10.0% - 20.0%', 'Moderate [21]'],
        ['Ultra-Slow Walk (0.3 - 0.5 m/s)', 'Ankle', '< 5.0%', 'Excellent [28]'],
        ['Upper Limb Obstructed (Walker)', 'Wrist', '> 67.0% Underestimation', 'Poor [21]'],
        ['Upper Limb Obstructed (Walker)', 'Ankle', '< 2.0% Error', 'Excellent [21]'],
        ['Sedentary Hand Tasks (Cards)', 'Wrist', 'Generates false positive steps', 'Poor [21]'],
        ['Sedentary Hand Tasks (Cards)', 'Ankle', '0.0% (Immune to hand artifact)', 'Excellent [21]'],
      ],
    },
  },
  {
    id: 'biomechanics-kinetics',
    number: '03',
    title: 'Advanced Biomechanics: Tibial Acceleration & Ground Reaction Forces',
    subtitle: 'Mobile force-plate inference using CNN/LSTM models, Discrete Wavelet Transforms, and Extended Kalman Filtering',
    subsections: [
      {
        heading: 'Shock Attenuation & Peak Tibial Acceleration (PTA)',
        paragraphs: [
          'Beyond the basic quantification of steps and metabolic expenditure, the ankle serves as the premier anatomical node for high-fidelity biomechanical research. The deployment of a 6-axis IMU (comprising a tri-axial accelerometer and a tri-axial gyroscope) at the supramalleolar region allows for the real-time reconstruction of the complete gait cycle, bridging the gap between the laboratory and the real world.',
          'During the initial impact phase of a running stride, the lower extremity experiences a rapid transient shockwave as the foot collides with the ground. The magnitude of this shock is clinically quantified as Peak Tibial Acceleration (PTA). Accelerometers firmly affixed to the distal tibia or the medial malleolus capture the peak instantaneous vertical loading rates, which act as highly reliable surrogates for the vertical GRF impact peak [24]. While PTA alone is only one of several contributors to overall tibial bone loading, high-dynamic-range ankle sensors (capable of capturing ±16g to ±32g to avoid signal clipping) provide multi-dimensional acceleration data—including anterior-posterior and medio-lateral loading—that allow sports scientists to analyze the specific shock attenuation strategies employed by the runner [24].',
          'Ankle sensor data clearly demonstrates how foot strike patterns dictate joint compliance and injury risk. A forefoot strike (FFS) increases ankle joint compliance, allowing the Achilles tendon and the plantarflexor musculature to perform eccentric negative work. This mechanism absorbs a significantly higher amount of impact energy at the ankle compared to a rearfoot strike (RFS), which transmits the high-frequency shockwave directly up the skeletal chain to the knee and hip [38]. Ankle IMUs can detect these subtle shifts in power spectral density, differentiating between the low-frequency active push-off phase (3–8 Hz) and the high-frequency impact transient (9–20 Hz) [46].',
        ],
      },
      {
        heading: 'Machine Learning & the Prediction of Joint Kinetics',
        paragraphs: [
          'The integration of ankle IMU data with advanced machine learning has effectively transformed the wearable device into a mobile force plate. Recent biomechanical research has trained Deep Learning models, such as Convolutional Neural Networks (CNNs), Long Short-Term Memory (LSTM) networks, and Reservoir Computers, to ingest raw 3D accelerometry from the shank and output predicted vertical GRF waveforms with extraordinary precision [50].',
          'These models analyze the non-linear relationships within the acceleration data to predict not only the timing of foot-contact and foot-off events within milliseconds of error but also to estimate ankle, knee, and hip joint moments in the sagittal plane [51]. When evaluating intra-subject data, Random Forest models utilizing ankle and shank kinematics have estimated ankle joint dorsiflexion/plantarflexion angles with a Root Mean Square Error (RMSE) of merely 2.14°, demonstrating that a single, strategically placed lower-limb sensor can rival the kinematic output of a multi-camera laboratory setup [53].',
        ],
      },
      {
        heading: 'Signal Processing Methodologies: DWT & Kalman Filtering',
        paragraphs: [
          'The extraction of clean, actionable biomechanical signals from the inherently noisy environment of human locomotion requires sophisticated signal processing architecture operating on the edge device. Ankle wearables heavily leverage Discrete Wavelet Transforms (DWT) and Extended Kalman Filters (EKF) to maintain high temporal resolution of gait events [54].',
          'Because IMU signals are non-stationary—meaning their frequency content changes dramatically over time depending on the phase of the gait cycle—standard Fourier transforms are inadequate. The Discrete Wavelet Transform decomposes the ankle acceleration and angular velocity signals into a time-frequency scale, utilizing orthogonal filter banks [55]. By applying specific wavelet families (e.g., fifth-order Coiflet, Daubechies, or Symlets), algorithms can isolate the high-frequency transients corresponding to heel-strike and toe-off events, effectively filtering out high-frequency sensor noise and low-frequency baseline drift [56].',
          'Concurrently, Extended Kalman Filters are applied to the raw orientation data to continuously track the exact attitude and spatial trajectory of the lower limb [54]. The Kalman filter recursively combines the noisy sensor measurements with a mathematical model of human kinematics to provide an optimal, updated estimation of the ankle’s state in three-dimensional space, accounting for gyroscope integration drift [61]. This degree of algorithmic sophistication allows ankle sensors to detect subtle, millimeter-scale variations in stride length, foot clearance, and swing-phase trajectory that are fundamentally impossible to derive from a wrist-mounted unit.',
        ],
      },
    ],
    table: {
      caption: 'Table 3: Laboratory Biomechanics Translated to Ankle IMU Edge Inference',
      headers: ['Biomechanical Metric', 'Lab Standard', 'Ankle IMU / Foot Pod Capability', 'Clinical / Athletic Relevance'],
      rows: [
        [
          'Peak Tibial Acceleration',
          'Bone-mounted accelerometer',
          'High Accuracy (Skin-mounted at distal tibia) [24]',
          'Surrogate for impact shock and MTSS risk',
        ],
        [
          'Ground Contact Time (GCT)',
          'Force Plate',
          'High Reliability (Slight underestimation) [41]',
          'Indicates running economy and stiffness',
        ],
        [
          'Vertical Oscillation',
          'Optical Motion Capture',
          'High Accuracy (ICC > 0.85) [48]',
          'Measures wasted vertical mechanical energy',
        ],
        [
          'Strike Index (Foot Strike)',
          'Center of Pressure (Force Plate)',
          'Validated via IMU pitch angle at contact [47]',
          'Determines energy absorption distribution (FFS vs RFS)',
        ],
      ],
    },
  },
  {
    id: 'neurological-diagnostics',
    number: '04',
    title: 'Neurological Diagnostics: Parkinson’s Disease & Stroke Rehabilitation',
    subtitle: 'Freezing of Gait prediction (-1.8s window), closed-loop haptic cueing, and bilateral limb load symmetry',
    subsections: [
      {
        heading: 'Detecting & Predicting Freezing of Gait (FoG)',
        paragraphs: [
          'A debilitating, episodic motor symptom of advanced Parkinson’s Disease is the Freezing of Gait (FoG). FoG is defined as a sudden, transient inability to generate effective forward stepping despite the explicit intention to walk, often described by patients as feeling as though their feet are glued to the floor. FoG episodes drastically increase the risk of forward falls, leading to devastating traumatic brain injuries and hip fractures [62]. Because FoG physically manifests in the lower extremities as high-frequency trembling (typically between 3–8 Hz) or complete akinesia, ankle-worn sensors are uniquely, anatomically positioned to detect its onset.',
          'Researchers utilizing bilateral ankle IMUs have trained Support Vector Machines (SVM), Random Forests, and Deep Learning neural networks to classify FoG episodes based on the spectral density and frequency distribution of ankle acceleration [63]. The evidence demonstrates that features extracted directly from the shank and ankle—such as the freezing index (the ratio of high-frequency power in the 3–8 Hz band to low-frequency power in the 0.5–3 Hz band)—yield detection accuracies, sensitivities, and specificities that routinely exceed 90% [64].',
          'More remarkably, machine learning models processing continuous temporal sequences of ankle data have shown the capability to predict impending FoG episodes before the clinical manifestation occurs. Time-series analysis algorithms can detect subtle deteriorations in stride length and cadence, identifying an impending freeze up to 1.8 seconds prior to the actual halt in movement [63]. This predictive window is revolutionary; it enables the deployment of closed-loop wearable systems that provide rhythmic auditory, visual, or haptic sensory cues directly to the patient’s lower limbs, thereby bypassing the defective basal ganglia pathways, preventing the freeze, and preserving mobility [65].',
        ],
      },
      {
        heading: 'Stroke Rehabilitation & Gait Asymmetry',
        paragraphs: [
          'In post-stroke rehabilitation, the restoration of gait symmetry is a primary clinical objective. Stroke patients frequently exhibit a hemiparetic gait pattern, characterized by unequal stride lengths, severely reduced swing time on the paretic limb, circumduction, and massive asymmetry in vertical ground reaction forces [70]. Wrist monitors provide zero insight into inter-limb coordination or weight-bearing asymmetries.',
          'By placing an accelerometer on both the paretic and non-paretic ankles, physical therapists can objectively quantify the exact asymmetry in impact loads and swing-phase kinematics [70]. Studies demonstrate that monitoring the inter-limb impact asymmetry through ankle accelerometers provides a highly sensitive metric for tracking recovery trajectories following joint arthroplasty and neurological events [70]. This granular data allows for targeted, data-driven biofeedback to optimize neuroplasticity and motor recovery, ensuring the patient is not merely increasing their step count, but fundamentally improving the quality and safety of their gait.',
        ],
      },
    ],
    table: {
      caption: 'Table 4: Clinical Neurology ML Classification Benchmarks on Ankle IMUs',
      headers: ['Machine Learning Architecture', 'Sensor Location', 'Diagnostic Target', 'Sensitivity', 'Specificity', 'Accuracy'],
      rows: [
        ['Random Forest [64]', 'Left Shank / Ankle', 'Freezing of Gait (FoG)', '78.39%', '91.66%', '88.09%'],
        ['Convolutional Neural Net [66]', 'Bilateral Ankles', 'Freezing of Gait (FoG)', '96.00%', '83.00%', '91.00%'],
        ['SVM / KNN [68]', 'Ankle IMU', 'General Gait Impairment', 'N/A', 'N/A', '94.90%'],
        ['CNN (Multichannel) [69]', 'Bilateral Ankles', 'Exoskeleton Control', '99.20%', '> 98.00%', '99.20%'],
      ],
    },
  },
  {
    id: 'ergonomic-imperatives',
    number: '05',
    title: 'Practical & Ergonomic Imperatives for an Unobstructed Wrist',
    subtitle: 'Hospital "Bare Below the Elbows" infection control, strength wraps & combat gear, and sartorial freedom',
    subsections: [
      {
        heading: 'Clinical Environments & Infection Control ("Bare Below the Elbows")',
        paragraphs: [
          'In global healthcare systems, the transmission of healthcare-associated infections (HAIs) is a critical, persistent epidemiological threat. Pathogens such as Methicillin-resistant Staphylococcus aureus (MRSA), Vancomycin-resistant Enterococcus (VRE), and Clostridioides difficile exhibit an alarming capacity to survive on textiles, plastics, and metallic surfaces for weeks to months [72]. Healthcare workers operate precisely at the vector point of this transmission matrix.',
          'To disrupt the chain of pathogen colonization and cross-contamination, major public health institutions, most notably the United Kingdom’s National Health Service (NHS), have instituted rigid "Bare Below the Elbows" (BBE) dress codes for all clinical staff engaged in patient care [73]. The BBE policy strictly prohibits the wearing of long sleeves, neckties, jewelry, and crucially, wristwatches and wrist-worn fitness trackers [74]. Microbiological investigations have consistently demonstrated that the crevices, porous fabric bands, and perimeters of wristwatches harbor incredibly dense colonies of pathogenic bacteria [73]. Furthermore, their physical presence on the distal forearm severely obstructs the execution of high-quality, high-volume alcohol-based hand rub protocols, preventing complete sanitization of the wrists [73].',
          'The strict implementation of BBE creates a profound paradox in occupational health: nurses and physicians, who endure immense physiological stress, chronic sleep deprivation, and extreme ambulatory demands (often exceeding 10,000 to 15,000 steps per shift), are systematically barred from utilizing the very wrist-worn wearable technology designed to monitor occupational burnout and cardiovascular health [77].',
          'The ankle-worn fitness tracker resolves this paradox entirely. Operating covertly beneath the pant leg and enclosed within clinical footwear, the ankle device resides far outside the sterile field and poses zero risk of hand-to-patient pathogen transfer. It empowers healthcare systems and researchers to leverage wearable biometrics to continuously monitor the hydration, fatigue, energy expenditure, and sleep recovery of their frontline workforce while maintaining uncompromising, 100% adherence to vital infection control policies [77].',
        ],
      },
      {
        heading: 'Athletic Constraints & Biomechanical Interference',
        paragraphs: [
          'In the realm of rigorous strength and conditioning, the wrist-worn tracker faces equally prohibitive mechanical barriers. Disciplines such as powerlifting, Olympic weightlifting, strongman, and CrossFit subject the human wrist to extreme extension and compressive loads. During explosive, heavy compound movements like the barbell clean, front squat, and snatch, the wrist is forced into severe radial deviation and extension. This biomechanical position directly compresses the soft tissue of the wrist against any foreign object worn on the joint. To stabilize the radiocarpal joint and prevent catastrophic ligamentous injury under heavy loads, strength athletes universally rely on stiff, tightly bound canvas or elastane wrist wraps [80].',
        ],
        bullets: [
          {
            label: '1. Obstruction and Contusion Risk',
            text: 'The protective wrap must be bound tightly around the distal radius and ulna, spanning the exact real estate where a smartwatch traditionally resides. Forcing a wrap over a thick smart device drives the rigid casing directly into the carpal bones, causing pain, contusions, and preventing proper joint stabilization.',
          },
          {
            label: '2. Optical Sensor Failure',
            text: 'Even if a tracker is pushed further proximally up the forearm to accommodate the wrap, the extreme muscular tension and venous occlusion caused by the tight wrap severely degrades the PPG signal. Violent shocks from catching barbells or racking kettlebells also shatter glass optical arrays.',
          },
          {
            label: '3. Combat Sports & Padded Gloves',
            text: 'Boxers, mixed martial artists, and grapplers cannot wear rigid metal or plastic devices on their wrists without inflicting severe lacerations upon themselves or training partners. Hands and wrists must remain taped and sequestered inside padded gloves [82].',
          },
        ],
      },
      {
        heading: 'Style, Sartorial Freedom & Aesthetic Discretion',
        paragraphs: [
          'Beyond the rigid, pragmatic demands of the clinic and the gym, the aesthetic and cultural implications of wearable technology heavily dictate user compliance and long-term retention. The wrist has operated as the primary locus of male and female jewelry and timekeeping for over a century. The traditional mechanical watch industry—encompassing luxury horology, heirloom pieces, and artisanal craftsmanship—retains massive cultural, emotional, and aesthetic significance.',
          'The advent of the wrist-worn smartwatch forced consumers into a zero-sum sartorial dilemma. To gain continuous health monitoring, HRV tracking, and sleep architecture analysis, users were compelled to abandon their traditional mechanical watches in favor of homogenous, utilitarian, silicon-and-glass biometric slabs. Attempting to circumvent this compromise by wearing a traditional watch on one wrist and a fitness tracker on the other—colloquially mocked as "double-wristing"—is widely considered aesthetically unappealing, visually cluttered, and physically cumbersome.',
          'The ankle-worn biometric band provides the ultimate, elegant solution to the aesthetic compromise. By relocating the technological burden to the lower extremity, the wrist is entirely liberated. Users can maintain 24-hour, clinical-grade tracking of their autonomic nervous system, sleep architecture, and daily activity levels while enjoying absolute sartorial freedom to wear luxury timepieces, bracelets, or simply maintain a minimalist, bare wrist. Hidden beneath a trouser leg or sock, it autonomously compiles continuous physiological datasets in total visual and digital silence across boardrooms, galas, and uniformed settings.',
        ],
      },
    ],
  },
];

export const ANKLE_WORKS_CITED: CitationItem[] = [
  { id: 1, title: 'Differential sensitivity of impedance plethysmography and ... - PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/41620497/', domain: 'Vascular & PPG' },
  { id: 2, title: 'Differential sensitivity of impedance plethysmography and ... - PMC', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12916965/', domain: 'Vascular & PPG' },
  { id: 3, title: 'Sources of Inaccuracy in Photoplethysmography for Continuous ...', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8073123/', domain: 'Vascular & PPG' },
  { id: 4, title: 'WildPPG: A Real-World PPG Dataset of Long Continuous Recordings', url: 'https://www.researchgate.net/publication/397205032_WildPPG_A_Real-World_PPG_Dataset_of_Long_Continuous_Recordings', domain: 'Vascular & PPG' },
  { id: 5, title: 'Commentary: Demystifying Doppler – revisiting a vital diagnostic tool', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8962088/', domain: 'Vascular & PPG' },
  { id: 6, title: 'A Randomized Trial to Compare Ultrasound-Guided Dorsalis Pedis ...', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9904750/', domain: 'Vascular & PPG' },
  { id: 7, title: 'Anatomy, Bony Pelvis and Lower Limb: Foot Arteries - NCBI - NIH', url: 'https://www.ncbi.nlm.nih.gov/sites/books/NBK560912/', domain: 'Vascular & PPG' },
  { id: 8, title: 'Anatomic study of blood supply of the dorsum of the foot and ankle', url: 'https://pubmed.ncbi.nlm.nih.gov/16517313/', domain: 'Vascular & PPG' },
  { id: 9, title: 'PPG Sensor Contact Pressure Should Be Taken Into Account for Cuff-Less BP Measurement', url: 'https://www.researchgate.net/publication/339578694_PPG_Sensor_Contact_Pressure_Should_Be_Taken_Into_Account_for_Cuff-Less_Blood_Pressure_Measurement', domain: 'Vascular & PPG' },
  { id: 10, title: 'A review on wearable photoplethysmography sensors and their ...', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6426305/', domain: 'Vascular & PPG' },
  { id: 11, title: 'Benchmarking of Sensor Configurations and Measurement Sites for ...', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10781263/', domain: 'Vascular & PPG' },
  { id: 12, title: 'Wearable Photoplethysmography for Cardiovascular Monitoring - PMC', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7612541/', domain: 'Vascular & PPG' },
  { id: 13, title: 'The 2023 wearable photoplethysmography roadmap - PMC - NIH', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10686289/', domain: 'Vascular & PPG' },
  { id: 14, title: 'Wearables for Clinical Research: Device Comparison - WeGuide', url: 'https://www.weguide.health/tools/research-wearable-comparison', domain: 'Vascular & PPG' },
  { id: 15, title: 'Precision Heart Rate Estimation Using a PPG Sensor Patch ... - PMC', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10346997/', domain: 'Vascular & PPG' },
  { id: 16, title: 'A Primer on Repeated Sitting Exposure and the Cardiovascular ...', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8415972/', domain: 'Vascular & PPG' },
  { id: 17, title: 'UIP18 Venablock vs Veinoff Vascular Volume Analysis (Suppl. 1)', url: 'https://viratabib.com/assets/invamed/vascular/venablock/UIP18_Venablock%20vs%20Veinoff.pdf', domain: 'Vascular & PPG' },
  { id: 18, title: 'Physical exercise for the treatment of non-ulcerated chronic venous ...', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10265938/', domain: 'Vascular & PPG' },
  { id: 19, title: 'Diagnostic Potential of Combined Photoplethysmography and Ankle ...', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11681468/', domain: 'Vascular & PPG' },
  { id: 20, title: 'Ankle-Brachial Index - Physiopedia', url: 'https://www.physio-pedia.com/Ankle-Brachial_Index', domain: 'Vascular & PPG' },
  { id: 21, title: 'Accuracy of consumer-level and research-grade activity trackers in older adults', url: 'https://www.researchgate.net/publication/333256677_Accuracy_of_consumer-level_and_research-grade_activity_trackers_in_ambulatory_settings_in_older_adults', domain: 'Step & Metabolic Kinematics' },
  { id: 22, title: 'Machine Learning Based Abnormal Gait Classification with IMU', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11397963/', domain: 'Step & Metabolic Kinematics' },
  { id: 23, title: "Accelerometers can correctly count orthopaedic patients' early post-op steps", url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11696250/', domain: 'Step & Metabolic Kinematics' },
  { id: 24, title: 'Predicting Impact Shock Magnitude: Which Ground Reaction Force Variable Should We Use', url: 'https://www.researchgate.net/publication/236672645_Predicting_Impact_Shock_Magnitude_Which_Ground_Reaction_Force_Variable_Should_We_Use', domain: 'Biomechanics & ML' },
  { id: 25, title: 'Analytical and clinical validation of step counting method in people ...', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12630758/', domain: 'Step & Metabolic Kinematics' },
  { id: 26, title: 'Comparison of step-count outcomes across seven different activity ...', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11264768/', domain: 'Step & Metabolic Kinematics' },
  { id: 27, title: 'Accuracy of wrist-worn activity trackers for measuring steps in ... - PMC', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11536558/', domain: 'Step & Metabolic Kinematics' },
  { id: 28, title: '“Stepping Up” Activity Poststroke: Ankle-Positioned Accelerometer ...', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4774387/', domain: 'Step & Metabolic Kinematics' },
  { id: 29, title: 'The Accuracy of Commercially Available Fitness Trackers in Patients ...', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9573007/', domain: 'Step & Metabolic Kinematics' },
  { id: 30, title: 'Wearable step counting using a force myography-based ankle strap', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6453033/', domain: 'Step & Metabolic Kinematics' },
  { id: 31, title: 'Analyzing walking speeds with ankle and wrist worn accelerometers', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6900209/', domain: 'Step & Metabolic Kinematics' },
  { id: 32, title: 'Estimating Physical Activity in Youth Using an Ankle Accelerometer', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6301034/', domain: 'Step & Metabolic Kinematics' },
  { id: 33, title: 'Ankle Accelerometry for Assessing Physical Activity among ... - PMC', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4775231/', domain: 'Step & Metabolic Kinematics' },
  { id: 34, title: 'Estimating Energy Expenditure with ActiGraph GT9X Inertial ...', url: 'https://pubmed.ncbi.nlm.nih.gov/29271847/', domain: 'Step & Metabolic Kinematics' },
  { id: 35, title: 'Validity of the Actigraph-GT9X accelerometer for measuring steps ...', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11684600/', domain: 'Step & Metabolic Kinematics' },
  { id: 36, title: 'Comparisons of hip-worn and ankle-worn accelerometers on ... - PMC', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12679618/', domain: 'Step & Metabolic Kinematics' },
  { id: 37, title: 'Ngram time series model to predict activity type and energy cost', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4790099/', domain: 'Step & Metabolic Kinematics' },
  { id: 38, title: 'Effects of Foot Strike Techniques on Running Biomechanics - PMC', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7734358/', domain: 'Biomechanics & ML' },
  { id: 39, title: 'Greater vertical impact loading in female runners with medically diagnosed injuries', url: 'https://www.researchgate.net/publication/286376492_Greater_vertical_impact_loading_in_female_runners_with_medically_diagnosed_injuries_A_prospective_investigation', domain: 'Biomechanics & ML' },
  { id: 40, title: 'Wearable Movement Sensors for Rehabilitation: A Focused Review', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6700726/', domain: 'Biomechanics & ML' },
  { id: 41, title: 'Reliability and validity of the Stryd Power Meter during different ...', url: 'https://pubmed.ncbi.nlm.nih.gov/34896839/', domain: 'Biomechanics & ML' },
  { id: 42, title: 'Absolute Reliability and Concurrent Validity of the Stryd System for ...', url: 'https://pubmed.ncbi.nlm.nih.gov/29781934/', domain: 'Biomechanics & ML' },
  { id: 43, title: 'Agreement between the spatiotemporal gait parameters from two ...', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6759187/', domain: 'Biomechanics & ML' },
  { id: 44, title: 'Peak tibial acceleration should not be used as indicator of tibial bone loading', url: 'https://www.researchgate.net/publication/367177912_Peak_tibial_acceleration_should_not_be_used_as_indicator_of_tibial_bone_loading_during_running', domain: 'Biomechanics & ML' },
  { id: 45, title: 'Stride Length, Velocity, and Peak Tibial Acceleration during Running', url: 'https://d-nb.info/1214649688/34', domain: 'Biomechanics & ML' },
  { id: 46, title: 'Shock Acceleration and Attenuation during Running with Minimalist ...', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9312333/', domain: 'Biomechanics & ML' },
  { id: 47, title: 'Exploring the Role of Footwear in Trail Running and Hiking - PMC', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC13452467/', domain: 'Biomechanics & ML' },
  { id: 48, title: 'The validity and reliability of wearable devices for the measurement ...', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9671438/', domain: 'Biomechanics & ML' },
  { id: 49, title: 'Ankle Joint Biomechanics in Recreational Runners with Resolved ...', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC13077024/', domain: 'Biomechanics & ML' },
  { id: 50, title: 'The Use of Machine Learning to Estimate Ground Reaction Forces', url: 'https://pubmed.ncbi.nlm.nih.gov/42076611/', domain: 'Biomechanics & ML' },
  { id: 51, title: 'Predicting vertical ground reaction forces from 3D accelerometry', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9644164/', domain: 'Biomechanics & ML' },
  { id: 52, title: 'Machine Learning-Based Estimation of Ground Reaction Forces and ...', url: 'https://pubmed.ncbi.nlm.nih.gov/34833779/', domain: 'Biomechanics & ML' },
  { id: 53, title: "A comparison of machine learning models' accuracy in predicting ...", url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10049990/', domain: 'Biomechanics & ML' },
  { id: 54, title: 'The Use of Accelerometers and Gyroscopes to Estimate Hip ... - PMC', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4063036/', domain: 'Biomechanics & ML' },
  { id: 55, title: 'Wavelet based automated postural event detection and activity ...', url: 'https://stacks.cdc.gov/view/cdc/213308/cdc_213308_DS1.pdf', domain: 'Biomechanics & ML' },
  { id: 56, title: 'Postoperative human motion evaluation in orthopedics based on ...', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12097607/', domain: 'Biomechanics & ML' },
  { id: 57, title: 'Robust Gait Phase Estimation With Discrete Wavelet Transform for Multiple Terrains', url: 'https://www.researchgate.net/publication/391129052_Robust_Gait_Phase_Estimation_With_Discrete_Wavelet_Transform_for_Walking_Assistance_on_Multiple_Terrains', domain: 'Biomechanics & ML' },
  { id: 58, title: 'Automated detection of gait events using inertial sensor signals and ...', url: 'https://pen.ius.edu.ba/index.php/pen/article/download/57/55/106', domain: 'Biomechanics & ML' },
  { id: 59, title: 'Wearable Sensor-Based Real-Time Gait Detection - PMC - NIH', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8069962/', domain: 'Biomechanics & ML' },
  { id: 60, title: 'Wearable Sensor-Based Real-Time Gait Detection - Systematic Review', url: 'https://www.researchgate.net/publication/350852025_Wearable_Sensor-Based_Real-Time_Gait_Detection_A_Systematic_Review', domain: 'Biomechanics & ML' },
  { id: 61, title: 'Automated Sidewalk Surface Detection Using Wearable ... - PMC', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12252497/', domain: 'Biomechanics & ML' },
  { id: 62, title: 'Wearable-Sensor-Based Detection and Prediction of Freezing of Gait', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6928783/', domain: 'Neurology & Rehab' },
  { id: 63, title: 'The Usefulness of Wearable Sensors for Detecting Freezing of Gait', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12389820/', domain: 'Neurology & Rehab' },
  { id: 64, title: "Recognition of freezing of gait in Parkinson's disease based ... - PMC", url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9210754/', domain: 'Neurology & Rehab' },
  { id: 65, title: "Freezing of Gait in Parkinson's Disease: A Scoping Review ... - PMC", url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC13074614/', domain: 'Neurology & Rehab' },
  { id: 66, title: "Ankle Sensor-Based Detection of Freezing of Gait in Parkinson's", url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11945996/', domain: 'Neurology & Rehab' },
  { id: 67, title: 'Toward a Wearable System for Predicting Freezing of Gait in People ...', url: 'https://pubmed.ncbi.nlm.nih.gov/31715577/', domain: 'Neurology & Rehab' },
  { id: 68, title: 'Computer Vision and Machine Learning-Based Gait Pattern ... - PMC', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9612353/', domain: 'Neurology & Rehab' },
  { id: 69, title: 'Deep learning for motion classification in ankle exoskeletons using ...', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12578945/', domain: 'Neurology & Rehab' },
  { id: 70, title: 'Novel Use of an Accelerometer to Assess Load Asymmetry Over ...', url: 'https://pubmed.ncbi.nlm.nih.gov/37068566/', domain: 'Neurology & Rehab' },
  { id: 71, title: 'Feasibility, reliability, and validity of using accelerometers to ... - PMC', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6312264/', domain: 'Neurology & Rehab' },
  { id: 72, title: 'hospital-acquired infection hai: Topics by Science.gov', url: 'https://www.science.gov/topicpages/h/hospital-acquired+infection+hai', domain: 'Clinical Hygiene & Ergonomics' },
  { id: 73, title: 'Wearing white coats and sitting on beds: why should it matter? - PMC', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4952334/', domain: 'Clinical Hygiene & Ergonomics' },
  { id: 74, title: "Study shows no difference in bacterial contamination of doctors' wrists", url: 'https://www.researchgate.net/publication/49840047_Study_shows_no_difference_in_bacterial_contamination_of_doctors\'_wrists_with_short_or_long_sleeves', domain: 'Clinical Hygiene & Ergonomics' },
  { id: 75, title: 'Augmenting Critical Care Patient Monitoring Using Wearable ... - PMC', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8188324/', domain: 'Clinical Hygiene & Ergonomics' },
  { id: 76, title: 'Expert Guidance: Healthcare Personnel Attire in Non-Operating ...', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4820072/', domain: 'Clinical Hygiene & Ergonomics' },
  { id: 77, title: 'A Behavioral Change Intervention System to Support the Hydration of Nurses', url: 'https://www.researchgate.net/publication/345725594_A_Behavioral_Change_Intervention_System_to_Support_the_Hydration_Habits_of_Nurses_in_Hospital_Wards', domain: 'Clinical Hygiene & Ergonomics' },
  { id: 78, title: 'BOOK OF ABSTRACTS ESNO 2026', url: 'https://www.esno-congress.eu/resources/media/ESNO_2026_Book_of_Abstracts.pdf', domain: 'Clinical Hygiene & Ergonomics' },
  { id: 79, title: 'Quality of Hand Hygiene Performance: A Systematic Literature Review', url: 'https://www.researchgate.net/publication/395204702_Quality_of_Hand_Hygiene_Performance_A_Systematic_Literature_Review', domain: 'Clinical Hygiene & Ergonomics' },
  { id: 80, title: 'Grant Lamkin - NIFS Fitness Center Blog (Wrist Wrap & Lifting Biomechanics)', url: 'https://www.nifs.org/blog/author/grant-lamkin', domain: 'Clinical Hygiene & Ergonomics' },
  { id: 81, title: 'Airwaav Performance Biomechanics Blog', url: 'https://airwaav.com/blogs/news', domain: 'Clinical Hygiene & Ergonomics' },
  { id: 82, title: 'Combat & Conditioning Facility Equipment Standards 2026', url: 'https://gymyield.com/boxing-gym-financing/', domain: 'Clinical Hygiene & Ergonomics' },
  { id: 83, title: 'Effects of Resistance Training of Peripheral Muscles versus Respiratory Muscles (RCT)', url: 'https://www.researchgate.net/publication/323130233_Effects_of_Resistance_Training_of_Peripheral_Muscles_versus_Respiratory_Muscles_in_Institutionalized_Older_Adults_with_Sarcopenia_A_Randomized_Controlled_Trial', domain: 'Clinical Hygiene & Ergonomics' },
];
