// src/app/api/signup/player/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('Player signup API called'); // Debug log
    
    const body = await request.json();
    console.log('Request body received:', body); // Debug log
    
    // Validate required fields for player signup
    const requiredFields = ['currentTeam', 'dob', 'email', 'experience', 'fullName', 'password', 'position', 'preferredFoot'];
    
    for (const field of requiredFields) {
      if (!body[field]) {
        console.log(`Missing field: ${field}`); // Debug log
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password length
    if (body.password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    // Prepare the data to send to your backend
    const signupData = {
      currentTeam: body.currentTeam,
      dob: body.dob,
      email: body.email,
      experience: body.experience,
      fullName: body.fullName,
      licenceNumber: '', // Players don't need licence number
      password: body.password,
      position: body.position,
      preferredFoot: body.preferredFoot,
      usertype: 'player'
    };

    console.log('Data to send to backend:', signupData); // Debug log

    // Replace this URL with your actual backend endpoint
    const BACKEND_URL = process.env.BACKEND_URL || 'https://your-backend-api.com';
    console.log('Backend URL:', BACKEND_URL); // Debug log
    
    // Since you don't have the backend URL yet, let's simulate success for testing
    if (BACKEND_URL === 'https://your-backend-api.com') {
      console.log('No backend URL configured, simulating success response');
      return NextResponse.json(
        { 
          message: 'Player account created successfully (simulated)',
          success: true
        },
        { status: 201 }
      );
    }
    
    const response = await fetch(`${BACKEND_URL}/api/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers your backend requires (e.g., API keys)
      },
      body: JSON.stringify(signupData),
    });

    console.log('Backend response status:', response.status); // Debug log

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.log('Backend error response:', errorData); // Debug log
      
      // Handle specific error cases from your backend
      if (response.status === 401) {
        return NextResponse.json(
          { error: 'Unauthorized - Invalid credentials' },
          { status: 401 }
        );
      }
      
      if (response.status === 403) {
        return NextResponse.json(
          { error: 'Forbidden - Access denied' },
          { status: 403 }
        );
      }
      
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Endpoint not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json(
        { 
          error: errorData.message || 'Player signup failed',
          success: false
        },
        { status: response.status }
      );
    }

    const responseData = await response.json();
    console.log('Backend success response:', responseData); // Debug log
    
    // Backend returns { message: "string", success: true }
    return NextResponse.json(
      { 
        message: responseData.message || 'Player account created successfully',
        success: responseData.success || true
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Player signup API error:', error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}