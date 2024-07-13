import { z } from "zod";
//zod es la biblioteca que usaremos para la validacion de los datos del formulario

const plans = ["free", "basic", "medium", "pro"] as const;

export type Plans = (typeof plans)[number];

//Creamos un objeto con nombres, extrayendo de Plans cada uno de sus valores que se convertirian en variable
export const mappedPlans: { [key in Plans]: string } = {
  basic: "Basic",
  free: "Free",
  medium: "Medium",
  pro: "Pro",
};

export const userSchema = z
  .object({
    //z.object es como la creacion de un nuevo objeto en javascripts
    name: z
      .string()
      .min(3, {
        //colocamos el mismo nombre de los inputs del formulario a validar
        //declaramos que sera de estilo string y que debe contener un minimo de 3 caracteres
        message: "Nombre debe tener mas de 3 caracteres",
        //message sera el mensaje de error
      })
      .max(200, {
        //que debe contener un maximo de 3 caracteres
        message: "Nombre debe tener mas de 3 caracteres",
      }),
    email: z.string().email({
      //El metdo email ya por si es una funcion de zod que valida que sea un tipo de email el dato ingresado
      message: "Por favor ingresa un email valido",
    }),
    password: z.string().min(6, {
      message: "El password debe contener al menos 6 caracteres",
    }),
    confirmmPassword: z.string().min(6, {
      message: "El password debe contener al menos 6 caracteres",
    }),
    weight: z.string().refine((weight) => !isNaN(parseFloat(weight)), {
      //parseFloat() permite convertir una cadena que represente una cantidad numérica en un valor numérico en coma flotante
      //refine entrega el dato ingresado en el input y espera que se complete la logica que agregemos
      //El valor que recibimos (weight) lo convertimos en un float
      //Con isNaN funcion de javascripts, vemos si el float de weight es numerico o no
      //!Si no es numerico lanza el mensaje de error !isNaN 
      message: "Peso no es un numero",
    }),
    dateOfBirth: z.string().refine(dob => new Date (dob).toString() !== "Dato Invalido", {
      //refine entrega y espera que dob(dato que ingresa en el input), sea convertido a una nueva fecha
      //Luego traducida a string ya que es un objeto y que el resultado de esta sea diferente a Invalid Date
      message: "Por favor ingresa una fecha de nacimiento valida"
    }),
    plan: z.enum(plans, {
      errorMap: () => ({ message: "Por Favor Selecciona un plan" }),
    }),
  })
  .refine((data) => data.password === data.confirmmPassword, {
    //Con refine hacemos que teniendo todos los datos del formulario, compare el password con el confirmPassword
    //Sino son igual a la hora de enviar la informacion, mostrara el error en el campo de confirmPassword
    message: "Ambas claves deben coincidir",
    path: ["confirmmPassword"],
  });
