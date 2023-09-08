import useSWR, { mutate } from 'swr';

const useRequest = {
  GetFiles(baseURL: string) {
    const { data, error } = useSWR(baseURL, (url: string) => fetch(url).then((res) => res.json()));

    return {
      data,
      isLoading: !error && !data,
      isError: error,
    };
  },

  async DownloadFile(fileName: string, baseURL: string) {
    try {
      const response = await fetch(`${baseURL}?filename=${fileName}`, {
        method: 'GET',
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error('Error:', errorResponse.message);
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      a.remove();
    } catch (error) {
      console.error('Network Error:', error);
    }
  },

  async DownloadAllFiles(fileNames: any) {
    try {
      const response = await fetch('/api/download-all-files', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileNames }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error('Error:', errorResponse.message);
        return;
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'downloaded-files.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      console.error('Error:', error.message);
    }
  },

  async UploadFile(formData: any, baseURL: string) {
    const response = await fetch(baseURL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload files');
    }

    mutate(baseURL);
    const data = await response.json();
    return data.message;
  },

  async ConvetFile(baseURL: string, convertFormat: string) {
    const response = await fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ convertFormat: convertFormat })
    });

    if (!response.ok) {
      throw new Error('Failed to upload files');
    }

    mutate(baseURL);

    const data = await response.json();

    return data.message;
  },

  async DeleteFile(fileName: string, baseURL: string) {
    const response = await fetch(`${baseURL}?filename=${fileName}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ filename: fileName }),
    });

    if (!response.ok) {
      throw new Error('Failed to delete file');
    }

    mutate(baseURL);

    return response
  },

  async deleteFiles(baseURL: string) {
    if (baseURL === '/api/upload') {
      try {
        const response = await fetch('/api/delete-all-docx', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }

        mutate(baseURL);

        const responseData = await response.json();
        return responseData;
      } catch (error: any) {
        console.error('Error deleting files:', error.message);
        throw error;
      }
    } else {
      try {
        const response = await fetch('/api/delete-all-html', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }

        mutate(baseURL);

        const responseData = await response.json();
        return responseData;
      } catch (error: any) {
        console.error('Error deleting files:', error.message);
        throw error;
      }
    }
  }
}

export default useRequest;
