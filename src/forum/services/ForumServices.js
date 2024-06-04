import { appServerAxios } from "./http-common.js";

class ForumService {
    createQuestion(data) {
        return appServerAxios.post(`/questions/`, data);
    }

    // Tambahkan metode lain sesuai kebutuhan, misalnya:
    updateQuestion(questionId, data) {
        return appServerAxios.put(`/questions/${questionId}`, data);
    }

    deleteQuestion(questionId) {
        return appServerAxios.delete(`/questions/${questionId}`);
    }

    getQuestions(params) {
        return appServerAxios.get(`/questions/`, { params });
    }

    getQuestion(questionId) {
        return appServerAxios.get(`/questions/${questionId}`);
    }

    // Metode untuk answers dan comments
    createAnswer(data) {
        return appServerAxios.post(`/answers/`, data);
    }

    updateAnswer(answerId, data) {
        return appServerAxios.put(`/answers/${answerId}`, data);
    }

    deleteAnswer(answerId) {
        return appServerAxios.delete(`/answers/${answerId}`);
    }

    getAnswers(questionId, params) {
        return appServerAxios.get(`/answers/`, { params: { question_id: questionId, ...params } });
    }

    getAnswer(answerId) {
        return appServerAxios.get(`/answers/${answerId}`);
    }

    createComment(data) {
        return appServerAxios.post(`/comments/`, data);
    }

    updateComment(commentId, data) {
        return appServerAxios.put(`/comments/${commentId}`, data);
    }

    deleteComment(commentId) {
        return appServerAxios.delete(`/comments/${commentId}`);
    }

    getComments(answerId, params) {
        return appServerAxios.get(`/comments/`, { params: { answer_id: answerId, ...params } });
    }

    getComment(commentId) {
        return appServerAxios.get(`/comments/${commentId}`);
    }
}

export default new ForumService();
