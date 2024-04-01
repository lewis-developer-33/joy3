const {RuleEngine} = require('node-rules')

const checkEligibility = async ({nationality,age,income,grade,religion,orphan,sports,clubs}) => {
    const R = new RuleEngine();
    const adminRules = {
        nationality:"Kenyan",
        minAge:18,
        maxAge:23,
        maxIncome:20000,
        grades:['A','B'],
        religions:['Christian','Muslim']
    }

    const rule = [
        {
            condition: (R, fact) => {
            R.when(fact.nationality != adminRules.nationality);
            },
            consequence: (R, fact) => {
            fact.result = false;
            fact.reason = `Your nationality is not ${adminRules.nationality}` ;
            R.stop();
            },
        },
        {
            condition: (R, fact) => {
            R.when(fact.age < adminRules.minAge && fact.age > adminRules.maxAge);
            },
            consequence: (R, fact) => {
            fact.result = false;
            fact.reason = `Your age is not within our accepted range` ;
            R.stop();
            },
        },
        {
            condition: (R, fact) => {
            R.when(fact.income > adminRules.maxIncome);
            },
            consequence: (R, fact) => {
            fact.result = false;
            fact.reason = `Your family income is above ${adminRules.maxIncome}` ;
            R.stop();
            },
        },
        {
            condition: (R, fact) => {
            R.when(adminRules.grades[0] == R.grade || adminRules.grades[1] == R.grade);
            },
            consequence: (R, fact) => {
            fact.result = false;
            fact.reason = `Your grade is below our acceptance level` ;
            R.stop();
            },
        },
        {
            condition: (R, fact) => {
                R.when(adminRules.religions[0] == R.religion || adminRules.religions[1] == R.religion);
            },
            consequence: (R, fact) => {
            fact.result = false;
            fact.reason = `Your religion is not in our priorities` ;
            R.stop();
            },
        },
    ]


    R.register(rule);

    let fact = {
    age,
    grade,
    religion,
    income,
    nationality,
    orphan,
    sports,
    clubs
    };

    let messag

    /* Check if the engine blocks it! */
    R.execute(fact, (data) => {
    if (data.result !== false) {
        // console.log("Eligible for scholarship")
        messag = "Eligible for scholarship";
        return 'Elligible'
        
    } else {
        // console.log("Ineligible for scholarship:" + data.reason)
        messag =  "Ineligible for scholarship:";
        return "Ineligible"
        
    }
    });
    
    
}

const user = {
    nationality:"Kenyan",
    age:23,
    income:20,
    grade:'1',
    religion:"Christian",
    orphan:"Yes",
    sports:'Football',
    clubs:"Chess"
}

const sthsth = async () => {
    const result = await checkEligibility(user)
    console.log(result)
}

sthsth()