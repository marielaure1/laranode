import bcrypt from 'bcrypt'

export default class Hash{

    constructor(){
        this.salt = 10;
        this.bcrypt = bcrypt;
    }

    async hashData(data, saltCustom = false) {

        try{
            const salt = await this.bcrypt.genSalt(saltCustom ? saltCustom : this.salt)
            const hash = await this.bcrypt.hash(data, salt)

            return hash

        } catch(error){
            console.log(error.message);         
        }
    }

    async hashCompareData(data, dataToCompare, saltCustom = false) {

        try{
            const salt = await this.bcrypt.genSalt(saltCustom ? saltCustom : this.salt)
            const hash = await this.bcrypt.hash(data, salt)

            const compareData = await this.bcrypt.compare(dataToCompare, hash)

            return compareData

        } catch(error){
            console.log(error.message);         
        }
    }
}