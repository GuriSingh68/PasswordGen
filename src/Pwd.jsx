import React, { useState } from 'react'
import { useForm } from './useForm'
import { getRandomChar, getSpecialChar } from './util'

export const Pwd = () => {
    
    const [values,setValues] =useForm({
        length:6,
        capital:true,
        small:true,
        spc:false,
        number:false,
    })
    const [result,setResult] =useState("")
    const fieldsArray =[
        {
            field:values.capital,
            getChar: () => getRandomChar(65,90)
        },
        {
            field:values.small,
            getChar: () => getRandomChar(97,122)
        },
        {
            field:values.number,
            getChar: () => getRandomChar(48,57)
        },
        {
            field:values.spc,
            getChar: () => getSpecialChar()
        }
    ]
    const handleSubmit =(e) =>{
    e.preventDefault();
    let generatePassword="";
    const checkedFields = fieldsArray.filter(({
        field
    }) => field)

    for (let i=0;i<values.length;i++)
    {
        const index =Math.floor(Math.random()*checkedFields.length);
        const letter = checkedFields[index].getChar();

        if(letter){
            generatePassword+=letter
        }
    }
    if(generatePassword)
        {
            setResult(generatePassword)
        }
    }
    return (
        <div >
            <section>
                <div className='container'>
                    <form id='pg-form' onSubmit={handleSubmit}>
                        <div className='result'>
                            <label>   Generate Password   </label>
                            <input type="text" placeholder='Min 6 Char' id='result' readOnly value={result}/> 
                            <div className="clipboard">
                            </div>
                        </div>
                        <div className='field'>
                            <li>
                                <label htmlFor="length">  Length  
                                    <input type='number' min={6} max={10} id='length' name='length' value={values.length} onChange={setValues}/>
                                </label>
                            </li>
                            <li>
                                <label htmlFor="capital">  Capital Letters  
                                    <input type='checkbox' id='capital'name='capital' checked={values.capital} onChange={setValues}/> 
                                </label>
                            </li>
                            <li>
                                <label htmlFor="small">  Small Letters  
                                    <input type='checkbox' id='small' name='small' checked={values.small} onChange={setValues}/>
                                </label>
                            </li>
                            <li>
                                <label htmlFor="spc">  Specail Characters  
                                    <input type='checkbox' id='spc' name='spc' checked={values.spc} onChange={setValues}/>
                                </label>
                            </li>
                            <li>
                                <label htmlFor="number"> Number
                                    <input type='checkbox' id='number' name='number' checked={values.number} onChange={setValues}/>
                                </label>
                            </li>
                        </div>
                        <button type='submit'> Generate Password </button>
                    </form>
                </div>
            </section>
        </div>
    )
}
