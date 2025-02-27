import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { Firestore, getFirestore, DocumentData, collection, query, getDocs, QuerySnapshot, QueryDocumentSnapshot, QueryConstraint, orderBy, where, startAfter, limit, endBefore, limitToLast, doc, getDoc, DocumentSnapshot, setDoc, deleteDoc, getCountFromServer } from 'firebase/firestore';
import { ICategory } from '../models/category.model';
import { AuthService } from './auth.service';
import { ITEMS_PAGINATION } from '../constants';
import { TDirection } from '../types';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private afApp = inject(FirebaseApp)
  private database: Firestore = getFirestore(this.afApp)
  private authService = inject(AuthService);
  private http = inject(HttpClient)

  // signals
  public categoriesSignal: WritableSignal<ICategory[]> = signal<ICategory[]>([])
  public totalCategoriesSignal: WritableSignal<number> = signal<number>(0)
  public nextCategoriesSignal: WritableSignal<boolean> = signal<boolean>(false)
  public previousCategoriesSignal: WritableSignal<boolean> = signal<boolean>(false)
 
  // Primer y ultimo documento, para la paginacion
  private firstDocument?: DocumentData;
  private lastDocument?: DocumentData

getCategories(direction: TDirection = null) {
  // Obtenemos la coleccion
  const categoriesCollection = collection(this.database, 'categories');

   // Query base
   const queryConstraints = this.createQuery(direction);
 

  // Creamos la query final
  const queryCategories = query(
    categoriesCollection,
    ...queryConstraints
    
  );

  // Obtenemos las categorias

  return getDocs(queryCategories).then((querySnapshot: QuerySnapshot<DocumentData, DocumentData>) => {
    const categories: ICategory[] = [];
    // recorremos las categorias
    querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
      const data = doc.data() as ICategory;
      categories.push(data);
    })

    this.categoriesSignal.set(categories);
    this.totalCategories();

    // si estamos paginando actualizamos valores
    if (direction) {
      this.firstDocument = querySnapshot.docs[0];
      this.lastDocument = querySnapshot.docs[querySnapshot.docs.length - 1];

      this.nextCategoriesSignal.set(false);
      this.previousCategoriesSignal.set(false);

      this.hasData('next');
      this.hasData('previous');
    }
    return categories;
  });

}
 /**
   * Actualiza los signals relacionados con la paginacion
   * @param direction 
   */

private async hasData(direction: TDirection){
  // Obtenemos la coleccion
  const categoriesCollection = collection(this.database, 'categories');
  // Query base
  const queryHasDataContraints = this.createQuery(direction)

  // Creamos la query
  const queryHasData = query(
    categoriesCollection,
    ...queryHasDataContraints
  );
  // Obtenemos las categorias
  const dataDocs = await getDocs(queryHasData);
  // Obtenemos la longitud
  const hasData = dataDocs.docs.length > 0;

  switch (direction) {
    case 'next':
      this.nextCategoriesSignal.set(hasData);
      break;
    case 'previous':
      this.previousCategoriesSignal.set(hasData);
      break;
  }
}
 /**
   * Crea la query base
   * @param direction 
   * @returns 
   */

 
  private createQuery(direction: TDirection = null){
  // Obtenemos el usuario actual
  const user = this.authService.currentUser() as string;
  // Creamos la query base
  const queryConstraints: QueryConstraint[] = [
    orderBy('name', 'asc'),
    where("user", "==", user)
  ]

  if(direction){
    switch (direction) {
      case 'next':
        if (this.lastDocument) {
          // Mostrar registros despues del ultimo documento
          queryConstraints.push(startAfter(this.lastDocument))
        }
        // limite
        queryConstraints.push(limit(ITEMS_PAGINATION))
        break;
      case 'previous':
        if (this.firstDocument) {
          // Mostrar registros antes del ultimo documento
          queryConstraints.push(endBefore(this.firstDocument))
        }
        // limite
        queryConstraints.push(limitToLast(ITEMS_PAGINATION))
        break;
    }

  }
  return queryConstraints;
}
/**
   * Obtiene una categoria
   * @param idCategory 
   * @returns 
   */
getCategory(idCategory: string) {
  // obtenemos la referencia
  const categoryRef = doc(this.database, `categories/${idCategory}`)
  return getDoc(categoryRef).then((document: DocumentSnapshot<DocumentData, DocumentData>) => document.data() as ICategory)
}

  /**
   * Crea una categoria
   * @param category 
   */
  async createCategory(category: ICategory){
   // Obtenemos la coleccion
   const categoriesCollection = collection(this.database, 'categories');
   const newCategoryRef = doc(categoriesCollection)

    // pasamos el id de la nueva referencia
    category.id = newCategoryRef.id;
    category.user = this.authService.currentUser() as string; //aseguro que es un string
    category.createdOn = moment().format('YYYY-MM-DDTHH:mm:ss')

    // crea la categoria
     await setDoc(newCategoryRef, category);
  }

  /**
   * Actualiza una categoria
   * @param category 
   * @returns 
   */
  updateCategory(category: ICategory) {
    // obtenemos la referencia
    const categoryRef = doc(this.database, `categories/${category.id}`)
    // Actualiza la categoria
    return setDoc(categoryRef, category);
  }

  /**
   * Borra una categoria
   * @param idCategory 
   * @returns 
   */
  deleteCategory(idCategory: string) {
    // Obtenemos la referencia
    const categoryRef = doc(this.database, `categories/${idCategory}`)
    // Borramos la categoria
    return deleteDoc(categoryRef);
  }




/**
   * Obtiene el total de categorias
   */
 async totalCategories(){
    // Obtenemos la coleccion
    const categoriesCollection = collection(this.database, 'categories');
    // query base
    const queryTotal = this.createQuery();

     // creamos la query
    const queryTotalCategories = query(
      categoriesCollection,
      ...queryTotal
    );
    // Con getCountFromServer obtenemos el numero de registros
    const snapshot = await getCountFromServer(queryTotalCategories);
    this.totalCategoriesSignal.set(snapshot.data().count);
  
  }

  async categoryExists(name: string){
    const categoriesCollection = collection(this.database, 'categories');
    const user = this.authService.currentUser();
    const queryExists = query(
      categoriesCollection,
      where('name', '==', name),
      where('user', '==', user)
    )

    const querySnapshot = await getCountFromServer(queryExists);
    return querySnapshot.data().count > 0;

  }

  /**
   * Resetea la paginacion
   */
  resetPagination() {
    this.firstDocument = undefined;
    this.lastDocument = undefined;
    this.nextCategoriesSignal.set(false)
    this.previousCategoriesSignal.set(false)
  }


  /**
   * Resetea los valores
   */
  reset() {
   
    this.categoriesSignal.set([])
    this.totalCategoriesSignal.set(0)
    this.resetPagination();
   
   
  }

}
