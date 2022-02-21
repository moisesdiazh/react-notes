
// export const fileUpload = async(file) => {
    
//     //url de cloudinary
//     const cloudUrl = 'https://253546855865873:v5M0J22MsIyvYjsnHqeycQBTkd4@api.cloudinary.com/v1_1/moises-sa/upload';

//     const formData = new FormData();

//     formData.append('upload_preset', 'react-journal');
//     formData.append('file', file);

//     try { //colocamos un try y un catch por si falla la subida de archivos

//         const resp = await fetch(cloudUrl, {

//             method: 'POST',
//             body: formData
//         });

//         if(resp.ok) {
//             const cloudResp = await resp.json();
//             return cloudResp.secure_url;

//         }else {
//             throw await resp.json();
//         }


//     } catch(err){
//         throw err;
//     }
    
// }


export const fileUpload = async ( file ) => {

    // const cloudUrl = 'https://253546855865873:v5M0J22MsIyvYjsnHqeycQBTkd4@api.cloudinary.com/v1_1/moises-sa/upload';
    const cloudUrl = 'https://api.cloudinary.com/v1_1/moises-sa/upload'

    const formData = new FormData();
    formData.append('upload_preset','react-journal');
    formData.append('file', file );

    try {
        
        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        });

        if ( resp.ok ) {
            const cloudResp = await resp.json();
            return cloudResp.secure_url;
        } else {
            throw await resp.json();
        }

    } catch (err) {
        throw err;
    }


    // return url de la imagen
}


