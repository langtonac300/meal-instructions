import { CookTimeDatasheet, Appliance } from './types';

export interface DatasheetContent {
  sensoryCues: {
    visual: string;
    auditoryOrTactile: string;
    thermalMarker: string;
  };
  thermalScience: string;
  pasteurizationLethality?: string;
  equipmentCalibration: string;
  failureModes: {
    mistake: string;
    consequence: string;
    prevention: string;
  }[];
  restingPhysics: string | null;
  faqs: {
    q: string;
    a: string;
  }[];
}

/**
 * Returns deep culinary science, sensory doneness checkpoints, equipment calibration,
 * failure modes, and FAQs for any parametric cook-time datasheet.
 */
export function getDatasheetContent(sheet: CookTimeDatasheet): DatasheetContent {
  const foodLower = sheet.food.toLowerCase();
  const app = sheet.appliance;
  const isPoultry = foodLower.includes('chicken') || foodLower.includes('turkey');
  const isBeef = foodLower.includes('beef') || foodLower.includes('steak') || foodLower.includes('burger') || foodLower.includes('brisket');
  const isPork = foodLower.includes('pork') || foodLower.includes('bacon') || foodLower.includes('sausage') || foodLower.includes('ribs') || foodLower.includes('chop');
  const isSeafood = foodLower.includes('salmon') || foodLower.includes('fish') || foodLower.includes('shrimp') || foodLower.includes('cod') || foodLower.includes('tilapia') || foodLower.includes('tuna') || foodLower.includes('scallop');
  const isTuber = foodLower.includes('potato') || foodLower.includes('sweet potato') || foodLower.includes('squash');
  const isVegetable = !isTuber && (foodLower.includes('broccoli') || foodLower.includes('asparagus') || foodLower.includes('sprouts') || foodLower.includes('corn') || foodLower.includes('zucchini') || foodLower.includes('green bean') || foodLower.includes('cauliflower'));
  const isEgg = foodLower.includes('egg');

  // 1. Sensory Cues
  let visual = 'Surface turns deeply golden with caramelized edges; juices run completely clear when pierced.';
  let auditoryOrTactile = 'Firm to gentle pressure with slight elastic resistance; spring-back indicates set protein fibers.';
  let thermalMarker = sheet.internalTempTargetFormatted
    ? `Instant-read probe thermometer inserted into the geometric center reaches ${sheet.internalTempTargetFormatted}.`
    : `Visual and texture checkpoints confirm doneness: ${sheet.donenessCue}.`;

  if (isPoultry) {
    visual = 'Skin or exterior crust is deep golden-amber with active sizzling fat bubbles; juices run completely clear with zero red or pink hue.';
    auditoryOrTactile = 'Meat feels firm and springs back immediately when pressed with a finger; probe slides in with smooth, even resistance.';
    thermalMarker = `Calibrated digital instant-read probe reaches ${sheet.internalTempTargetFormatted ?? '165°F'} at the thickest part without touching bone.`;
  } else if (isBeef) {
    visual = 'A deep, continuous mahogany-brown Maillard crust across all seared faces, with rendered fat edges showing golden crispness.';
    auditoryOrTactile = 'Yields slightly under firm thumb pressure with resilient spring-back, matching the fleshy base of your palm below the thumb.';
    thermalMarker = `Digital thermocouple probe reads ${sheet.internalTempTargetFormatted ?? '135°F'} at the thermal geometric center prior to rest.`;
  } else if (isPork) {
    visual = 'Exterior displays rich golden-brown caramelization; interior pork loin/chop shows a delicate hint of blushing pink at the core.';
    auditoryOrTactile = 'Firm yet yielding when pressed; connective tissue has softened without becoming dry or chalky.';
    thermalMarker = `Center reads ${sheet.internalTempTargetFormatted ?? '145°F'} followed by an essential 3-minute resting carryover rise.`;
  } else if (isSeafood) {
    visual = 'Flesh transitions from raw translucency to opaque satin white/coral; delicate white albumin droplets just begin to emerge along muscle fibers.';
    auditoryOrTactile = 'Flakes effortlessly along natural connective laminations when pressed gently with the back of a fork.';
    thermalMarker = `Center of thickest fillet reaches ${sheet.internalTempTargetFormatted ?? '125°F–145°F'}. Remove immediately to prevent albumin purge.`;
  } else if (isTuber) {
    visual = 'Skins are papery and crisp with caramelized blister patches; interior flesh expands and steams when gently squeezed.';
    auditoryOrTactile = 'A metal cake tester, fork, or knife tip glides into the center with absolutely zero tactile resistance.';
    thermalMarker = 'Internal thermal probe reads 205°F to 212°F, confirming complete amylose starch gelatinization.';
  } else if (isVegetable) {
    visual = 'Edges, florets, and tips show distinct blistered charring; chlorophyll transforms into a vibrant, neon green or deep bronze.';
    auditoryOrTactile = 'Fork tender at the thickest stem or stalk with crisp-tender (al dente) structural resistance.';
    thermalMarker = 'Pectin cell walls have softened above 183°F while maintaining pleasant cellular crunch.';
  } else if (isEgg) {
    visual = 'White albumen is 100% opaque, porcelain-smooth, and firmly set; shell slides off effortlessly following ice-bath thermal shock.';
    auditoryOrTactile = 'Egg feels solid and compact in hand; yolk achieves the specified viscosity from liquid gold to velvety fudge.';
    thermalMarker = 'Ovotransferrin (144°F) and ovalbumin (176°F) protein coagulation thresholds have been precisely achieved.';
  }

  // 2. Equipment Calibration
  let equipmentCalibration = `Ensure the ${app.replace(/-/g, ' ')} is thoroughly preheated for at least 5 to 10 minutes before loading food to establish stable radiant and convective heat.`;
  if (app === 'air-fryer') {
    equipmentCalibration = `Preheat the air fryer empty for 3 to 5 minutes at ${sheet.tempFormatted}. Check that the lower crumb drawer is clean of old grease to prevent acrid smoke. Ensure at least 5 inches of clearance behind the air fryer exhaust vent for unrestricted convective airflow.`;
  } else if (app === 'cast-iron') {
    equipmentCalibration = `Preheat the dry cast iron skillet over medium heat for a full 5 minutes until surface temperature reaches 425°F–475°F on an infrared thermometer. Add high-smoke-point oil (avocado or tallow) only 30 seconds before food contact to avoid thermal oil degradation.`;
  } else if (app === 'skillet') {
    equipmentCalibration = `Preheat stainless steel skillet until water droplets bead into mercury-like balls that dance across the surface (the Leidenfrost effect at 379°F). Add cooking oil and wait until it shimmers with fine ripples before laying down food.`;
  } else if (app === 'instant-pot') {
    equipmentCalibration = `Inspect silicone sealing ring to verify it is seated firmly in the lid track and free of food debris or cracks. Verify steam release valve is toggled firmly to the "Sealing" position. Ensure at least 1 cup of thin liquid (water or broth) is present in the stainless inner pot.`;
  } else if (app === 'oven' || app === 'sheet-pan') {
    equipmentCalibration = `Position the oven rack in the center position (or upper third for broiling/roasting). Allow the oven to preheat for at least 15 minutes beyond the initial chime so the structural steel walls absorb radiant thermal mass.`;
  } else if (app === 'grill') {
    equipmentCalibration = `Clean grates with a wire-free wooden scraper or twisted coil while hot. Establish a two-zone fire (direct searing flame on one side, zero-flame indirect zone on the other) to provide a safe landing zone when rendering fat flare-ups occur.`;
  } else if (app === 'smoker') {
    equipmentCalibration = `Warm smoker to ${sheet.tempFormatted} using kiln-dried hardwood chunks or clean food-grade wood pellets. Adjust intake and exhaust dampers until the chimney produces thin, faint, translucent blue smoke rather than thick white billowing clouds.`;
  } else if (app === 'slow-cooker') {
    equipmentCalibration = `Place the ceramic crock on a heat-safe surface. Ensure the exterior of the ceramic insert is completely dry before placing it inside the heating base. Never open the lid during the first 4 hours of cooking on LOW.`;
  }

  // 3. Thermal Science
  let thermalScience = `Cooking ${sheet.food} in the ${app.replace(/-/g, ' ')} at ${sheet.tempFormatted} balances surface dehydration against interior heat penetration.`;
  if (app === 'air-fryer') {
    thermalScience = `In the air fryer, forced high-velocity convection air strips away the insulating cold boundary layer of vapor surrounding ${sheet.food} (${sheet.cutOrPrep}). At ${sheet.tempFormatted}, surface water vaporizes within the first 3 to 4 minutes, allowing surface temperatures to rapidly exceed 300°F (149°C) and trigger the Maillard browning reaction while interior moisture remains sealed inside.`;
  } else if (app === 'cast-iron' || app === 'skillet') {
    thermalScience = `The heavy thermal mass of the pan transfers intense conductive energy directly into ${sheet.food} upon contact. At ${sheet.tempFormatted}, surface amino acids and reducing sugars rapidly cross-link into a deep caramelized crust without allowing the pan temperature to collapse.`;
  } else if (app === 'instant-pot') {
    thermalScience = `Under 10.15–11.6 PSI of saturated steam pressure inside the Instant Pot, the boiling point of liquid increases from 212°F to 239°F (115°C). This accelerated thermal environment breaks down tough collagen into gelatin in ${sheet.food} up to 70% faster than conventional braising while preventing moisture loss.`;
  } else if (app === 'oven' || app === 'sheet-pan') {
    thermalScience = `Steady ambient radiant heat at ${sheet.tempFormatted} ensures uniform heat penetration from all sides. The dry oven atmosphere encourages progressive surface caramelization without scorching, allowing ${sheet.food} (${sheet.cutOrPrep}) to cook through evenly to the core.`;
  } else if (app === 'grill') {
    thermalScience = `Direct infrared radiation from the heat source sears the exterior of ${sheet.food} at temperatures exceeding 500°F, while rendering fats vaporize on contact with flavorizer bars or coals, creating flavorful polycyclic aromatic hydrocarbons that season the meat.`;
  } else if (app === 'smoker') {
    thermalScience = `Low-and-slow convective smoke at ${sheet.tempFormatted} diffuses hardwood flavor into surface proteins. Nitric oxide in wood smoke bonds with myoglobin in the meat to produce a distinct pink smoke ring, while prolonged gentle heat slowly unwinds connective collagen into liquid gelatin.`;
  }

  // 4. Pasteurization Lethality
  let pasteurizationLethality = undefined;
  if (isPoultry) {
    pasteurizationLethality = 'USDA FSIS Table 7-log10 Salmonella reduction: 165°F instantaneous (<1 sec), 160°F held 14 sec, 155°F held 45 sec, or 150°F held 2.7 min. Pulling at 155°F–160°F with a 5-minute rest achieves full microbial safety while preventing dry, chalky muscle fibers.';
  } else if (isBeef) {
    pasteurizationLethality = 'USDA FSIS whole-muscle beef standard: Pathogenic bacteria (E. coli O157:H7) reside exclusively on exterior surfaces. High-heat searing instantly sanitizes the surface above 160°F, allowing interior steak cores to be safely enjoyed medium-rare (130°F–135°F) or medium (140°F–145°F).';
  } else if (isPork) {
    pasteurizationLethality = 'USDA FSIS pork guidelines: Trichinella spiralis is deactivated at 137°F. The official safe target is 145°F followed by a mandatory 3-minute rest, producing succulent pork with a tender blush of pink.';
  } else if (isSeafood) {
    pasteurizationLethality = 'FDA Food Code recommends an internal core temperature of 145°F for 15 seconds for wild finfish, or medium-rare (125°F–130°F) for sushi-grade salmon and tuna to preserve delicate omega-3 lipid chains and buttery texture.';
  }

  // 5. Failure Modes
  const failureModes = [
    {
      mistake: `Overcrowding or overlapping ${sheet.food} in the ${app.replace(/-/g, ' ')}`,
      consequence: 'Trapped steam creates a localized 212°F humidity barrier that prevents the Maillard reaction, leaving food pale, soggy, and rubbery.',
      prevention: 'Maintain at least 1/2-inch spacing between pieces. Cook in two sequential batches rather than crowding.',
    },
    {
      mistake: 'Flipping or moving the food too early in the cook cycle',
      consequence: 'Delicate surface proteins bond to the hot metal or grate, causing the exterior crust to tear away and stick when forced.',
      prevention: sheet.flipAtMinutes > 0
        ? `Wait until the calibrated ${sheet.flipAtMinutes}-minute mark before flipping; meat releases naturally once the crust dehydrates.`
        : 'Cook undisturbed without lifting or moving until the total cook window is complete.',
    },
    {
      mistake: sheet.internalTempTargetF ? 'Carving immediately out of the heat without resting' : 'Leaving food in the hot appliance after timer ends',
      consequence: sheet.internalTempTargetF
        ? 'Contracted muscle fibers violently expel up to 15% of free cellular moisture onto the cutting board, drying out the meat.'
        : 'Residual chamber heat continues baking food, drying out edges and over-softening delicate textures.',
      prevention: sheet.restMinutes > 0
        ? `Transfer to a warm plate or wire rack and rest uncovered for ${sheet.restMinutes} minutes before slicing.`
        : `Remove immediately from the hot vessel at the ${sheet.timeMinMinutes}-minute mark once doneness is confirmed.`,
    },
  ];

  // 6. Resting Physics
  const restingPhysics = sheet.restMinutes > 0
    ? `During the ${sheet.restMinutes}-minute resting period on a wire cooling rack, carryover thermal inertia conducts heat from the superheated outer crust into the cooler core, raising internal temperature by an additional +3°F to +7°F. Simultaneously, actin and myosin muscle proteins relax, allowing intracellular capillary pressure to normalize and reabsorb liquid juices.`
    : null;

  // 7. Targeted FAQs (5 high-value FAQs per datasheet)
  const faqs = [
    {
      q: `How do I know with certainty when ${sheet.food} is done in the ${app.replace(/-/g, ' ')}?`,
      a: sheet.internalTempTargetFormatted
        ? `Insert a digital probe thermometer into the geometric center of the thickest portion without contacting bone or fat pockets. When it reads ${sheet.internalTempTargetFormatted} (accounting for a ${sheet.restMinutes > 0 ? `${sheet.restMinutes}-minute rest carryover` : 'brief rest'}), it is safely done. Sensory cues: ${sheet.donenessCue}.`
        : `Check at the ${sheet.timeMinMinutes}-minute mark. It is finished when ${sheet.donenessCue}.`,
    },
    {
      q: `Can I cook ${sheet.food} directly from frozen instead of fresh?`,
      a: sheet.state === 'frozen'
        ? `This datasheet is already calibrated specifically for the rock-frozen state at ${sheet.tempFormatted} for ${sheet.timeFormatted}. Do not thaw beforehand.`
        : `Yes, if using convection (air fryer or oven). Add approximately 40% to 50% more cooking time and reduce temperature by 25°F for the first half of the cook to thaw the core safely before high-heat searing. Never cook frozen meat in a slow cooker.`,
    },
    {
      q: `What is the best way to reheat leftover ${sheet.food} without making it rubbery?`,
      a: app === 'air-fryer' || app === 'oven'
        ? `Reheat in an air fryer or toaster oven at 350°F for 3 to 5 minutes. The dry convective heat vaporizes surface moisture to restore original crispness, whereas microwaves steam the food and turn proteins rubbery.`
        : `Reheat gently in a covered skillet over medium-low heat with 2 tablespoons of water or broth to create gentle steam warming without drying out the interior.`,
    },
    {
      q: `Why did my ${sheet.food} take longer than ${sheet.timeMaxMinutes} minutes?`,
      a: `Cook time variances typically stem from: (1) cut thickness exceeding the standard calibration (${sheet.cutOrPrep}), (2) food loaded straight from a 34°F refrigerator into an un-preheated appliance, or (3) pan overcrowding trapping steam. Always use a calibrated digital thermometer as your final authority.`,
    },
    {
      q: `Should I use oil or cooking spray with ${sheet.food} in the ${app.replace(/-/g, ' ')}?`,
      a: sheet.oilSprayRequired
        ? `Yes. A light mist of high-smoke-point oil (avocado, canola, or ghee) provides the lipid medium necessary for rapid conductive heat transfer and crisp browning. Avoid aerosol sprays containing lecithin propellants in non-stick air fryers.`
        : `No added oil is required. The natural intramuscular fat in ${sheet.food} will render during cooking, providing all the lubricity and browning needed.`,
    },
  ];

  return {
    sensoryCues: {
      visual,
      auditoryOrTactile,
      thermalMarker,
    },
    thermalScience,
    pasteurizationLethality,
    equipmentCalibration,
    failureModes,
    restingPhysics,
    faqs,
  };
}
