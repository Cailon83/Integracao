import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import api from "../services/api";

const Form = ({ endpoint, method, aluno }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Preencher os campos com os dados do aluno, caso haja um aluno a ser editado
  useEffect(() => {
    if (aluno) {
      reset(aluno); // Preenche o formulário com os dados do aluno
    }
  }, [aluno, reset]);

  const onSubmit = async (data) => {
    const formatData = {
      ...data,
      dataNascimento: new Date(data.dataNascimento)
    };
    try {
      if (method === "POST") {
        await api.post(endpoint, formatData);
      } else if (method === "PUT" && aluno) {
        await api.put(`${endpoint}/${aluno.id}`, data); // Atualiza o aluno
      }
      alert("Operação realizada com sucesso!");
      reset(); // Reseta os campos do formulário
    } catch (error) {
      alert("Erro ao realizar operação.");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Campo para ID, opcional para POST, mas necessário para PUT */}
      {method === "PUT" && (
        <div>
          <label>ID</label>
          <input
            type="text"
            {...register("id", { required: "O ID é obrigatório para atualizar" })}
            disabled
          />
          {errors.id && <p>{errors.id.message}</p>}
        </div>
      )}

      {/* Campos do formulário */}
      <div>
        <label>Nome</label>
        <input
          type="text"
          {...register("nome", { required: "O nome é obrigatório" })}
        />
        {errors.nome && <p>{errors.nome.message}</p>}
      </div>

      <div>
        <label>Etnia</label>
        <input
          type="text"
          {...register("etnia", { required: "A etnia é obrigatória" })}
        />
      </div>

      <div>
        <label>Data de Nascimento</label>
        <input
          type="date"
          {...register("dataNascimento", { required: "A data de nascimento é obrigatória" })}
        />
      </div>

      <div>
        <label>Cidade</label>
        <input
          type="text"
          {...register("cidade", { required: "A cidade é obrigatória" })}
        />
      </div>

      <div>
        <label>Email</label>
        <input
          type="email"
          {...register("email", { required: "O email é obrigatório" })}
        />
      </div>

      <div>
        <label>Contato de Emergência</label>
        <input
          type="text"
          {...register("contatoEmergencia", { required: "O contato de emergência é obrigatório" })}
        />
      </div>

      <div>
        <label>Curso</label>
        <input
          type="text"
          {...register("curso", { required: "O curso é obrigatório" })}
        />
      </div>

      <button type="submit">{method === "POST" ? "Criar" : "Atualizar"}</button>
    </form>
  );
};

export default Form;

