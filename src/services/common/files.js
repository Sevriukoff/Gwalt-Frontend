import fetchRest from '@/services/common/fetchRest';

export const base64ToFile = (base64String, filename) => {
  const byteString = atob(base64String.split(',')[1]);
  const mimeString = base64String.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new File([ab], filename, { type: mimeString });
};

export const patchUser = async (url, { arg }) => {
  const patchDoc = [];

  debugger;

  if (arg.name) {
    patchDoc.push({ op: 'replace', path: '/name', value: arg.name });
  }

  if (arg.avatarUrl) {
    patchDoc.push({ op: 'replace', path: '/avatarUrl', value: arg.avatarUrl });
  }

  if (arg.backgroundUrl) {
    patchDoc.push({ op: 'replace', path: '/backgroundUrl', value: arg.backgroundUrl });
  }

  if (arg.shortDescription) {
    patchDoc.push({ op: 'replace', path: '/shortDescription', value: arg.shortDescription });
  }

  if (arg.description) {
    patchDoc.push({ op: 'replace', path: '/description', value: arg.description });
  }

  // Отладочный вывод для проверки JSON перед отправкой
  console.log('PatchDoc JSON: ', JSON.stringify(patchDoc, null, 2));

  try {
    await fetchRest(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patchDoc),
    });
  } catch (error) {
    console.error('Error updating user:', error);
  }
};