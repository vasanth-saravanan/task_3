import http from "../../http/http";
import CONSTS from '../../constants/consts';

export const getPosts = (pageNumber: number) => {
    return async (dispatch: any) => {
        try {
            const response: any = await http.get(`search_by_date?tags=story&page=${pageNumber}`);
            if (response && response.data) {
                const posts: Array<any> = response.data.hits.map((rs: any) => {
                    rs.key = (Math.random() * 1000000).toString()
                    return rs;
                });
                dispatch({ type: CONSTS.GET_POSTS, posts })
            }
        } catch (error) {
            throw new Error(error);
        }

    }
}