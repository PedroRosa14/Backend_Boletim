import express from "express";
import {
  buscarAlunos,
  buscarAlunoId,
  adicionarAluno,
  atualizarAluno,
  deletarAluno,
} from "../controller/alunoController.js";

const router = express.Router();

router.get("/alunos", buscarAlunos);
router.get("/alunos/:id", buscarAlunoId);
router.post("/alunos", adicionarAluno);
router.put("/alunos/:id", atualizarAluno);
router.delete("/alunos/:id", deletarAluno);

export default router;