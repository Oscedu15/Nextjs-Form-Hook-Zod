"use client";

import { SubmitHandler, useForm } from "react-hook-form";
//Importamos la libreria de react form

import { zodResolver } from "@hookform/resolvers/zod";
//@hookform/resolvers es un pluglins que nos permite agregar otras librerias a hookform, en este caso zod

import { mappedPlans, userSchema } from "@/validations/userSchema";
//Importamos la userSchema que creamos para las validaciones

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmmPassword: string;
  weight: string;
  plan: string;
  dateOfBirth: string;
};
//Establecemos un tipo de datos llamados inputs

function Home() {
  //Destructuramos de useForm la propiedad register, que usaremos para capturar el valor de los inputs
  //La propiedad handleSubmit la usaremos para hacer el envio de los datos del formulario
  //formState es como el estado general del formulario y buscamos su propiedad de errores
  //watch son los valores que tiene el formulario
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    //Le decimos a useForm los tipos de inputs que va a recibir <Inputs>
    resolver: zodResolver(userSchema),
  });

  //Del objeto mappedPlans lo vamos a recorer con un map, para  extraer su key como el valor
  const plansOptions = Object.entries(mappedPlans).map(([key, value]) => (
    //Ej: basic seria su key... "Basic seria su value",
    <option key={key} value={key}>
      {value}
    </option>
  ));

  console.log(errors);

//
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    //SubmitHandler es el tipo de dato que recibira para enviar la informacion, lo extraemos de useForm 
    //le declaramos los inputs que espera recibir
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center justify-center my-20">
      <div className="w-full max-w-xl h-[90vh] bg-slate-600 px-6 flex justify-center">
        <form
          className="flex justify-center items-center flex-col gap-y-2"
          // handleSubmit Esta función recibirá los datos del formulario si la validación del formulario es exitosa.
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* name */}
          <label htmlFor="name" className="text-white">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            className="border-2 border-white rounded-full"
            {...register("name")}
            //register es una funcion que nos da por si misma las propiedades name, onChange, value
          />
          {errors.name?.message && (
            <p className="text-sm text-red-600">{errors.name?.message}</p>
          )}
          {/* email */}
          <label htmlFor="email" className="text-white">
            Correo Electronico
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className="border-2 border-white rounded-full"
          />
          {errors.email?.message && (
            <p className="text-sm text-red-600">{errors.email?.message}</p>
          )}

          {/* password */}
          <label htmlFor="password" className="text-white">
            Clave
          </label>
          <input
            type="password"
            id="password"
            {...register("password")}
            className="border-2 border-white rounded-full"
          />
          {errors.password?.message && (
            <p className="text-sm text-red-600">{errors.password?.message}</p>
          )}

          {/* confirm password */}
          <label htmlFor="confirmPassword" className="text-white">
            Confirmar Clave
          </label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmmPassword")}
            className="border-2 border-white rounded-full"
          />
          {errors.confirmmPassword?.message && (
            <p className="text-sm text-red-600">
              {errors.confirmmPassword.message}
            </p>
          )}

          {/* Weight */}
          <label htmlFor="dateOfBirth" className="text-white">
            Fecha de Cumpleaños
          </label>
          <input
            type="number"
            {...register("dateOfBirth")}
            id="dateOfBirth"
            className="border-2 border-white rounded-full"
          />
          {errors.dateOfBirth?.message && (
            <p className="text-sm text-red-600">{errors.dateOfBirth.message}</p>
          )}
          {/* dateOfBirth */}
          <label htmlFor="weight" className="text-white">
            Peso
          </label>
          <input
            type="number"
            {...register("weight")}
            id="weight"
            className="border-2 border-white rounded-full"
          />
          {errors.weight?.message && (
            <p className="text-sm text-red-600">{errors.weight.message}</p>
          )}

          {/* plan */}
          <label className="text-white" htmlFor="plan">
            Plan
          </label>
          <select id="plan" {...register("plan")}>
            {plansOptions}
          </select>
          {errors.plan?.message && (
            <p className="text-sm text-red-600">{errors.plan.message}</p>
          )}

          <button
            className="bg-slate-800 w-full text-white rounded-lg"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="text-red-600">{JSON.stringify(watch(), null, 2)}</div>
    </div>
  );
}

export default Home;
