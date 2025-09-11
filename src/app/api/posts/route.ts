// src/app/api/posts/route.ts
export async function POST(request: Request) {
  console.log('🔄 Proxy received request');

  try {
    const body = await request.json();
    console.log('📦 Request body:', body);
    
    // Add your JWT bearer token for authentication
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyIiOlt7ImF1dGhvcml0eSI6Ik5FV1VTRVIifV0sInN1YiI6IndoaXRlbWVsdmlzQGdtYWlsLmNvbSIsImV4cCI6MTc1NzU3MTQzNywiaWF0IjoxNzU3NTUzNDM3fQ.J8tpQ_dYSq1toP-NDAbeutxaX_fylnQ2Xg_niNM9ZMmA8l3ZRBNdGKQ2ETkAg2xofAKA1-pQ34SKoQahm1CUlg`,
    };
    
    console.log('📡 Sending request with Bearer token authentication');
    
    const response = await fetch('https://scoutflair.top/api/spotLights/addPost', {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    console.log('📡 Backend response status:', response.status);

    const responseText = await response.text();
    console.log('📄 Backend response:', responseText);
    
    if (!response.ok) {
      console.error('❌ Backend error:', responseText);
      
      if (response.status === 403) {
        return Response.json(
          { 
            error: 'Authentication failed', 
            details: 'Access forbidden. Your token may not have the required permissions.',
            backendResponse: responseText,
            status: response.status
          }, 
          { status: 403 }
        );
      }
      
      if (response.status === 401) {
        return Response.json(
          { 
            error: 'Unauthorized', 
            details: 'Token expired or invalid. Please get a new token.',
            backendResponse: responseText,
            status: response.status
          }, 
          { status: 401 }
        );
      }
      
      return Response.json(
        { 
          error: 'Backend request failed', 
          details: responseText,
          status: response.status
        }, 
        { status: response.status }
      );
    }

    // Try to parse as JSON, fallback to plain text
    try {
      const jsonData = JSON.parse(responseText);
      console.log('✅ Sending JSON response:', jsonData);
      return Response.json(jsonData);
    } catch (parseError) {
      console.log('📄 Sending text response as JSON:', responseText);
      return Response.json({ success: true, data: responseText });
    }
  } catch (error) {
    console.error('❌ Proxy error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return Response.json(
      { 
        error: 'Internal server error', 
        details: errorMessage 
      }, 
      { status: 500 }
    );
  }
}