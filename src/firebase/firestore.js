import { app } from "./index";
import {
    getFirestore,
    collection,
    addDoc,
    where,
    query,
    orderBy,
    getDocs,
} from "firebase/firestore";
const db = getFirestore(app);
export const createDocument = async (object_collection, records) => {
    console.log('this is the information', records)
    return new Promise((resolve, reject) => {
        try {
            addDoc(collection(db, object_collection), records)
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    alert(error.code);
                    reject(error);
                });
        } catch (e) {
            reject(e);
        }
    });
};
export const retrieveDataWithFilter = async (
    object_collection,
    filter_object = null,
    order_object = null
) => {
    let q = query(collection(db, object_collection));

    if (filter_object != null && order_object != null) {
        q = query(
            collection(db, object_collection),
            where(filter_object.field, filter_object.operator, filter_object.value),
            orderBy(order_object.field, order_object.order)
        );
    } else if (filter_object != null) {
        q = query(
            collection(db, object_collection),
            where(filter_object.field, filter_object.operator, filter_object.value)
        );
    } else if (order_object != null) {
        q = query(
            collection(db, object_collection),
            orderBy(order_object.field, order_object.order)
        );
    }

    return new Promise((resolve, reject) => {
        try {
            getDocs(q)
                .then((data) => {
                    const result = [];
                    data.forEach((doc) => {
                        let res = { ...doc.data() };
                        if (!res.id) {
                            res.id = doc.id;
                        }
                        result.push(res);
                    });
                    resolve(result);
                })
                .catch((error) => {
                    alert(error.code);
                    reject(error);
                });
        } catch (e) {
            reject(e);
        }
    });
};