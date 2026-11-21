import { AZLesson, MemoryPalaceRoom, MindMapEdge, MindMapNode } from '../types';

export const INITIAL_AZ_CURRICULUM: AZLesson[] = [
  {
    id: 'lesson-A',
    letter: 'A',
    title: 'Anchoring & The Sensory Apple Test',
    subtitle: 'Calibrating your Mind’s Eye from Aphantasia (1) to Hyperphantasia (5)',
    category: 'Sensory & Vividness',
    difficulty: 'Foundation',
    durationMinutes: 12,
    simulatorType: 'sensory-apple',
    tagline: 'Discover your baseline imagery vividness and anchor visual contours with multi-sensory cues.',
    overview:
      'Every visualization journey begins with the classic Apple Test. Whether you initially see a faint conceptual outline or a photorealistic crimson fruit glistening with water droplets, mental imagery is a trainable neural skill. In Module A, you learn how to "anchor" a fleeting mental image by locking down its silhouette first, then layering surface reflectance, weight, and crisp acoustic crunch.',
    neuroscienceNote:
      'fMRI studies by Prof. Joel Pearson show that voluntary visual imagery activates primary visual cortex (V1) in a top-down cascade from the prefrontal cortex. Adding tactile and gustatory anchors recruits somatosensory networks that stabilize V1 firing.',
    steps: [
      {
        phase: 'Stage 1: Silhouette Lock',
        instruction: 'Close or soften your eyes. Place a simple dark-red sphere with a slight indentation at the top and base in the center of a dark velvet table.',
        breathingCue: 'Inhale (4s)',
        durationSec: 15,
        sensoryFocus: 'Contour & Geometry'
      },
      {
        phase: 'Stage 2: Surface & Chromatic Gradient',
        instruction: 'Paint the skin with a warm gradient: deep ruby red fading into golden-green near the stem, dotted with tiny pale lenticels.',
        breathingCue: 'Hold & Construct (4s)',
        durationSec: 20,
        sensoryFocus: 'Color & Texture'
      },
      {
        phase: 'Stage 3: Specular Light & Dewdrops',
        instruction: 'Shine a cool morning window light from the upper-left. Watch a single bead of cold condensation roll slowly down the curved cheek of the apple.',
        breathingCue: 'Exhale & Stabilize (6s)',
        durationSec: 20,
        sensoryFocus: 'Luminance & Specularity'
      },
      {
        phase: 'Stage 4: Cross-Section & Crisp Bite',
        instruction: 'Slice the apple cleanly in half. See the star-shaped core holding dark brown seeds, smell the tart-sweet mist, and hear the crisp acoustic snap.',
        breathingCue: 'Deep Focus',
        durationSec: 25,
        sensoryFocus: 'Multi-Sensory Fusion'
      }
    ],
    drillPrompt:
      'Use the interactive Sensory Apple Calibrator to dial Vividness Stage 1 → 5, then toggle "Close Eyes / Blindfold Mode" and hold Stage 5 in your mind for 15 seconds without losing the highlight.',
    keyTakeaways: [
      'Never force all details at once—build Silhouette → Light → Texture → Sensory Anchor.',
      'Your pupil actually constricts when you mentally visualize bright light on an object.',
      'Tactile weight ("feeling the apple in your palm") stops mental images from drifting.'
    ],
    quiz: {
      question: 'When a mental image keeps fading or drifting out of focus, what is the fastest way to stabilize it?',
      options: [
        'Strain your eyes harder against your closed eyelids',
        'Anchor the object with a non-visual sense like tactile weight, temperature, or sound',
        'Immediately switch to visualizing 10 different objects at once',
        'Eliminate all lighting and shadows from the scene'
      ],
      correctIndex: 1,
      explanation: 'Multi-sensory anchoring (parietal & somatosensory recruitment) gives the prefrontal cortex extra hooks to keep V1 visual representations stable.'
    }
  },
  {
    id: 'lesson-B',
    letter: 'B',
    title: 'Blueprinting & Spatial Boundaries',
    subtitle: 'Constructing crisp mental wireframes, proportions, and architectural grids',
    category: 'Spatial & 3D',
    difficulty: 'Foundation',
    durationMinutes: 14,
    simulatorType: 'rotation-3d',
    tagline: 'Before painting textures, master the glowing cyan blueprint of space.',
    overview:
      'Architects and industrial designers do not visualize finished marble first—they project glowing structural wireframes. Module B trains your dorsal visual stream ("the where/how pathway") to erect stable 3D bounding boxes, horizon lines, and proportion grids in mid-air.',
    neuroscienceNote:
      'Spatial blueprinting relies on the posterior parietal cortex and hippocampal grid cells, which can operate at high precision even in learners with low color vividness.',
    steps: [
      {
        phase: 'Step 1: Horizon & Origin Point',
        instruction: 'Project a single glowing cyan point 1 meter in front of your forehead, then extend a horizontal X-axis and vertical Y-axis.',
        breathingCue: 'Inhale (4s)',
        durationSec: 15,
        sensoryFocus: 'Spatial Coordinates'
      },
      {
        phase: 'Step 2: The 1-Meter Wireframe Cube',
        instruction: 'Extrude 8 glowing vertices and 12 neon edges to form a hollow cube floating at eye level. Walk your gaze along every edge.',
        breathingCue: 'Hold & Construct (4s)',
        durationSec: 20,
        sensoryFocus: 'Edge Permanence'
      },
      {
        phase: 'Step 3: Internal Subdivision',
        instruction: 'Slice the cube into 8 smaller sub-cubes using 3 intersecting planes of translucent glass.',
        breathingCue: 'Exhale & Stabilize (6s)',
        durationSec: 20,
        sensoryFocus: 'Proportional Subdivision'
      }
    ],
    drillPrompt:
      'Switch the 3D Simulator to "Wireframe Blueprint Mode", rotate the polyhedron to an oblique angle, hit Blindfold, and trace all vertices in your mind.',
    keyTakeaways: [
      'High-contrast glowing edges (cyan or gold on black) are easiest for the brain to hold.',
      'Always establish a bounding box before adding complex organic curves.',
      'Spatial imagery and object imagery use two distinct neural highways—train both.'
    ],
    quiz: {
      question: 'Which neural pathway processes spatial wireframes, proportions, and 3D object locations?',
      options: [
        'The Dorsal Stream (parietal "where/how" pathway)',
        'Broca’s speech production area only',
        'The olfactory bulb',
        'The spinal reflex arc'
      ],
      correctIndex: 0,
      explanation: 'The dorsal visual stream processes spatial relationships, geometry, and 3D coordinates independently of surface texture.'
    }
  },
  {
    id: 'lesson-C',
    letter: 'C',
    title: 'Color, Chroma & Synesthetic Saturation',
    subtitle: 'Amplifying mental pigment, neon luminescence, and emotional hue coding',
    category: 'Sensory & Vividness',
    difficulty: 'Foundation',
    durationMinutes: 15,
    simulatorType: 'afterimage',
    tagline: 'Turn washed-out sepia thoughts into high-dynamic-range technicolor.',
    overview:
      'Many people visualize in muted pastels or grayscale without realizing they have a "Chroma Gain" dial. Module C uses complementary retinal priming and synesthetic pairing (linking pitch and temperature to color) to flood V4 color areas of the visual cortex.',
    neuroscienceNote:
      'Visual area V4 handles color constancy and chromatic imagery. Pairing thermal cues (warmth for amber/crimson, icy chill for ultramarine) amplifies V4 blood-oxygen response.',
    steps: [
      {
        phase: 'Step 1: Monochrome to Electric Cobalt',
        instruction: 'Start with a matte gray sphere. Slowly inject glowing electric cobalt blue from its core until the surface radiates like Cherenkov light.',
        breathingCue: 'Inhale (4s)',
        durationSec: 15,
        sensoryFocus: 'Hue Injection'
      },
      {
        phase: 'Step 2: Complementary Split',
        instruction: 'Split the sphere into two orbiting droplets—one molten tangerine orange, the other deep abyssal teal—and watch their reflections tint each other.',
        breathingCue: 'Hold & Construct (4s)',
        durationSec: 20,
        sensoryFocus: 'Chromatic Contrast'
      },
      {
        phase: 'Step 3: Synesthetic Chord',
        instruction: 'Hear a warm cello chord as the orange droplet pulses, and a crystalline glass harp note as the cyan droplet shimmers.',
        breathingCue: 'Exhale & Stabilize (6s)',
        durationSec: 20,
        sensoryFocus: 'Auditory-Color Synesthesia'
      }
    ],
    drillPrompt:
      'Use the Afterimage & Chroma Trainer to gaze at the high-saturation complementary target for 20 seconds, then project the glowing afterimage onto a mental wall.',
    keyTakeaways: [
      'Self-illuminated (neon/bioluminescent) colors are easier to visualize than flat paint.',
      'Placing complementary colors side-by-side sharpens mental edge contrast.',
      'Linking temperature and sound to color creates deliberate synesthetic memory hooks.'
    ],
    quiz: {
      question: 'Why is it easier to visualize a glowing neon sign or stained glass window than a flat painted wall?',
      options: [
        'Self-luminous high-contrast stimuli strongly excite V4 and attention networks',
        'Flat walls do not exist in memory',
        'Neon colors require zero attention',
        'The brain cannot perceive blue'
      ],
      correctIndex: 0,
      explanation: 'Luminance contrast combined with high chromatic saturation recruits stronger attentional amplification in area V4.'
    }
  },
  {
    id: 'lesson-D',
    letter: 'D',
    title: 'Depth, Distance & Dolly Zoom',
    subtitle: 'Controlling focal length, parallax, and foreground-to-horizon depth planes',
    category: 'Spatial & 3D',
    difficulty: 'Foundation',
    durationMinutes: 15,
    simulatorType: 'guided-cinema',
    tagline: 'Become the cinematographer of your inner lens: macro bokeh to infinite horizon.',
    overview:
      'Flat mental pictures feel artificial because they lack parallax and depth of field. In Module D, you learn to separate your mental stage into three distinct planes—Foreground (30 cm), Midground (3 m), and Far Horizon (3 km)—and slide your mental camera smoothly across them.',
    neuroscienceNote:
      'Binocular disparity and motion parallax cues simulated in the intraparietal sulcus transform 2D mental sketches into immersive 3D environments.',
    steps: [
      {
        phase: 'Plane 1: Macro Foreground Focus',
        instruction: 'Hold a brass compass 20 cm from your eyes. Bring the engraved needle into razor-sharp focus while letting the distant mountain range blur into soft bokeh.',
        breathingCue: 'Inhale (4s)',
        durationSec: 18,
        sensoryFocus: 'Shallow Depth of Field'
      },
      {
        phase: 'Plane 2: Rack Focus to Horizon',
        instruction: 'Shift focal distance past the compass—now a blurred golden silhouette—until snow-capped peaks and distant pine ridges snap into crystal clarity.',
        breathingCue: 'Hold & Construct (4s)',
        durationSec: 18,
        sensoryFocus: 'Optical Rack Focus'
      },
      {
        phase: 'Plane 3: Lateral Parallax Glide',
        instruction: 'Slide your viewpoint 2 meters to the right: notice the close compass sweep rapidly left while the distant peaks barely shift.',
        breathingCue: 'Exhale & Stabilize (6s)',
        durationSec: 20,
        sensoryFocus: 'Motion Parallax'
      }
    ],
    drillPrompt:
      'Practice the "Rack Focus" toggle in the Inner Cinema Simulator, alternating between Macro Foreground and Infinite Horizon on every breath cycle.',
    keyTakeaways: [
      'Deliberate background blur (bokeh) saves working memory bandwidth while boosting realism.',
      'Motion parallax—slight lateral head movement in your mind—instantly creates 3D depth.',
      'Always place 3 depth planes in any guided visualization scene.'
    ],
    quiz: {
      question: 'How does deliberately blurring the background (mental bokeh) actually improve foreground object clarity?',
      options: [
        'It frees up limited visual working memory bandwidth to render high detail on the focal target',
        'It deletes the object from memory',
        'It turns off the prefrontal cortex',
        'It prevents color perception'
      ],
      correctIndex: 0,
      explanation: 'Visual working memory has finite capacity; concentrating resolution in the foveal focal zone mimics real human optics and sharpens detail.'
    }
  },
  {
    id: 'lesson-E',
    letter: 'E',
    title: 'Exaggeration & Emotional Encoding',
    subtitle: 'Harnessing the Von Restorff isolation effect for unforgettable mental imagery',
    category: 'Memory Architecture',
    difficulty: 'Foundation',
    durationMinutes: 16,
    simulatorType: 'memory-palace-mini',
    tagline: 'The brain forgets the ordinary in seconds—and remembers the absurd for decades.',
    overview:
      'Why do you forget where you placed your keys, yet remember a bizarre dream from years ago? The amygdala tags emotionally charged, humorous, gigantic, or kinetic imagery with norepinephrine, prioritizing it for long-term hippocampal consolidation. Module E teaches the "SMASHIN SCOPE" exaggeration rules.',
    neuroscienceNote:
      'The Von Restorff (isolation) effect and basolateral amygdala modulation boost synaptic plasticity when visual imagery violates mundane expectations.',
    steps: [
      {
        phase: 'Rule 1: Disproportionate Scale',
        instruction: 'Take an ordinary textbook concept—say, ATP cellular energy—and visualize a 12-foot glowing golden battery bench-pressing a giant mitochondrion.',
        breathingCue: 'Inhale (4s)',
        durationSec: 18,
        sensoryFocus: 'Scale Distortion'
      },
      {
        phase: 'Rule 2: Kinetic Collision & Humor',
        instruction: 'Make the image move! Watch the battery spark, tap-dance across a marble desk, and launch neon lightning bolts that spell "A-T-P".',
        breathingCue: 'Hold & Construct (4s)',
        durationSec: 20,
        sensoryFocus: 'Action & Absurdity'
      },
      {
        phase: 'Rule 3: Emotional Resonance',
        instruction: 'Feel the electric thrill, hear the stadium crowd roar, and smell ozone in the air.',
        breathingCue: 'Exhale & Stabilize (6s)',
        durationSec: 18,
        sensoryFocus: 'Amygdala Tagging'
      }
    ],
    drillPrompt:
      'Open the Memory Palace station preview and transform 3 boring study terms into absurd, animated, oversized 3D scenes.',
    keyTakeaways: [
      'Static, polite mental images evaporate; kinetic, exaggerated images stick.',
      'Multiply scale by 50x or shrink to microscopic size to trigger novelty detectors.',
      'Always include verb-driven interaction between the object and its environment.'
    ],
    quiz: {
      question: 'According to the Von Restorff effect, which mental image of "Photosynthesis" will be recalled best a week later?',
      options: [
        'A plain green leaf sitting quietly on a white table',
        'The printed word PHOTOSYNTHESIS in 12pt Times New Roman',
        'A giant sunglass-wearing sunflower gulping golden sunbeams through a neon straw and exhaling floating oxygen bubbles',
        'A gray square'
      ],
      correctIndex: 2,
      explanation: 'Bizarre, kinetic, personified imagery stands out in memory architecture and triggers emotional-novelty encoding.'
    }
  },
  {
    id: 'lesson-F',
    letter: 'F',
    title: 'Future Pacing & Kinesthetic Rehearsal',
    subtitle: 'Olympian & surgical motor-cortex simulation for peak real-world performance',
    category: 'Guided Imagery & Mastery',
    difficulty: 'Intermediate',
    durationMinutes: 18,
    simulatorType: 'guided-cinema',
    tagline: 'Rehearse complex skills in high-definition first-person before stepping on stage.',
    overview:
      'World-class concert pianists, neurosurgeons, and Olympic skiers spend hours in structured PETTLEP mental rehearsal (Physical, Environment, Task, Timing, Learning, Emotion, Perspective). Module F trains you to run real-time, first-person kinesthetic simulations that fire the premotor cortex identically to physical practice.',
    neuroscienceNote:
      'Pascual-Leone’s landmark Harvard piano study proved that mental motor rehearsal alone produces cortical map reorganization nearly matching physical finger training.',
    steps: [
      {
        phase: 'Phase 1: Environmental Calibration',
        instruction: 'Stand at the threshold of your performance arena (stage, studio, exam room, or court). Feel the floor beneath your shoes and hear the room acoustics.',
        breathingCue: 'Inhale (4s)',
        durationSec: 20,
        sensoryFocus: 'Environmental Immersion'
      },
      {
        phase: 'Phase 2: Real-Time 1st-Person Execution',
        instruction: 'Look out through your own eyes (associated view). Execute the skill at exact 1.0x real-world speed—feeling muscle tension, breath rhythm, and tool feedback.',
        breathingCue: 'Hold & Construct (4s)',
        durationSec: 25,
        sensoryFocus: 'Premotor Kinesthetics'
      },
      {
        phase: 'Phase 3: Adversity Recovery Loop',
        instruction: 'Visualize a sudden minor hiccup occurring—and watch yourself calmly breathe, adapt, and execute the recovery maneuver with total poise.',
        breathingCue: 'Exhale & Stabilize (6s)',
        durationSec: 20,
        sensoryFocus: 'Resilient Future Pacing'
      }
    ],
    drillPrompt:
      'Use the Guided Cinema pacer to run a 60-second real-time rehearsal of a presentation or skill you are teaching this week.',
    keyTakeaways: [
      'Never fast-forward motor rehearsal—1.0x real-time timing is critical for neural myelination.',
      'Rehearsing calm recovery from a mistake builds stronger confidence than rehearsing perfection alone.',
      'Use 1st-person perspective to feel kinematics, and 3rd-person to check posture.'
    ],
    quiz: {
      question: 'In the PETTLEP model of mental rehearsal, at what playback speed should you visualize a physical or speaking skill?',
      options: [
        '10x fast-forward so you finish in 5 seconds',
        '1.0x real-time speed matching actual physical execution',
        'Frozen as a single static photograph',
        'Backwards only'
      ],
      correctIndex: 1,
      explanation: 'Cerebellar and premotor timing circuits require authentic temporal pacing (1.0x speed) to coordinate real-world muscle firing.'
    }
  },
  {
    id: 'lesson-G',
    letter: 'G',
    title: 'Geometric Mandalas & Sacred Symmetry',
    subtitle: 'Holding multi-ring rotational symmetry and tessellations in working memory',
    category: 'Spatial & 3D',
    difficulty: 'Intermediate',
    durationMinutes: 16,
    simulatorType: 'mandala-geometry',
    tagline: 'Expand visual working memory span using radial symmetry and harmonic ratios.',
    overview:
      'Normal visual working memory holds only 3 to 4 disconnected items—unless you group them via geometric symmetry! Module G trains you to construct concentric mandalas, hexagonal lattices, and Flower-of-Life rings, allowing you to hold dozens of visual elements simultaneously with calm concentration.',
    neuroscienceNote:
      'Gestalt symmetry processing in the lateral occipital complex compresses redundant geometric information, multiplying effective visual span.',
    steps: [
      {
        phase: 'Ring 1: The Center Bindu & 4 Cardinal Petals',
        instruction: 'Ignite a golden center point, then unfold 4 symmetrical lotus petals pointing North, South, East, and West.',
        breathingCue: 'Inhale (4s)',
        durationSec: 16,
        sensoryFocus: '4-Fold Symmetry'
      },
      {
        phase: 'Ring 2: 8-Fold Counter-Rotating Lattice',
        instruction: 'Surround the inner cross with an outer ring of 8 crystalline triangles slowly rotating clockwise while the inner ring turns counter-clockwise.',
        breathingCue: 'Hold & Construct (4s)',
        durationSec: 22,
        sensoryFocus: 'Dual Counter-Rotation'
      },
      {
        phase: 'Ring 3: Breathing Expansion & Collapse',
        instruction: 'Expand the entire mandala into a 3D spherical dome as you inhale, and condense it back to a single brilliant star as you exhale.',
        breathingCue: 'Exhale & Stabilize (6s)',
        durationSec: 20,
        sensoryFocus: 'Harmonic Scaling'
      }
    ],
    drillPrompt:
      'Configure an 8-fold or 12-fold Mandala in the Sacred Geometry Simulator, synchronize your breathing with its pulse, then close your eyes and keep both rings spinning.',
    keyTakeaways: [
      'Symmetry acts as lossless data compression for your visual cortex.',
      'Counter-rotating concentric rings are the ultimate drill for sustained visual focus.',
      'Collapsing a complex mandala back to a single point trains voluntary mental clearing.'
    ],
    quiz: {
      question: 'Why can the human mind visualize a 12-pointed symmetrical mandala more easily than 12 randomly scattered dots?',
      options: [
        'The lateral occipital complex compresses symmetrical patterns into a single Gestalt rule',
        'Random dots are invisible to the retina',
        'Symmetry disables the visual cortex',
        'Circles do not require memory'
      ],
      correctIndex: 0,
      explanation: 'Symmetry allows the brain to encode one generative geometrical rule and mirror it across axes.'
    }
  },
  {
    id: 'lesson-H',
    letter: 'H',
    title: 'Hyper-Detail Zoom (Micro to Macro)',
    subtitle: 'Infinite-resolution zooming from planetary orbit down to cellular grain',
    category: 'Sensory & Vividness',
    difficulty: 'Intermediate',
    durationMinutes: 15,
    simulatorType: 'sensory-apple',
    tagline: 'Train your mind’s eye to procedural-generate fine texture as you zoom closer.',
    overview:
      'In weak visualization, zooming in on an object makes it blurry or blank. In Hyperphantasia (Module H), zooming closer triggers procedural texture generation—revealing wood grain, woven fabric fibers, microscopic crystalline facets, and atomic lattices.',
    neuroscienceNote:
      'High-resolution imagery recruits early foveal retinotopic cortex (V1/V2), whereas coarse imagery stays confined to higher-level ассоциаtive regions.',
    steps: [
      {
        phase: 'Zoom 1x: Full Object View',
        instruction: 'Visualize an ancient leather-bound atlas resting on an oak lectern.',
        breathingCue: 'Inhale (4s)',
        durationSec: 15,
        sensoryFocus: 'Macro Proportions'
      },
      {
        phase: 'Zoom 10x: Surface Grain & Gold Leaf',
        instruction: 'Zoom to 5 centimeters from the cover: see the cracked morocco leather pores, raised gilt lettering, and individual linen thread stitches.',
        breathingCue: 'Hold & Construct (4s)',
        durationSec: 20,
        sensoryFocus: 'Micro-Texture Generation'
      },
      {
        phase: 'Zoom 100x: Microscopic Fiber Canyon',
        instruction: 'Dive into a single gold-leaf letter until it becomes a gleaming metallic canyon of crystalline flakes reflecting warm candlelight.',
        breathingCue: 'Exhale & Stabilize (6s)',
        durationSec: 20,
        sensoryFocus: 'Procedural Detail Synthesis'
      }
    ],
    drillPrompt:
      'In the Sensory Calibrator, push the Detail & Micro-Texture slider to 100% and practice zooming from 3 meters away to 1 millimeter from the surface.',
    keyTakeaways: [
      'When zooming in, consciously "invent" micro-textures (pores, fibers, scratches) to engage V1.',
      'Imperfections (dust motes, wear marks, asymmetry) trick the brain into perceiving hyper-realism.',
      'Practice powers-of-ten zoom jumps both inward and outward.'
    ],
    quiz: {
      question: 'What visual trick immediately makes an imagined object look photorealistic during a close-up zoom?',
      options: [
        'Making the surface completely featureless and blank',
        'Adding subtle micro-imperfections like surface pores, scratches, dust motes, or woven grain',
        'Shrinking the object to a dot',
        'Turning off all light sources'
      ],
      correctIndex: 1,
      explanation: 'Micro-textures and natural imperfections recruit foveal V1 neurons that specialize in high-spatial-frequency detail.'
    }
  },
  {
    id: 'lesson-I',
    letter: 'I',
    title: 'Inner Cinema & Perspective Shifting',
    subtitle: 'Switching fluidly between 1st-person, 2nd-person empathic, and 3rd-person director views',
    category: 'Guided Imagery & Mastery',
    difficulty: 'Intermediate',
    durationMinutes: 15,
    simulatorType: 'guided-cinema',
    tagline: 'Master the 3 perceptual camera positions to amplify emotion or gain objective clarity.',
    overview:
      'Your inner camera is never bolted to the floor. Module I teaches perceptual position switching: Position 1 (through your own eyes—maximizes feeling), Position 2 (through the eyes of your student or audience—maximizes empathy), and Position 3 (the floating director camera—maximizes calm analytical insight).',
    neuroscienceNote:
      'Switching from 1st-person (egocentric) to 3rd-person (allocentric) imagery shifts activation from the insula/somatosensory cortex to the temporoparietal junction (TPJ).',
    steps: [
      {
        phase: 'Camera 1: Egocentric (1st Person)',
        instruction: 'Experience the scene from behind your own eyes. Look down and see your own hands gesturing as you explain a vivid idea.',
        breathingCue: 'Inhale (4s)',
        durationSec: 18,
        sensoryFocus: 'Egocentric Immersion'
      },
      {
        phase: 'Camera 2: Allocentric Director (3rd Person)',
        instruction: 'Float your camera 4 meters back and up to the ceiling corner. Observe yourself and the entire room objectively, noticing posture and energy flow.',
        breathingCue: 'Hold & Construct (4s)',
        durationSec: 18,
        sensoryFocus: 'Allocentric Bird’s-Eye'
      },
      {
        phase: 'Camera 3: Empathic Audience (2nd Person)',
        instruction: 'Step into the seat of a student listening to you. See yourself on stage through their eyes and feel how clear and inspiring your visual story is.',
        breathingCue: 'Exhale & Stabilize (6s)',
        durationSec: 20,
        sensoryFocus: 'Perspective Taking (TPJ)'
      }
    ],
    drillPrompt:
      'Use the Camera Angle selector in the Inner Cinema Simulator to cycle 1st → 3rd → 2nd person on the same scene.',
    keyTakeaways: [
      'Use 1st-person to intensify motivation and embodied skill rehearsal.',
      'Switch to 3rd-person director view whenever you need emotional detachment and strategic clarity.',
      'Use 2nd-person audience view before teaching any class to test how your visuals land.'
    ],
    quiz: {
      question: 'If a student feels overwhelmed by stage fright when visualizing a speech, which camera shift helps calm the amygdala while preserving rehearsal value?',
      options: [
        'Shifting from 1st-person to a calm 3rd-person "Director Camera" view from the back of the auditorium',
        'Closing the curtain and refusing to visualize',
        'Zooming in on the microphone at 1000x magnification',
        'Spinning the room at 500 RPM'
      ],
      correctIndex: 0,
      explanation: '3rd-person (allocentric) self-distancing engages the temporoparietal junction and prefrontal cortex to regulate emotional arousal.'
    }
  },
  {
    id: 'lesson-J',
    letter: 'J',
    title: 'Journey Method & Sequential Loci Pathways',
    subtitle: 'Linking ordered waypoints along real-world routes for effortless sequential recall',
    category: 'Memory Architecture',
    difficulty: 'Intermediate',
    durationMinutes: 16,
    simulatorType: 'memory-palace-mini',
    tagline: 'Turn every walk through your neighborhood into an indexed highway of knowledge.',
    overview:
      'While a static room holds a cluster of ideas, a Journey (Module J) encodes strict sequential order—perfect for memorizing keynote speeches, historical timelines, algorithms, or 26-step curricula. By binding each step to a fixed landmark along a familiar path, you never lose your place.',
    neuroscienceNote:
      'Hippocampal place cells and theta-phase precession naturally replay spatial trajectories in forward and reverse order.',
    steps: [
      {
        phase: 'Waypoint 1–3: Departure Threshold',
        instruction: 'Walk from your front door (Station 1) to the garden gate (Station 2) and the corner streetlamp (Station 3). Verify unobstructed sightlines between each.',
        breathingCue: 'Inhale (4s)',
        durationSec: 18,
        sensoryFocus: 'Path Continuity'
      },
      {
        phase: 'Directional Causal Chains',
        instruction: 'Have the image at Station 1 physically launch a projectile or beam of light toward Station 2 so your gaze is pulled forward automatically.',
        breathingCue: 'Hold & Construct (4s)',
        durationSec: 20,
        sensoryFocus: 'Vector Linking'
      },
      {
        phase: 'Reverse Walk Verification',
        instruction: 'Walk the route backwards from Station 5 to Station 1 in your mind’s eye to cement bidirectional random access.',
        breathingCue: 'Exhale & Stabilize (6s)',
        durationSec: 20,
        sensoryFocus: 'Reverse Replay'
      }
    ],
    drillPrompt:
      'Open the Memory Palace Lab and test a 5-station sequential walk in both forward and reverse order.',
    keyTakeaways: [
      'Never cross your own path in a Journey—loops cause station confusion.',
      'Ensure each station is distinct in elevation and lighting from its neighbors.',
      'Walking a journey backwards in your mind proves you have true random-access mastery.'
    ],
    quiz: {
      question: 'Why should you avoid crossing paths or reusing the same intersection twice in a single Memory Journey?',
      options: [
        'Spatial interference at shared intersections can cause your mental walk to branch onto the wrong sequence',
        'Hippocampal cells cannot turn left',
        'Streets cannot hold colors',
        'It makes the journey too short'
      ],
      correctIndex: 0,
      explanation: 'Distinct, non-intersecting trajectories prevent contextual interference in hippocampal place-cell replay.'
    }
  },
  {
    id: 'lesson-K',
    letter: 'K',
    title: 'Kinesthetic & Multi-Sensory Fusion',
    subtitle: 'Layering weight, thermal gradients, acoustics, and aroma onto visual forms',
    category: 'Sensory & Vividness',
    difficulty: 'Intermediate',
    durationMinutes: 15,
    simulatorType: 'sensory-apple',
    tagline: 'A 5-sense hologram is 10x more durable than a silent visual picture.',
    overview:
      'Vision is only 20% of an inner simulation. Module K teaches the "5-Channel Braid": braiding Visual Form + Tactile Weight/Texture + Acoustic Resonance + Olfactory Scent + Proprioceptive Balance into every mental construct.',
    neuroscienceNote:
      'Multisensory integration in the superior temporal sulcus and parietal association cortex creates supramodal representations that resist forgetting.',
    steps: [
      {
        phase: 'Channel 1 & 2: Sight + Heavy Tactile Mass',
        instruction: 'Visualize a sculpted sphere of polished obsidian in your open palm. Feel its surprising 5-kilogram density pressing into your skin and its icy mineral chill.',
        breathingCue: 'Inhale (4s)',
        durationSec: 18,
        sensoryFocus: 'Proprioceptive Weight'
      },
      {
        phase: 'Channel 3 & 4: Acoustic Ring + Scent',
        instruction: 'Tap the sphere with a silver tuning fork: hear a deep, resonant cathedral bell hum while smelling fresh rain on volcanic stone (petrichor).',
        breathingCue: 'Hold & Construct (4s)',
        durationSec: 20,
        sensoryFocus: 'Auditory & Olfactory Layering'
      },
      {
        phase: 'Channel 5: Full Holographic Lock',
        instruction: 'Toss the sphere gently 10 cm up and catch it—synchronizing the visual arc, the thud in your palm, and the fading bell resonance.',
        breathingCue: 'Exhale & Stabilize (6s)',
        durationSec: 20,
        sensoryFocus: '5-Channel Synchronization'
      }
    ],
    drillPrompt:
      'Activate all 5 Sensory Channels in the simulator and practice holding the synchronized multi-sensory impression for 3 breaths.',
    keyTakeaways: [
      'Olfaction (smell) has a direct, unfiltered superhighway to the limbic memory system.',
      'Proprioceptive weight ("how heavy is this idea?") grounds abstract concepts immediately.',
      'Synchronizing sound with visual motion locks both channels together.'
    ],
    quiz: {
      question: 'Which sensory modality bypasses the thalamic relay to connect directly with the amygdala and hippocampus, making it a powerful emotional memory trigger?',
      options: [
        'Olfaction (the sense of smell)',
        'Black-and-white edge detection',
        'Finger tapping',
        'Peripheral motion'
      ],
      correctIndex: 0,
      explanation: 'Olfactory signals project directly to the piriform cortex, amygdala, and entorhinal-hippocampal circuit.'
    }
  },
  {
    id: 'lesson-L',
    letter: 'L',
    title: 'Light, Shadow & Mental Raytracing',
    subtitle: 'Directing key lights, rim lighting, subsurface scattering, and cast shadows',
    category: 'Sensory & Vividness',
    difficulty: 'Intermediate',
    durationMinutes: 16,
    simulatorType: 'sensory-apple',
    tagline: 'Light defines volume—learn to move the sun inside your mind.',
    overview:
      'What separates a flat cartoon in your mind from a breathtaking 3D sculpture? Controlled illumination! In Module L, you take control of a movable Key Light, a warm Rim Light, and dynamic Cast Shadows, mentally "raytracing" how light wraps around curved and translucent surfaces.',
    neuroscienceNote:
      'Shape-from-shading algorithms in visual areas V3 and LOC instantly infer 3D curvature from luminance gradients and cast shadow boundaries.',
    steps: [
      {
        phase: 'Setup: Single Orbiting Key Light',
        instruction: 'Place a marble bust in a dark studio. Orbit a single warm golden spotlight 360° around it, watching the shadow nose sweep smoothly across the cheek.',
        breathingCue: 'Inhale (4s)',
        durationSec: 20,
        sensoryFocus: 'Dynamic Shadow Sweep'
      },
      {
        phase: 'Subsurface Scattering',
        instruction: 'Transmute the marble into translucent green jade with a bright light behind it—see the glowing emerald light scatter softly through the thinner edges.',
        breathingCue: 'Hold & Construct (4s)',
        durationSec: 20,
        sensoryFocus: 'Translucency & Glow'
      },
      {
        phase: 'Specular Caustics',
        instruction: 'Submerge the jade sculpture under clear sunlit ripples and watch dancing caustic webs of light shimmer across its base.',
        breathingCue: 'Exhale & Stabilize (6s)',
        durationSec: 20,
        sensoryFocus: 'Refractive Caustics'
      }
    ],
    drillPrompt:
      'Drag the Light Source Angle slider in the Sensory Calibrator from 0° to 360° and observe how the specular highlight and cast shadow move in opposite directions.',
    keyTakeaways: [
      'A single strong directional light source creates 10x more 3D depth than flat ambient light.',
      'Watching a shadow move across an object forces your brain to verify the object’s 3D geometry.',
      'Rim lighting (backlighting) separates dark objects from a dark mental canvas.'
    ],
    quiz: {
      question: 'When you move a mental light source clockwise around a sphere, how must the cast shadow behave to preserve 3D realism?',
      options: [
        'It sweeps clockwise on the exact opposite side of the sphere from the light source',
        'It disappears completely',
        'It stays frozen in place while the light moves',
        'It jumps inside the light bulb'
      ],
      correctIndex: 0,
      explanation: 'Consistent opposite-side shadow projection activates shape-from-shading circuits in area V3/LOC.'
    }
  },
  {
    id: 'lesson-M',
    letter: 'M',
    title: 'Memory Palaces (The Method of Loci)',
    subtitle: 'Designing multi-room architectural sanctuaries to store encyclopedic knowledge',
    category: 'Memory Architecture',
    difficulty: 'Intermediate',
    durationMinutes: 20,
    simulatorType: 'memory-palace-mini',
    tagline: 'Build a cathedral of the mind where every pillar, alcove, and statue holds wisdom.',
    overview:
      'From Cicero in ancient Rome to modern World Memory Champions, the Memory Palace (Method of Loci) is humanity’s highest-capacity cognitive technology. Module M teaches you how to architect multi-wing mental palaces with well-lit rooms, numbered stations (loci), and thematic wings for every subject you teach or study.',
    neuroscienceNote:
      'Maguire et al. (Nature Neuroscience) studied World Memory Champions and found they do not have unusual brain anatomy—90% simply engage hippocampal spatial navigation networks using the Method of Loci.',
    steps: [
      {
        phase: 'Wing Design: The Rule of 5 Stations per Room',
        instruction: 'Enter a sunlit octagonal hall. Assign Station 1 to the left of the entrance, Station 2 to the far-left alcove, Station 3 to the center dome, Station 4 to the far-right pillar, and Station 5 to the exit arch.',
        breathingCue: 'Inhale (4s)',
        durationSec: 22,
        sensoryFocus: 'Clockwise Architectural Indexing'
      },
      {
        phase: 'Locus Binding',
        instruction: 'Anchor your target concepts directly onto the physical materials of each station—carving, melting, or entangling the image with the furniture.',
        breathingCue: 'Hold & Construct (4s)',
        durationSec: 22,
        sensoryFocus: 'Structural Entanglement'
      },
      {
        phase: 'Aerial Blueprint Inspection',
        instruction: 'Rise above the roof of your Memory Palace as if it were made of crystal glass, viewing all 5 glowing stations simultaneously from above.',
        breathingCue: 'Exhale & Stabilize (6s)',
        durationSec: 20,
        sensoryFocus: 'Top-Down Survey Map'
      }
    ],
    drillPrompt:
      'Launch the full Memory Palace Architect in the Visual Sandbox, place or customize stations, and score 100% in Recall Walk Mode!',
    keyTakeaways: [
      'Always follow a consistent rule (e.g., clockwise from the doorway) so you never skip a station.',
      'Flood your Memory Palace with bright natural light—dark rooms produce hazy recall.',
      'Make the image physically interact with the station furniture (shattering, freezing, illuminating it).'
    ],
    quiz: {
      question: 'What did neuroimaging studies of World Memory Champions reveal as the primary secret behind their extraordinary recall?',
      options: [
        'They use spatial navigation networks (hippocampus/Method of Loci) to encode abstract information into mental rooms',
        'They were born with a double-sized visual cortex',
        'They repeat words silently without any imagery',
        'They avoid using colors or spatial locations'
      ],
      correctIndex: 0,
      explanation: 'Memory champions repurpose evolutionarily ancient hippocampal spatial maps to store symbolic and conceptual data.'
    }
  },
  {
    id: 'lesson-N',
    letter: 'N',
    title: 'Node-Link Mind Mapping & Radiant Thinking',
    subtitle: 'Translating linear notes into organic, color-coded radial neural constellations',
    category: 'Mind Mapping & Ideation',
    difficulty: 'Foundation',
    durationMinutes: 18,
    simulatorType: 'mind-map-mini',
    tagline: 'Think the way your neurons wire: radially, associatively, and visually.',
    overview:
      'Your brain does not think in bulleted lists—it fires in radiant associative networks. Module N combines classic Tony Buzan Mind Mapping rules (central emblem, curved organic branches, single keyword per node, color-coded domains) with 3D spatial constellation mapping.',
    neuroscienceNote:
      'Semantic networks in the temporal lobe organize concepts by associative proximity; radial visual layouts mirror cortical spreading activation and boost recall by 15–32%.',
    steps: [
      {
        phase: 'The Central Emblem',
        instruction: 'Place a vivid, multi-colored 3D icon at the center of your canvas representing the core thesis—never a plain text box.',
        breathingCue: 'Inhale (4s)',
        durationSec: 16,
        sensoryFocus: 'Central Hub Iconography'
      },
      {
        phase: 'Primary Arterial Branches',
        instruction: 'Grow 4 to 6 thick, tapering curved branches in distinct electric hues (Violet, Cyan, Emerald, Amber, Rose), each carrying a single evocative keyword and symbol.',
        breathingCue: 'Hold & Construct (4s)',
        durationSec: 20,
        sensoryFocus: 'Chromatic Branch Hierarchy'
      },
      {
        phase: 'Cross-Link Synapses',
        instruction: 'Draw glowing dashed arcs connecting distant sub-nodes across opposite sides of the map to spark novel creative synthesis.',
        breathingCue: 'Exhale & Stabilize (6s)',
        durationSec: 20,
        sensoryFocus: 'Associative Cross-Linking'
      }
    ],
    drillPrompt:
      'Open the Mind Map Studio in the Sandbox Lab, add new radial nodes, drag them into visual clusters, and test teaching a topic directly from your node graph.',
    keyTakeaways: [
      'Use one power keyword + one micro-icon per node to maximize associative freedom.',
      'Color-code each primary branch so your mind can recall an entire branch by its hue.',
      'Cross-links between distant branches are where breakthrough insights are born.'
    ],
    quiz: {
      question: 'Why does a radial Mind Map with distinct branch colors and icons outperform linear single-color text notes for whole-topic recall?',
      options: [
        'It engages both verbal-semantic and visuospatial memory channels simultaneously (Dual Coding Theory)',
        'It uses fewer colors',
        'It hides the relationships between concepts',
        'It forces the brain to read bottom-to-top only'
      ],
      correctIndex: 0,
      explanation: 'Allan Paivio’s Dual Coding Theory demonstrates that combining visual-spatial structure with verbal symbols creates two independent retrieval paths.'
    }
  },
  {
    id: 'lesson-O',
    letter: 'O',
    title: 'Object Permanence & Continuous Morphing',
    subtitle: 'Smoothly transforming 3D mental forms without dropping frames',
    category: 'Spatial & 3D',
    difficulty: 'Advanced',
    durationMinutes: 16,
    simulatorType: 'rotation-3d',
    tagline: 'Hold continuous topological transformations steady in the theater of the mind.',
    overview:
      'Most people’s mental imagery jumps in choppy slide-show cuts. Module O trains fluid 60-frames-per-second topological morphing: watching a solid bronze cube melt and fold smoothly into a hollow torus, then blossom into an origami crane without losing object permanence.',
    neuroscienceNote:
      'Continuous transformation imagery recruits area MT/V5 (motion-sensitive cortex) alongside parietal object-tracking networks.',
    steps: [
      {
        phase: 'Morph 1: Sphere to Torus (Donut)',
        instruction: 'Hold a glowing golden clay sphere. Press your thumbs gently into its north and south poles until they meet and open a smooth central ring, forming a spinning torus.',
        breathingCue: 'Inhale (4s)',
        durationSec: 20,
        sensoryFocus: 'Topological Continuity'
      },
      {
        phase: 'Morph 2: Torus to Coffee Mug',
        instruction: 'Keep the hole of the torus as the handle while pushing down one side of the ring to hollow out a steaming porcelain cup.',
        breathingCue: 'Hold & Construct (4s)',
        durationSec: 20,
        sensoryFocus: 'Homeomorphic Deformation'
      },
      {
        phase: 'Morph 3: Reverse Rewind',
        instruction: 'Smoothly rewind the transformation from steaming mug → golden torus → pristine sphere without a single jump cut.',
        breathingCue: 'Exhale & Stabilize (6s)',
        durationSec: 20,
        sensoryFocus: 'Frame-by-Frame Reversal'
      }
    ],
    drillPrompt:
      'Switch shapes in the 3D Simulator while mentally interpolating the intermediate frames between Cube, Octahedron, and Torus.',
    keyTakeaways: [
      'When an image "teleports" or cuts, slow down and visualize the elastic intermediate state.',
      'The classic topological morph (donut ↔ coffee cup) is the gold-standard exercise for area V5.',
      'Rewinding a morph in reverse locks in total control over mental motion.'
    ],
    quiz: {
      question: 'Which visual cortical region is specially recruited when you transition from static snapshots to smooth, continuous object morphing?',
      options: [
        'Area MT / V5 (visual motion complex)',
        'Primary auditory cortex (A1)',
        'Wernicke’s area',
        'The brainstem medulla'
      ],
      correctIndex: 0,
      explanation: 'Area MT/V5 computes continuous optical flow and smooth motion trajectories during both perception and mental simulation.'
    }
  },
  {
    id: 'lesson-P',
    letter: 'P',
    title: 'Photographic Flash & Afterimage Persistence',
    subtitle: 'Using tachistoscopic flash drills and retinal afterimages to ignite closed-eye sight',
    category: 'Sensory & Vividness',
    difficulty: 'Intermediate',
    durationMinutes: 15,
    simulatorType: 'afterimage',
    tagline: 'Bridge physical eyesight and the mind’s eye using retinal persistence and flash recall.',
    overview:
      'For learners who feel they see "only blackness" when they close their eyes, Module P is the breakthrough bridge. By combining complementary retinal afterimages with 500-millisecond Tachistoscopic Flash Grids, you train yourself to observe and extend real closed-eye visual glow into voluntary imagery.',
    neuroscienceNote:
      'Photoreceptor bleaching creates a real physiological signal on closed eyelids; observing and mentally steering that afterimage couples bottom-up V1 signals with top-down attention.',
    steps: [
      {
        phase: 'Drill 1: Retinal Fixation & Capture',
        instruction: 'Gaze steadily at the central fixation dot of the high-contrast target for 20 seconds without blinking or shifting your gaze.',
        breathingCue: 'Inhale (4s)',
        durationSec: 20,
        sensoryFocus: 'Retinal Fixation'
      },
      {
        phase: 'Drill 2: Closed-Eye Afterimage Steering',
        instruction: 'Close your eyes and watch the glowing complementary emblem float into view. Mentally zoom it larger and smaller by imagining it moving closer or farther.',
        breathingCue: 'Hold & Construct (4s)',
        durationSec: 20,
        sensoryFocus: 'Emmert’s Law Scaling'
      },
      {
        phase: 'Drill 3: Tachistoscopic Flash Recall',
        instruction: 'Trigger a 0.5-second Flash Pattern, close your eyes immediately, and read the symbols directly off your lingering iconic memory buffer.',
        breathingCue: 'Exhale & Stabilize (6s)',
        durationSec: 20,
        sensoryFocus: 'Iconic Memory Persistence'
      }
    ],
    drillPrompt:
      'Run both the 20s Retinal Afterimage Fixation and the 500ms Flash Grid Challenge inside the Afterimage Simulator!',
    keyTakeaways: [
      'By Emmert’s Law, an afterimage actually grows larger when you mentally project it onto a distant wall.',
      'In the first 500ms after a flash, examine the whole Gestalt pattern before naming individual parts.',
      'Re-igniting a fading afterimage by pulsing your breath builds voluntary V1 control.'
    ],
    quiz: {
      question: 'According to Emmert’s Law in visual neuroscience, what happens to the perceived size of a retinal afterimage when you mentally focus your gaze on a distant horizon versus close to your nose?',
      options: [
        'It appears significantly larger when projected onto a distant plane and smaller when focused close',
        'It turns completely upside down',
        'It vanishes instantly',
        'It changes into an audio tone'
      ],
      correctIndex: 0,
      explanation: 'Because the retinal angle is fixed, the visual cortex scales the perceived size of the afterimage proportionally to perceived focal distance.'
    }
  },
  {
    id: 'lesson-Q',
    letter: 'Q',
    title: 'Quantum Branching & Scenario Trees',
    subtitle: 'Visualizing parallel decision timelines and counterfactual futures side-by-side',
    category: 'Mind Mapping & Ideation',
    difficulty: 'Advanced',
    durationMinutes: 17,
    simulatorType: 'mind-map-mini',
    tagline: 'Hold three parallel futures in view simultaneously to make wiser strategic decisions.',
    overview:
      'Strategic thinkers, chess grandmasters, and systems architects don’t just visualize one future—they project a branching tree of parallel scenarios (Optimistic, Baseline, and Stress-Test) side-by-side in 3D space. Module Q teaches you to hold multi-branch decision corridors without collapsing prematurely into one tunnel.',
    neuroscienceNote:
      'Frontopolar cortex (Brodmann area 10) uniquely enables humans to maintain a primary mental simulation while exploring counterfactual branches in parallel.',
    steps: [
      {
        phase: 'The Bifurcation Nexus',
        instruction: 'Stand at a glowing crystal crossroads where three glass bridges diverge at 45° angles into the mist: Left (Bold Leap), Center (Steady Iteration), Right (Defensive Pivot).',
        breathingCue: 'Inhale (4s)',
        durationSec: 18,
        sensoryFocus: 'Tri-Corridor Layout'
      },
      {
        phase: 'Simultaneous Split-Screen Projection',
        instruction: 'Project floating holographic portals above all three bridges showing the 6-month outcome of each path playing simultaneously.',
        breathingCue: 'Hold & Construct (4s)',
        durationSec: 22,
        sensoryFocus: 'Parallel Counterfactuals'
      },
      {
        phase: 'Second-Order Ripple Inspection',
        instruction: 'Step halfway onto the strongest bridge and watch 3 secondary sub-branches sprout ahead, revealing hidden risks and opportunities.',
        breathingCue: 'Exhale & Stabilize (6s)',
        durationSec: 20,
        sensoryFocus: 'Second-Order Consequence Mapping'
      }
    ],
    drillPrompt:
      'Use the Mind Map Studio to build a 3-branch Scenario Tree for an upcoming project or lesson plan.',
    keyTakeaways: [
      'Spatializing options Left / Center / Right prevents cognitive tunneling on the first idea.',
      'Color-code risk vs. reward along each branch corridor.',
      'Always visualize at least two steps deep (second-order effects) before choosing a path.'
    ],
    quiz: {
      question: 'Which subregion of the prefrontal cortex allows humans to hold a primary plan in mind while simultaneously simulating alternative counterfactual branches?',
      options: [
        'Frontopolar cortex (Brodmann Area 10)',
        'Primary motor strip (M1)',
        'Spinal cord dorsal horn',
        'Cochlear nucleus'
      ],
      correctIndex: 0,
      explanation: 'Brodmann Area 10 (the rostral prefrontal pole) coordinates cognitive branching and multitasking across alternative mental simulations.'
    }
  },
  {
    id: 'lesson-R',
    letter: 'R',
    title: 'Rotating 3D Mental Models (Shepard-Metzler)',
    subtitle: 'Tumbling chiral polyhedra, molecules, and assemblies across X, Y, and Z axes',
    category: 'Spatial & 3D',
    difficulty: 'Advanced',
    durationMinutes: 18,
    simulatorType: 'rotation-3d',
    tagline: 'Master the flagship cognitive test of engineers, surgeons, and architects.',
    overview:
      'In 1971, Roger Shepard and Jacqueline Metzler discovered that the time it takes to determine whether two 3D shapes match is strictly proportional to the angle of rotation between them—proving we literally rotate 3D models at a measurable angular velocity in our mind! Module R trains you to increase your angular rotation speed and accuracy without losing chiral orientation.',
    neuroscienceNote:
      'Mental rotation selectively activates the superior parietal lobule and motor hand representations—imagining grabbing and turning the object with your hands speeds rotation by 25%.',
    steps: [
      {
        phase: 'Axis 1: Yaw (Y-Axis Turntable)',
        instruction: 'Place an asymmetrical L-shaped block assembly on a glass turntable. Spin it smoothly 90° and 180° horizontally while tracking the protruding arm.',
        breathingCue: 'Inhale (4s)',
        durationSec: 18,
        sensoryFocus: 'Horizontal Yaw Rotation'
      },
      {
        phase: 'Axis 2: Pitch & Roll (X and Z Axes)',
        instruction: 'Reach into the scene with your imagined hands, grip the 3D structure, and tumble it 90° forward toward you, then 90° clockwise.',
        breathingCue: 'Hold & Construct (4s)',
        durationSec: 22,
        sensoryFocus: 'Hand-Coupled 3-Axis Tumble'
      },
      {
        phase: 'Mirror-Image (Chiral) Verification',
        instruction: 'Place a mirror beside the rotated block and distinguish the true rotated original from its non-superimposable mirror twin.',
        breathingCue: 'Exhale & Stabilize (6s)',
        durationSec: 20,
        sensoryFocus: 'Chirality Discrimination'
      }
    ],
    drillPrompt:
      'Use the 3D Mental Rotation Simulator to rotate the Chiral L-Block and Octahedron across X, Y, and Z axes, then test yourself in Blindfold Mode.',
    keyTakeaways: [
      'Mentally gripping the object with your hands recruits premotor circuits that stabilize 3D rotation.',
      'Pick one "anchor corner" plus two orthogonal vectors to track chirality during 180° flips.',
      'Shepard-Metzler rotation ability transfers directly to STEM, surgery, CAD, and molecular biology.'
    ],
    quiz: {
      question: 'What did Shepard and Metzler’s classic 1971 experiment prove about how humans compare two 3D objects at different angles?',
      options: [
        'Reaction time increases linearly with the angular difference, proving we rotate a continuous 3D analog model in mind',
        'Reaction time is 0 milliseconds regardless of angle',
        'Humans cannot recognize rotated cubes',
        'Rotation only happens in 2D text'
      ],
      correctIndex: 0,
      explanation: 'The linear relationship between rotation angle and response time was foundational proof that mental imagery uses analog spatial representations.'
    }
  },
  {
    id: 'lesson-S',
    letter: 'S',
    title: 'Symbolism & Archetypal Compression',
    subtitle: 'Compressing abstract philosophies, formulas, and laws into concrete visual totems',
    category: 'Memory Architecture',
    difficulty: 'Intermediate',
    durationMinutes: 16,
    simulatorType: 'memory-palace-mini',
    tagline: 'How do you visualize "Entropy", "Recursion", or "Grace"? Turn abstractions into totems.',
    overview:
      'Visualizing an apple or a chair is straightforward—but how do you visualize abstract concepts like *Thermodynamic Entropy*, *Compound Interest*, *Constitutional Law*, or *Bayesian Updating*? Module S teaches Archetypal Symbol Compression: converting any invisible abstraction into a concrete, kinetic 3D emblem.',
    neuroscienceNote:
      'Concrete nouns activate both hemispheres (perceptual + verbal networks), whereas abstract nouns activate only left-hemisphere language areas unless translated into concrete visual symbols.',
    steps: [
      {
        phase: 'Step 1: Etymological & Functional Extraction',
        instruction: 'Take an abstract word (e.g., "Entropy" — spreading disorder). Ask: what physical action embodies this law?',
        breathingCue: 'Inhale (4s)',
        durationSec: 16,
        sensoryFocus: 'Concept-to-Action Translation'
      },
      {
        phase: 'Step 2: Totem Forging',
        instruction: 'Forge a concrete totem: an ornate crystalline hourglass shattering in slow motion as thousands of glowing fireflies scatter outward in every direction.',
        breathingCue: 'Hold & Construct (4s)',
        durationSec: 20,
        sensoryFocus: 'Symbolic Emblem Forging'
      },
      {
        phase: 'Step 3: Quantitative Attribute Binding',
        instruction: 'Encode parts of the formula directly into the totem: a golden "S" carved on the frame and Boltzmann’s key floating at the waist of the hourglass.',
        breathingCue: 'Exhale & Stabilize (6s)',
        durationSec: 20,
        sensoryFocus: 'Formulaic Embedding'
      }
    ],
    drillPrompt:
      'Pick 3 abstract concepts from your field and design concrete 3D totems for them inside your Memory Palace or Mind Map.',
    keyTakeaways: [
      'Never leave an abstract word as floating text—always forge a concrete physical object + action.',
      'Use classical archetypes (scales, keys, hourglasses, bridges, furnaces, mirrors) as base vessels.',
      'Embed variables or numbers as physical features (colors, pillars, crowns) on the totem.'
    ],
    quiz: {
      question: 'Why are concrete words ("lighthouse", "anvil") naturally remembered better than abstract words ("epistemology", "variance") unless we use Symbolic Compression?',
      options: [
        'Concrete words automatically trigger sensory-perceptual imagery alongside verbal code (the Concreteness Effect)',
        'Abstract words have too few letters',
        'The brain deletes all nouns',
        'Concrete words are never used in science'
      ],
      correctIndex: 0,
      explanation: 'The Concreteness Effect in cognitive psychology shows that dual verbal + visual representation doubles recall probability.'
    }
  },
  {
    id: 'lesson-T',
    letter: 'T',
    title: 'Timeline Landscapes & Spatial Chronology',
    subtitle: 'Laying out history, roadmaps, and life chapters as navigable 3D terrains',
    category: 'Memory Architecture',
    difficulty: 'Intermediate',
    durationMinutes: 16,
    simulatorType: 'mind-map-mini',
    tagline: 'Transform flat calendars and historical dates into panoramic 3D valleys and bridges.',
    overview:
      'Time is invisible until we map it onto space. Individuals with spatial-sequence synesthesia naturally see centuries and months arranged as 3D ribbons or architectural corridors around their bodies. Module T teaches you to construct a permanent 3D Timeline Landscape where eras have distinct biomes, elevations, and landmarks.',
    neuroscienceNote:
      'Hippocampal "time cells" and "place cells" overlap extensively; mapping temporal sequences onto spatial landscapes unifies episodic and spatial memory.',
    steps: [
      {
        phase: 'Biome Zoning by Era',
        instruction: 'Divide a panoramic valley into distinct climatic zones: Ancient Foundations (sunlit terracotta canyon), Renaissance (marble canal bridge), Modern Era (neon glass metropolis).',
        breathingCue: 'Inhale (4s)',
        durationSec: 18,
        sensoryFocus: 'Chronological Biome Coding'
      },
      {
        phase: 'Milestone Monoliths',
        instruction: 'Erect towering mile-marker monoliths at regular intervals along the central highway, placing vivid event dioramas at each milestone.',
        breathingCue: 'Hold & Construct (4s)',
        durationSec: 20,
        sensoryFocus: 'Proportional Spacing'
      },
      {
        phase: 'Drone Flyover & Time Scrubbing',
        instruction: 'Soar high above the valley to see the entire century at a glance, then swoop down to street level at any single year.',
        breathingCue: 'Exhale & Stabilize (6s)',
        durationSec: 20,
        sensoryFocus: 'Macro-to-Micro Time Scrubbing'
      }
    ],
    drillPrompt:
      'Use the Mind Map / Whiteboard sandbox to sketch a 5-stage Spatial Timeline for a subject you teach.',
    keyTakeaways: [
      'Give each era or phase a distinct weather, lighting, and architectural style to prevent date confusion.',
      'Keep spatial distance proportional to time elapsed so your intuition grasps duration.',
      'Combine high-altitude drone overview with street-level diorama immersion.'
    ],
    quiz: {
      question: 'How does assigning distinct biomes and lighting conditions (e.g., snowy alpine pass vs. sunlit terracotta plaza) to different eras on a mental timeline improve recall?',
      options: [
        'It provides instant contextual era-tagging so events cannot drift into the wrong century or phase',
        'It erases the order of events',
        'It makes all centuries look identical',
        'It removes spatial coordinates'
      ],
      correctIndex: 0,
      explanation: 'Distinct environmental contexts prevent temporal source confusion in hippocampal episodic memory.'
    }
  },
  {
    id: 'lesson-U',
    letter: 'U',
    title: 'Unconscious Imagery & Hypnagogic Capture',
    subtitle: 'Surfing the theta-wave threshold (Edison & Dalí technique) for breakthrough visions',
    category: 'Guided Imagery & Mastery',
    difficulty: 'Advanced',
    durationMinutes: 17,
    simulatorType: 'mandala-geometry',
    tagline: 'Harvest hyper-vivid autonomous imagery from the twilight zone between waking and sleep.',
    overview:
      'Nikola Tesla, Salvador Dalí, Thomas Edison, and Kekulé (who discovered the benzene ring via a vision of an ouroboros snake) all used controlled hypnagogia. As brainwaves slow from Alpha (8–12 Hz) to Theta (4–7 Hz), the prefrontal censor relaxes and spontaneous, hyper-vivid geometric and symbolic imagery floods the visual cortex.',
    neuroscienceNote:
      'MIT Media Lab’s Dormio research confirmed that targeted incubation at the N1 hypnagogic threshold boosts creative divergence and visual vividness by over 40%.',
    steps: [
      {
        phase: 'Phase 1: Seed Question Incubation',
        instruction: 'Hold a single visual puzzle or creative question lightly in mind—like dropping a crystal seed into a quiet pond.',
        breathingCue: 'Inhale (4s)',
        durationSec: 18,
        sensoryFocus: 'Targeted Dream Incubation'
      },
      {
        phase: 'Phase 2: Passive Witnessing (No Steering)',
        instruction: 'Release deliberate control. Watch floating phosphenes and geometric clouds drift and self-assemble into unexpected forms without judging them.',
        breathingCue: 'Hold & Construct (4s)',
        durationSec: 22,
        sensoryFocus: 'Receptive Theta Observation'
      },
      {
        phase: 'Phase 3: The Dalí Key Capture',
        instruction: 'The instant a startling visual synthesis appears, snapshot its 3 core features and sketch or record it immediately into your Visual Journal.',
        breathingCue: 'Exhale & Stabilize (6s)',
        durationSec: 20,
        sensoryFocus: 'Immediate Retrieval Capture'
      }
    ],
    drillPrompt:
      'Turn on the 6Hz Theta Binaural Soundscape in Live Classroom or Mandala mode, soften your gaze, and observe spontaneous visual associations.',
    keyTakeaways: [
      'Active visualization builds structure; receptive (theta) visualization discovers novel combinations.',
      'Never judge or edit hypnagogic images while they are forming—observe like a wildlife photographer.',
      'Capture the image within 30 seconds on your whiteboard before waking interference erases it.'
    ],
    quiz: {
      question: 'What did MIT’s Dormio lab demonstrate about the N1 hypnagogic transition state (used by Edison and Dalí)?',
      options: [
        'Seeding a prompt right at the waking-to-theta threshold triggers hyper-associative visual imagery and creative breakthroughs',
        'The brain is completely inactive during N1',
        'Visual imagery is impossible when relaxed',
        'Only memorized phone numbers appear'
      ],
      correctIndex: 0,
      explanation: 'During N1 hypnagogia, default mode network connectivity expands while prefrontal inhibition drops, creating vivid associative imagery.'
    }
  },
  {
    id: 'lesson-V',
    letter: 'V',
    title: 'Visual Metaphor & Concept Storytelling',
    subtitle: 'Turning complex technical or philosophical lessons into unforgettable visual parables',
    category: 'Mind Mapping & Ideation',
    difficulty: 'Intermediate',
    durationMinutes: 18,
    simulatorType: 'guided-cinema',
    tagline: 'To teach anything clearly, project a movie into your students’ minds.',
    overview:
      'As an online visualization teacher, your superpower is translating complex ideas into instant visual metaphors. Einstein explained relativity with elevators and trains; Feynman explained quantum electrodynamics with spinning stopwatch arrows. Module V gives you the 4-part Visual Metaphor Forge for teaching.',
    neuroscienceNote:
      'Neural coupling studies (Uri Hasson, Princeton) show that when a teacher uses vivid sensory-motor metaphors, the listener’s visual and parietal cortices synchronize directly with the speaker’s brain.',
    steps: [
      {
        phase: 'Step 1: Strip the Jargon Skeleton',
        instruction: 'Identify the underlying mechanical relationship of the concept (e.g., bottleneck, feedback loop, filter, ratchet, symphony).',
        breathingCue: 'Inhale (4s)',
        durationSec: 16,
        sensoryFocus: 'Structural Isomorphism'
      },
      {
        phase: 'Step 2: Cast Everyday Tangible Actors',
        instruction: 'Map the invisible components onto tangible physical objects every student has touched (water pipes, locks and keys, lenses, pendulums).',
        breathingCue: 'Hold & Construct (4s)',
        durationSec: 20,
        sensoryFocus: 'Concrete Analog Mapping'
      },
      {
        phase: 'Step 3: The Twist Reveal',
        instruction: 'Run the metaphor forward until it reveals the surprising insight—and show students both the metaphor and the real system side-by-side.',
        breathingCue: 'Exhale & Stabilize (6s)',
        durationSec: 20,
        sensoryFocus: 'Dual-Screen Pedagogical Reveal'
      }
    ],
    drillPrompt:
      'Open the Instructor Studio or Whiteboard and design a visual metaphor for a topic you want to teach online today.',
    keyTakeaways: [
      'A great teaching metaphor shares the exact causal structure (isomorphism) of the target concept.',
      'Direct your students’ mental camera ("Picture a glass funnel in your left hand...") using concrete verbs.',
      'Brain-to-brain neural coupling peaks when you describe spatial motion and texture.'
    ],
    quiz: {
      question: 'According to Princeton neural-coupling research by Uri Hasson, when do a student’s and teacher’s brains synchronize most strongly?',
      options: [
        'When the teacher paints vivid, concrete spatial-sensory scenes and stories that the student simulates in their own visual cortex',
        'When the teacher reads abstract bullet points in a monotone voice',
        'When the screen is turned off and no words are spoken',
        'When only raw hexadecimal numbers are recited'
      ],
      correctIndex: 0,
      explanation: 'Vivid narrative and visual metaphors align temporal, parietal, and visual cortical oscillations between speaker and listener.'
    }
  },
  {
    id: 'lesson-W',
    letter: 'W',
    title: 'World-Building & Paracosm Architecture',
    subtitle: 'Constructing a persistent, self-consistent inner universe with its own geography and laws',
    category: 'Memory Architecture',
    difficulty: 'Advanced',
    durationMinutes: 20,
    simulatorType: 'memory-palace-mini',
    tagline: 'Move beyond single rooms—architect an entire inner continent of knowledge.',
    overview:
      'When individual Memory Palaces connect via roads, harbors, and sky-bridges, they form a **Paracosm**—a persistent inner world. Module W teaches you how to organize an entire lifelong curriculum into a navigable island archipelago: a Science Citadel on the northern peak, an Arts Conservatory by the western bay, and a Philosophy Observatory in the clouds.',
    neuroscienceNote:
      'Cognitive map hierarchies in the entorhinal-hippocampal system nest local room maps (fine grid cells) inside macro-scale regional maps (coarse grid cells).',
    steps: [
      {
        phase: 'Layer 1: The Planetary / Island Overview',
        instruction: 'Hover in the stratosphere above your personal Citadel Island. Establish the 4 cardinal districts and the central glowing spire that connects them all.',
        breathingCue: 'Inhale (4s)',
        durationSec: 20,
        sensoryFocus: 'Macro-Scale Cartography'
      },
      {
        phase: 'Layer 2: Transit Arteries',
        instruction: 'Connect the districts with unforgettable transit paths: a glass suspension bridge, a golden monorail, and a spiral staircase tower.',
        breathingCue: 'Hold & Construct (4s)',
        durationSec: 20,
        sensoryFocus: 'Inter-Palace Portals'
      },
      {
        phase: 'Layer 3: Seamless Scale Dive',
        instruction: 'Dive from the cloud view straight through the roof of the Central Library right down to a single open manuscript on Desk #1.',
        breathingCue: 'Exhale & Stabilize (6s)',
        durationSec: 22,
        sensoryFocus: 'Nested Hierarchy Navigation'
      }
    ],
    drillPrompt:
      'Explore all pre-built rooms in the Memory Palace Architect and link them into your own multi-room campus.',
    keyTakeaways: [
      'Nesting local rooms inside a master island map gives you unlimited lifelong storage capacity.',
      'Consistent compass orientation (North/South/East/West) binds separate palaces into one coherent world.',
      'Visiting your Paracosm for 3 minutes before sleep consolidates everything you learned that day.'
    ],
    quiz: {
      question: 'How does the brain’s entorhinal cortex represent both a 10-kilometer island overview and a 5-meter room simultaneously?',
      options: [
        'Through hierarchical grid cells arranged from coarse macro-scales to fine micro-scales along the hippocampal axis',
        'By deleting the room whenever you think of the island',
        'By storing everything as audio files',
        'It can only represent distances under 1 inch'
      ],
      correctIndex: 0,
      explanation: 'Ventral hippocampal-entorhinal grid cells encode large-scale geography while dorsal grid cells encode fine room-level coordinates.'
    }
  },
  {
    id: 'lesson-X',
    letter: 'X',
    title: 'X-Ray Vision & Cross-Sectional Anatomy',
    subtitle: 'Peeling back outer shells to visualize internal mechanisms, circuits, and flows in motion',
    category: 'Spatial & 3D',
    difficulty: 'Advanced',
    durationMinutes: 18,
    simulatorType: 'rotation-3d',
    tagline: 'See through solid walls and casings to watch internal gears, blood flow, and forces interact.',
    overview:
      'Nikola Tesla famously built and ran alternating-current motors inside his mind for weeks—then inspected their internal bearings for wear! Module X trains "Exploded View & X-Ray Visualization": turning opaque shells 70% translucent so you can watch internal mechanisms, fluid dynamics, or anatomical layers operate in real time.',
    neuroscienceNote:
      'Cross-sectional visualization combines dorsal spatial manipulation with ventral object part-decomposition in the intraparietal sulcus.',
    steps: [
      {
        phase: 'Mode 1: Opacity Slider (Solid → Ghost Shell)',
        instruction: 'Visualize a mechanical chronograph watch. Dial the outer gold case from 100% opaque down to 15% smoky glass so the spinning brass escapement wheel glows inside.',
        breathingCue: 'Inhale (4s)',
        durationSec: 20,
        sensoryFocus: 'Selective Transparency'
      },
      {
        phase: 'Mode 2: Exploded CAD Assembly',
        instruction: 'Slide the crystal, dial, hands, gear train, and mainspring outward along a central Z-axis so each layer floats 5 cm apart while still rotating in sync.',
        breathingCue: 'Hold & Construct (4s)',
        durationSec: 22,
        sensoryFocus: 'Axial Exploded View'
      },
      {
        phase: 'Mode 3: Clipping Plane Slice',
        instruction: 'Pass a glowing laser sheet through the center of the reassembled object to inspect its live cross-section from any angle.',
        breathingCue: 'Exhale & Stabilize (6s)',
        durationSec: 20,
        sensoryFocus: 'Dynamic Cross-Sectioning'
      }
    ],
    drillPrompt:
      'Toggle "X-Ray Internal Wireframe" and "Exploded Layer View" inside the 3D Simulator while rotating the model.',
    keyTakeaways: [
      'Use an imagined "Opacity Slider" (100% → 20%) to see inside enclosures without losing outer context.',
      'Exploded axial views allow you to inspect hidden interfaces without clutter.',
      'Color-code internal flows (e.g., red/blue pressure or electrical current) inside translucent housings.'
    ],
    quiz: {
      question: 'What is an "Exploded View" in technical and mental visualization?',
      options: [
        'Separating nested components along a shared axis in 3D space so every internal part is visible while preserving alignment',
        'Destroying the mental image so nothing remains',
        'Making the image 1 pixel wide',
        'Turning off spatial perception'
      ],
      correctIndex: 0,
      explanation: 'Exploded axial views preserve topological relationships and alignment while eliminating visual occlusion.'
    }
  },
  {
    id: 'lesson-Y',
    letter: 'Y',
    title: 'Yielding the Canvas (Void & Mental Stillness)',
    subtitle: 'Clearing visual noise, cognitive clutter, and intrusive imagery to restore pure contrast',
    category: 'Guided Imagery & Mastery',
    difficulty: 'Advanced',
    durationMinutes: 14,
    simulatorType: 'mandala-geometry',
    tagline: 'A master painter knows how to prime a clean, silent obsidian canvas at will.',
    overview:
      'Power without brakes is chaos. After intense visualization or a long day of screen work, the visual buffer can feel noisy, fragmented, or fatigued. Module Y teaches the "Obsidian Aperture": how to deliberately dissolve lingering imagery, quiet phosphene noise, and rest in effortless, spacious awareness before starting a fresh creation.',
    neuroscienceNote:
      'Voluntary alpha-band synchronization (10 Hz) over occipital cortex acts as an inhibitory gate that clears working memory buffers and restores signal-to-noise ratio.',
    steps: [
      {
        phase: 'Step 1: Dissolve into Stardust',
        instruction: 'Allow any objects currently on your mental stage to gently unbind into weightless golden motes that drift upward and vanish.',
        breathingCue: 'Inhale (4s)',
        durationSec: 18,
        sensoryFocus: 'Particle Dissolution'
      },
      {
        phase: 'Step 2: The Infinite Night Sky',
        instruction: 'Expand the periphery of your inner gaze outward to 180° peripheral vision—resting in a vast, cool, velvety midnight expanse.',
        breathingCue: 'Hold & Construct (4s)',
        durationSec: 20,
        sensoryFocus: 'Peripheral Panoramic Release'
      },
      {
        phase: 'Step 3: High-Contrast Readiness',
        instruction: 'Rest in effortless stillness for three breaths, noticing how fresh and luminous your mental canvas feels when a single tiny spark is invited back.',
        breathingCue: 'Exhale & Stabilize (6s)',
        durationSec: 20,
        sensoryFocus: 'Signal-to-Noise Reset'
      }
    ],
    drillPrompt:
      'Reduce the Mandala complexity to 1 ring, slow rotation to near zero, and practice softening your gaze from narrow foveal focus to wide peripheral stillness.',
    keyTakeaways: [
      'Switching from narrow foveal straining to wide 180° peripheral awareness immediately relaxes eye muscles and raises occipital Alpha waves.',
      'Always clear your mental canvas for 15 seconds between different teaching topics.',
      'True visualization mastery includes the ability to turn imagery completely off.'
    ],
    quiz: {
      question: 'How does shifting from narrow central staring to wide 180° peripheral awareness affect your visual system?',
      options: [
        'It relaxes extraocular tension, increases calming occipital Alpha waves, and clears working-memory clutter',
        'It causes instant visual fatigue',
        'It locks the eyes in a squint',
        'It prevents sleep'
      ],
      correctIndex: 0,
      explanation: 'Peripheral expansion down-regulates sympathetic arousal and refreshes visual working memory capacity.'
    }
  },
  {
    id: 'lesson-Z',
    letter: 'Z',
    title: 'Zenith Synthesis: Visualizing Everything from A to Z',
    subtitle: 'Integrating Mind Maps, Memory Palaces, 3D Models, and Guided Cinema into a unified superpower',
    category: 'Guided Imagery & Mastery',
    difficulty: 'Mastery',
    durationMinutes: 25,
    simulatorType: 'guided-cinema',
    tagline: 'The capstone synthesis: teach, design, remember, and create in full 5D mental space.',
    overview:
      'Welcome to Module Z—the Zenith of the A–Z Visualization School! Here you unite every single skill from A to Y into one seamless workflow: you capture an idea with **N** (Mind Mapping), compress its abstractions with **S** (Symbolism), inspect its mechanics in 3D with **R & X** (Rotation & X-Ray), light and texture it with **A, C, H, K, L**, store it permanently in **M & W** (Memory Palaces), and broadcast it into your students’ minds with **I & V** (Inner Cinema & Visual Metaphor).',
    neuroscienceNote:
      'Whole-brain integration couples the Default Mode Network (imagination), Executive Control Network (structural precision), and Salience Network (emotional resonance) in harmonic synchrony.',
    steps: [
      {
        phase: 'Synthesis 1: The Architect’s Hologram',
        instruction: 'Summon your personal Memory Palace Atrium (M). In the center floats a glowing 3D Mind Map constellation (N) connecting all 26 letters from A to Z.',
        breathingCue: 'Inhale (4s)',
        durationSec: 22,
        sensoryFocus: 'Palace + Constellation Integration'
      },
      {
        phase: 'Synthesis 2: Full-Spectrum Inspection',
        instruction: 'Reach out and pull any node toward you: watch it expand into a hyper-detailed (H), raytraced (L), multi-sensory (K), X-ray rotatable 3D model (R, X).',
        breathingCue: 'Hold & Construct (4s)',
        durationSec: 25,
        sensoryFocus: '5D Holographic Manipulation'
      },
      {
        phase: 'Synthesis 3: Teaching Transmission',
        instruction: 'Open the doors of your inner amphitheater and project your visual creation outward with crystal clarity so every student can see, feel, and understand it effortlessly.',
        breathingCue: 'Exhale & Stabilize (6s)',
        durationSec: 25,
        sensoryFocus: 'Pedagogical Transmission'
      }
    ],
    drillPrompt:
      'Complete the Capstone synthesis, test your full A–Z mastery on the Dashboard, and launch a Live Classroom session to teach your own visual lesson!',
    keyTakeaways: [
      'You now command the complete A-to-Z vocabulary of human visual thought.',
      'Combine structural tools (Blueprints, Mind Maps, Palaces) with sensory tools (Chroma, Light, Kinesthetics) for unshakable clarity.',
      'The ultimate test of visualization mastery is teaching another person to see what you see.'
    ],
    quiz: {
      question: 'In the Zenith Synthesis workflow, how do Mind Maps (N), 3D Models (R/X), and Memory Palaces (M) work together?',
      options: [
        'Mind Maps brainstorm and connect relationships, 3D Models simulate internal mechanics, and Memory Palaces store the entire system permanently in spatial architecture',
        'They are mutually exclusive and can never be combined',
        'Only one letter of the alphabet can be used per year',
        'They replace visual imagery with rote memorization'
      ],
      correctIndex: 0,
      explanation: 'Combining associative graphs (Mind Maps), mechanical simulations (3D rotation/X-Ray), and spatial indexing (Memory Palaces) creates a complete cognitive operating system.'
    }
  }
];

export const INITIAL_MIND_MAP_NODES: MindMapNode[] = [
  {
    id: 'node-center',
    label: 'A–Z Visual Mastery',
    subtitle: 'Core Mental Engine',
    x: 450,
    y: 270,
    color: '#8b5cf6',
    icon: 'Eye',
    notes: 'Central hub uniting Sensory Vividness, 3D Space, Memory Architecture, and Visual Teaching.'
  },
  {
    id: 'node-sensory',
    label: 'Sensory Vividness (A, C, H, K, L)',
    subtitle: 'Apple, Chroma, Light',
    x: 190,
    y: 120,
    color: '#ec4899',
    icon: 'Sparkles',
    notes: 'Dialing V1/V4 intensity from faint outlines to hyperphantasic 5-sense holograms.'
  },
  {
    id: 'node-spatial',
    label: '3D & Spatial (B, D, G, O, R, X)',
    subtitle: 'Blueprints, Rotation, X-Ray',
    x: 720,
    y: 120,
    color: '#06b6d4',
    icon: 'Box',
    notes: 'Dorsal stream mastery: wireframes, Shepard-Metzler 3D rotation, and exploded views.'
  },
  {
    id: 'node-memory',
    label: 'Memory Palaces (E, J, M, S, T, W)',
    subtitle: 'Loci, Journeys, Paracosms',
    x: 190,
    y: 420,
    color: '#f59e0b',
    icon: 'Landmark',
    notes: 'Hippocampal architecture for storing entire curricula in vivid rooms and timelines.'
  },
  {
    id: 'node-teaching',
    label: 'Visual Pedagogy (F, I, N, Q, V, Z)',
    subtitle: 'Metaphors & Inner Cinema',
    x: 720,
    y: 420,
    color: '#10b981',
    icon: 'Presentation',
    notes: 'Broadcasting crystal-clear visual simulations and mind maps to online students.'
  }
];

export const INITIAL_MIND_MAP_EDGES: MindMapEdge[] = [
  { id: 'e1', from: 'node-center', to: 'node-sensory', label: 'Ignites V1/V4' },
  { id: 'e2', from: 'node-center', to: 'node-spatial', label: 'Builds 3D Structure' },
  { id: 'e3', from: 'node-center', to: 'node-memory', label: 'Locks Long-Term' },
  { id: 'e4', from: 'node-center', to: 'node-teaching', label: 'Transmits to Students' },
  { id: 'e5', from: 'node-sensory', to: 'node-memory', label: 'Emotional Encoding' },
  { id: 'e6', from: 'node-spatial', to: 'node-teaching', label: 'Interactive Models' }
];

export const INITIAL_MEMORY_PALACE_ROOMS: MemoryPalaceRoom[] = [
  {
    id: 'room-atrium',
    name: 'The Grand Astral Atrium',
    theme: 'Sunlit Marble & Crystal Dome',
    description: 'Your primary 5-station entry hall for core foundational concepts (Modules A–E).',
    loci: [
      {
        id: 'locus-1',
        order: 1,
        stationName: 'Obsidian Fountain (Entrance Left)',
        targetConcept: 'A — Sensory Apple Anchoring',
        visualImage: 'A giant glowing ruby apple levitating above the fountain jet, spraying tart golden mist',
        sensoryAnchor: 'Crisp acoustic crunch + icy water spray',
        x: 22,
        y: 72,
        color: '#f43f5e'
      },
      {
        id: 'locus-2',
        order: 2,
        stationName: 'Vitruvian Archway (North-West)',
        targetConcept: 'B — Spatial Blueprinting',
        visualImage: 'Neon cyan laser beams weaving a rotating 3D wireframe cube between marble pillars',
        sensoryAnchor: 'Electric hum + cool ozone air',
        x: 24,
        y: 28,
        color: '#06b6d4'
      },
      {
        id: 'locus-3',
        order: 3,
        stationName: 'Prismatic Rose Window (Center Altar)',
        targetConcept: 'C — Chroma & Synesthesia',
        visualImage: 'Stained-glass rose window pouring liquid electric cobalt and molten amber rainbows onto the floor',
        sensoryAnchor: 'Warm cello chord vibrating in your chest',
        x: 50,
        y: 20,
        color: '#a855f7'
      },
      {
        id: 'locus-4',
        order: 4,
        stationName: 'Brass Telescope Balcony (North-East)',
        targetConcept: 'D — Depth & Dolly Zoom',
        visualImage: 'A telescope extending and retracting like an accordion, snapping distant peaks into razor focus',
        sensoryAnchor: 'Heavy brass gears clicking under your fingers',
        x: 78,
        y: 30,
        color: '#10b981'
      },
      {
        id: 'locus-5',
        order: 5,
        stationName: 'Golden Lion Throne (South-East Exit)',
        targetConcept: 'E — Exaggeration (Von Restorff)',
        visualImage: 'A 12-foot neon-maned lion juggling lightning-bolt batteries while wearing oversized sunglasses',
        sensoryAnchor: 'Stadium roar + warm golden fur',
        x: 76,
        y: 74,
        color: '#f59e0b'
      }
    ]
  },
  {
    id: 'room-observatory',
    name: 'The Celestial Geometry Observatory',
    theme: 'Starlit Copper & Orrery Rings',
    description: 'High-altitude rotunda dedicated to 3D rotation, mandalas, and X-ray assembly (Modules G, L, R, X).',
    loci: [
      {
        id: 'locus-obs-1',
        order: 1,
        stationName: 'Levitation Pedestal (West)',
        targetConcept: 'G — Sacred Mandala Symmetry',
        visualImage: '12 counter-rotating rings of lotus fire expanding and collapsing with every breath',
        sensoryAnchor: 'Harmonic Tibetan singing bowl chime',
        x: 25,
        y: 55,
        color: '#ec4899'
      },
      {
        id: 'locus-obs-2',
        order: 2,
        stationName: 'Gyroscopic Orrery (Center)',
        targetConcept: 'R — 3D Shepard-Metzler Rotation',
        visualImage: 'Interlocking chiral L-blocks tumbling smoothly across X, Y, and Z brass gimbals',
        sensoryAnchor: 'Smooth oiled gyroscope momentum in both hands',
        x: 50,
        y: 35,
        color: '#38bdf8'
      },
      {
        id: 'locus-obs-3',
        order: 3,
        stationName: 'Fluoroscope Workbench (East)',
        targetConcept: 'X — X-Ray & Exploded View',
        visualImage: 'A translucent sapphire mechanical watch floating in exploded layers along a green laser beam',
        sensoryAnchor: 'Rhythmic mechanical ticking at 240 BPM',
        x: 76,
        y: 55,
        color: '#34d399'
      }
    ]
  }
];
