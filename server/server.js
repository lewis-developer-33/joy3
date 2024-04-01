const express = require("express")
const cors = require("cors")
const {RuleEngine} = require('node-rules')

const {User,Record,Nationality,Model} = require("./models/index")

const port = 8000
const app = express()

app.use(cors())
app.use(express.json())

Model.hasMany(Nationality)


app.listen(port,() => {
    console.log(`Server running on port ${port}`)
})

app.post('/sign-up',async (req,res) => {
    try {
        const {name,email,phone,pass} = req.body
        await User.create({name,email,phone,pass})
        const userFound = await User.findOne({where:{email}})
        res.json({message:userFound})
    } catch (error) {
        console.log(error.message)
        res.json({error:error.message})
    }
})

app.post('/log-in',async (req,res) => {
    try {
        const {email,pass} = req.body
        const userFound = await User.findOne({where:{email}})
        if (userFound.pass == pass){
            res.json({message:userFound})
        }
        else res.json({error:"Wrong details"})
    } catch (error) {
        console.log(error.message)
        res.json({error:error.message})
    }
})

const checkEligibility = async ({nationality,age,income,grade,religion,orphan,sports,clubs}) => {
    const R = new RuleEngine();
    const modelFound = await Model.findOne({where:{id:1}})
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
        return 'Inelligible'
    }
    });
    return messag
    
}

app.post('/apply',async(req,res) => {
    try {
        const {name,id,age,sports,clubs,grade,religion,orphan,income,nationality} = req.body
        const user = {nationality,age,sports,clubs,religion,orphan,income,grade}
        // console.log(grade) 
        const modelFound = await Model.findOne({where:{id:1}})
        console.log(modelFound)
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
            R.when(fact.nationality != "Kenyan")
            },
            consequence: (R, fact) => {
            fact.result = false;
            fact.reason = `Your nationality is not Kenyan` ;
            R.stop();
            },
        },
        {
            condition: (R, fact) => {
            R.when(fact.age < Number(modelFound.minAge) || fact.age > Number(modelFound.maxAge));
            },
            consequence: (R, fact) => {
            fact.result = false;
            fact.reason = `Your age is not within our accepted range` ;
            R.stop();
            },
        },
        {
            condition: (R, fact) => {
            R.when(fact.income > Number(modelFound.income));
            },
            consequence: (R, fact) => {
            fact.result = false;
            fact.reason = `Your family income is above ${modelFound.income}` ;
            R.stop();
            },
        },
        {
            condition: (R, fact) => {
                // R.grade > Number(modelFound.grade)
            R.when(R.grade < Number(modelFound.grade));
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
    R.execute(fact, async (data) => {
    if (data.result !== false) {
        // console.log("Eligible for scholarship")
        messag = "Eligible for scholarship";
        await Record.create({
            name,
            idNo:id,
            age,
            nationality,
            sport:sports,
            club:clubs,
            grade,
            religion,
            income,
            orphan,
            result: messag,
        })
        res.json({message:messag})
    } else {
        // console.log("Ineligible for scholarship:" + data.reason)
        messag =  "Ineligible for scholarship:";
        await Record.create({
            name,
            idNo:id,
            age,
            nationality,
            sport:sports,
            club:clubs,
            grade,
            religion,
            income,
            orphan,
            result: messag,
            reason:data.reason
        })
        res.json({message:messag})
    }
    });
        
        
        // res.json({message:result})
    } catch (error) {
        console.log(error.message)     
        // res.json({error:error.message})
    }
})

app.get('/records',async(req,res) => {
    try {
        const records = await Record.findAll()
        res.json({message:records})
    } catch (error) {
        console.log(error.message)
        res.json({error:error.message})
    }
})

app.put('/model',async(req,res) => {
    try {
        const {minAge,maxAge,income,grade} = req.body
        const modelFound = await Model.findOne({where:{id:1}})
        const newRecord = {
            minAge : minAge != null ? minAge : modelFound.minAge,
            maxAge : maxAge != null ? maxAge : modelFound.maxAge,
            income : income != null ? income : modelFound.income,
            grade : grade != null ? grade : modelFound.grade
        }
        modelFound.minAge = newRecord.minAge
        modelFound.maxAge = newRecord.maxAge
        modelFound.income = newRecord.income
        modelFound.grade = newRecord.grade

        modelFound.save()
        // await Model.create({
        //     minAge,
        //     maxAge,
        //     income,
        //     grade
        // })
        res.json({message:"Model updated"})
    } catch (error) {
        console.log(error.message)
        res.json({error:error.message})
    }
})

app.post('/model',async(req,res) => {
    try {
        const {minAge,maxAge,orphan,income,grade} = req.body
        const newRecord = {
            minAge ,
            maxAge ,
            orphan ,
            income,
            grade
        }
        await Model.create(newRecord)
        res.json({message:"Model created"})
    } catch (error) {
        console.log(error.message)
        res.json({error:error.message})
    }
})