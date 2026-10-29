// All lines are original parody writing. Bosses are PARODY characters, not real quotes.
const FALLACIES={
"Appeal to Emotion":"Using feelings instead of evidence to win the point.",
"Moving the Goalposts":"Changing the standard of proof after it has been met.",
"Cherry-Picking":"Citing only the data that supports you.",
"Ad Hominem":"Attacking the person instead of the argument.",
"Circular Reasoning":"The conclusion is assumed in the premise.",
"Straw Man":"Misrepresenting an argument so it is easier to attack.",
"False Dilemma":"Pretending there are only two options.",
"Appeal to Authority":"Claiming something is true because an expert/celebrity said so.",
"Bandwagon":"Claiming something is true because many people believe it.",
"Slippery Slope":"Claiming one step inevitably leads to extreme outcomes.",
"Tu Quoque":"Dodging criticism by pointing out the other side's hypocrisy.",
"Red Herring":"Bringing up an irrelevant topic to distract."};
// Left claim: [claim, fallacy, strong, medium, weak, fallacyOption, troll]
const LEFT_POOL=[
["If you disagree with me, you're literally a bad person.","Ad Hominem","Whether I'm a bad person has no bearing on whether the policy works. Show me the data.","Let's talk about the policy, not my character.","That's kind of mean.","Well YOU'RE the bad person, so I win.","*plays sad violin on a kazoo*"],
["Everyone on my campus agrees, so it's settled.","Bandwagon","Popularity isn't proof. Plenty of popular ideas in history were wrong.","A survey of one campus isn't the whole country.","I don't think everyone agrees.","My group chat agrees with me, so I'm right.","Your campus also agreed the dining hall sushi was safe."],
["Rent is high, so we should just ban landlords.","False Dilemma","Supply shortages drive rent. Building more housing lowers prices; banning landlords removes rentals.","There are options besides banning landlords, like zoning reform.","That seems extreme.","Rent is high because of people like you.","I'll be your landlord. Rent is one compliment per month."],
["A professor said it on TikTok, so it's true.","Appeal to Authority","Credentials don't replace evidence. What study is the claim based on?","Experts disagree; show me the consensus data.","TikTok isn't always right.","My uncle is smarter than your professor.","I also saw a TikTok where a cat filed taxes."],
["If we allow any border enforcement, next it's total dystopia.","Slippery Slope","Nearly every nation enforces borders without becoming a dystopia. Where's the causal chain?","One step doesn't guarantee the extreme outcome.","That's a big jump.","If we don't, the world ends tomorrow.","Next you'll say speed bumps lead to martial law."],
["Capitalism has never helped anyone.","Cherry-Picking","Global extreme poverty fell from ~40% to under 10% as markets opened. You're ignoring most of the data.","Look at living standards over the last century.","I think it helped some people.","Socialism has never helped anyone either, so there.","Typed from your iPhone, comrade?"],
["You only believe that because you're privileged.","Ad Hominem","My background doesn't change whether the argument is true. Address the argument.","Let's focus on the reasoning, not who's saying it.","That's not fair.","You only believe YOURS because you're dumb.","Yes, I am privileged to be winning this debate."],
["Gun owners want violence, that's why they own guns.","Straw Man","Most owners cite hunting, sport, or self-defense. You're attacking a position they don't hold.","Have you asked a gun owner why they own one?","That's not what they say.","Well, anti-gun people want crime.","I own a water gun. Should I turn myself in?"],
["We need this policy because it's the right thing to do, because it's right.","Circular Reasoning","You've just restated the conclusion. What evidence shows it works?","Why is it right? Give reasons, not repetition.","That sounds circular.","It's wrong because it's wrong.","Spin harder, you'll achieve liftoff."],
["Fine, crime dropped, but that doesn't count because it should drop MORE.","Moving the Goalposts","You set the standard; it was met. Changing the bar now isn't an argument.","What would actually count as success for you?","You keep changing what counts.","Nothing you say counts either.","Goalposts so mobile they need a moving company."],
["Imagine the children crying! You have to agree.","Appeal to Emotion","Sympathy matters, but policies must be judged by outcomes. Does this measurably help kids?","Feelings aren't evidence of effectiveness.","That's sad, but...","Imagine MY children crying when you win.","*hands opponent a tissue with my campaign logo*"],
["Your side did something bad once, so you can't criticize anything.","Tu Quoque","Hypocrisy, even if real, doesn't make my criticism false. Respond to the point.","Two wrongs don't settle the argument.","That's a different topic.","Your side did worse!","I've also done bad things. Like enjoy this."],
["Let's not talk about the budget, let's talk about climate.","Red Herring","We can discuss climate next, but you're dodging the budget question. Answer it first.","That's a change of subject.","Wait, what about the budget?","Your climate opinion is dumb anyway.","Climate's great in here, someone's getting heated."],
["Billionaires exist, so the system is totally rigged for everyone.","False Dilemma","Inequality and mobility can coexist. Most billionaires are first-generation; the system has flaws, not total rigging.","Show data on mobility, not just the existence of rich people.","Not everyone feels rigged.","You're probably a billionaire shill.","Venmo me and I'll un-rig it."],
["Math is a social construct, so the test results don't matter.","Red Herring","Even if notation is human-made, 2+2=4 in every culture. Results still measure skill.","The scores still predict outcomes.","Math seems pretty real.","You're bad at math so you'd say that.","Then I constructed a 100 on this debate."],
["Studies show... well, the one study I liked shows...","Cherry-Picking","One study isn't consensus. What does the meta-analysis say?","Replication matters more than one result.","Is there only one study?","My study disproves your study, trust me.","My study shows I'm winning. n=1."]];
// Right: [claim, [option,respectGain,angerGain]x5]
const RIGHT_POOL=[
["What is a right, and where do rights come from?",[["Rights are just... vibes everyone agrees on!",10,15],["How DARE you ask that!",0,25],["Society decides, okay?!",8,15],["Um, the Constitution? Duh.",12,12],["You're just trying to trap me!",2,20]]],
["Can you define the term you keep using?",[["Everyone knows what it means!",5,18],["Defining things is oppressive.",0,25],["It means... good stuff.",6,15],["I'll google it later.",12,12],["Why are you so obsessed with definitions?!",3,22]]],
["If morality is subjective, why is anything wrong?",[["It's wrong because I feel it is!",8,15],["Stop asking hard questions!",0,25],["Because most people agree!",10,15],["That's a good question, actually.",15,10],["You sound like a cult leader.",2,22]]],
["Show me a single example where that policy worked as claimed.",[["Look it up yourself!",3,20],["Scandinavia! Probably.",10,14],["Facts are a tool of the system.",0,25],["I'd have to check.",14,10],["Why do you hate progress?",4,20]]],
["Is it possible you're wrong about this?",[["Never!",2,22],["Maybe, but you're wronger.",8,15],["That's literally violence.",0,25],["I suppose it's possible.",16,8],["Are YOU possibly wrong?!",8,16]]],
["What standard are you using to judge that?",[["My standard is being right.",6,16],["A standard? Ugh, so rigid.",4,20],["The vibes standard.",8,15],["Fairness, I guess?",13,11],["Standards are patriarchal.",0,25]]],
["You agreed earlier that X; doesn't that contradict Y?",[["I never said that!",2,22],["Context changed!",8,15],["Contradictions are valid.",4,18],["Hm, I need to think about that.",15,9],["Stop quoting me!",3,22]]],
["Why should anyone accept your premise?",[["Because it's obvious!",6,16],["Because I said so!",3,20],["Because science! (no source)",8,15],["Fair, let me rebuild it.",15,9],["Only bigots question premises.",0,25]]],
["Is a feeling the same thing as an argument?",[["Feelings ARE arguments!",4,20],["Don't invalidate me!",2,22],["Kind of, sometimes?",10,13],["No, I guess not.",16,8],["You're a robot.",3,20]]],
["What would change your mind?",[["Nothing, I'm right.",3,20],["A better vibe.",7,15],["A study I agree with.",10,13],["Strong evidence, honestly.",16,8],["Why change perfection?",4,18]]],
["Can you steelman my position?",[["Your position is evil, that's it.",2,22],["You want everyone to suffer?",4,20],["Something about tradition?",10,13],["You think order protects people.",16,8],["No. Next question.",3,22]]],
["Is your claim falsifiable?",[["What's falsifiable?",8,14],["Everything I say is true.",3,20],["That's a gotcha word!",2,22],["Probably should be.",14,10],["You're falsifiable!",4,20]]]];
const TRUMP_RANTS=[
["HE BREATHED NEAR A MICROPHONE AND MY HOUSEPLANTS DIED! This is the end of democracy, the weather, and brunch!","Folks, your plants died because you watered them with tears. Tremendous tears, the most ever. Very sad. Get a cactus!"],
["I saw a red hat in a parking lot and had to lie down in a dark room for nine hours!","Nine hours? Low energy. I'd have done it in four, the best four hours. Many people say it's a record."],
["His hand gestures are a secret code to control the tides!","The tides love me. Everybody knows. The ocean called me, very respectful. You, not so much."],
["I blame him for my Wi-Fi being slow AND my ex not texting back!","Your Wi-Fi is slow because it's YOUR Wi-Fi. My Wi-Fi is beautiful. Your ex? Smart person, frankly."],
["If he eats a cheeseburger, that's basically a war crime against salads!","Salads are losers. The cheeseburger is a winner. Two scoops, if you know what I mean."],
["He said 'tremendous' and I had an existential crisis in a Whole Foods!","You had a crisis in a Whole Foods? Expensive crisis. I'd build a better Whole Foods. Whole-er."],
["His tweets cause earthquakes, I've measured it with my feelings!","Your feelings aren't a seismograph, okay? I've got the best seismographs. They give me 10 out of 10."],
["Even his golf swing is fascist! The ball goes RIGHT!","The ball goes where I tell it. It's called talent. Your ball goes in the pond, sad!"],
["I'm moving to Canada! For the fourth time! I mean it this time!","Fourth time? Canada's sending you back. They called, they said 'please, no.' Very polite people."],
["His tan is a threat to the ozone layer!","The ozone layer is doing fantastic, thanks to me. Many scientists, crying, said 'Sir, thank you.'"],
["I screamed at the sky on Election Night and I'd do it again!","The sky didn't answer. The sky's on my side. Great sky. Blue, like your mood."],
["He used a straw and I've been personally victimized!","Paper straws, they dissolve! Like your argument. Plastic straw, like my winning streak: lasts forever."]];
const OPPONENTS={
left:[{name:"Skylar Woke-Hart",title:"Campus Activist",color:"#a78bfa"},{name:"Chad Narrativeson",title:"Cable Pundit",color:"#60a5fa"},{name:"Brynn Influenzer",title:"Lifestyle Influencer",color:"#f472b6"},{name:"Prof. Tenure McTheory",title:"Tenured Professor",color:"#34d399"},{name:"\"Destiny\" (PARODY)",title:"FINAL BOSS · Rapid-fire stat streamer",color:"#f59e0b",boss:true}],
right:[{name:"Hank Bootstrap",title:"Small-town Mechanic",color:"#ef4444"},{name:"Pastor Calm Reason",title:"Socratic Pastor",color:"#f97316"},{name:"Dr. Free Market",title:"Economist",color:"#eab308"},{name:"Ranger Constitution",title:"Rancher",color:"#84cc16"},{name:"\"Andrew Wilson\" (PARODY)",title:"FINAL BOSS · Calm Socratic questioner",color:"#dc2626",boss:true}]};
const BOSS_EXTRA={left:["*speaking at 400 wpm* Per my 37 open tabs, your point is statistically irrelevant, next.","I have a spreadsheet for this. And a spreadsheet for that spreadsheet."],right:["*sips coffee calmly* Define 'good.' Take your time. I'll wait.","So you agree that you can't ground that claim. Interesting."]};
