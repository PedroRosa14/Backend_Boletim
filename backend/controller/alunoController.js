
// *** CORREÇÃO: Substitua esta URL pela URL da sua API no Render ***
const URL = "https://boletim-escolar-api.onrender.com";

export const useBoletim = create((set , get) => ({
    alunos:[],
    loading:false,
    error:null,
    atualAluno: null,

    formData: {
        nome:"",
        notamat:"",
        notaport:"",
        notahist:"",
        notamedia:"",
        url:""
    },

    setFormData: (formData) => set({formData}),
    resetForm: () => set({ formData: {nome: "", notamat:"", notaport:"", notahist:"", notamedia:"", url:"" }}),

    addAluno: async (e) => {
        e.preventDefault();
        set({loading:true});
        try {
            const {formData} = get();
            console.log("URL da requisição POST:", `${URL}/`); // Alterado para "/"
            await axios.post(`${URL}/`, formData); // Alterado para "/"
            await get().fetchAlunos();
            get().resetForm();
            console.log("Aluno adicionado com sucesso");
        } catch (error) {
            console.error("Erro ao adicionar aluno:", error);
        }finally{
            set({loading:false})
        }
    },

    fetchAlunos: async () => {
        set({loading:true});
        try {
            const response = await axios.get(`${URL}/`) // Alterado para "/"
            set({alunos:response.data.data});
            set({error: null});
        } catch (error) {
            console.error("Erro ao buscar alunos:", error);
            if (error.response && error.response.status === 429) {
                set({error: "Limite de requests excedido. Tente novamente mais tarde."});
            } else {
                set({error: "Erro interno do servidor ao buscar alunos."});
            }
        }finally{
            set({loading:false})
        }
    },

    fetchAlunoById: async (id) => {
        set({loading:true});
        try {
            const response = await axios.get(`${URL}/${id}`); // Alterado para "/${id}"
            set({atualAluno: response.data.data, formData: response.data.data, error:null,});
        } catch (error) {
            console.error("Erro ao buscar aluno por ID:", error);
            set({error: "Erro ao buscar aluno. Verifique o ID."});
            set({atualAluno: null, formData: get().resetForm()});
        }finally{
            set({loading:false})
        }
    },

    deleteAluno: async (id) => {
        set({loading:true});
        try {
            await axios.delete(`${URL}/${id}`); // Alterado para "/${id}"
            set(prev => ({ alunos: prev.alunos.filter(aluno => aluno.id !== id)}));
            console.log("Aluno deletado com sucesso");
        } catch (error) {
            console.error("Erro ao deletar aluno:", error);
        }finally{
            set({loading:false})
        }
    },

    updateAluno: async (id, dadosDoAluno) => {
        set({ loading: true });
        try {
            const response = await axios.put(`${URL}/${id}`, dadosDoAluno); // Alterado para "/${id}"
            set({ atualAluno: response.data.data });
            await get().fetchAlunos();
            console.log("Aluno atualizado com sucesso:", response.data.data);
            return response.data.data;
        } catch (error) {
            console.error("Erro ao atualizar aluno:", error);
            throw error;
        } finally {
            set({ loading: false });
        }
    },
}));