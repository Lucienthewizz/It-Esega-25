<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    /**
     * Show the about page.
     */
    public function about(): Response
    {
<<<<<<< HEAD
        return Inertia::render('About/Index');
=======
        return Inertia::render('about');
>>>>>>> fbbc686da5809a93d113b302ad97e5115290ed8e
    }

    /**
     * Show the FAQ page.
     */
    public function faq(): Response 
    {
        return Inertia::render('FAQ');
    }

    /**
     * Show the contact page.
     */
    public function contact(): Response
    {
        return Inertia::render('Contact');
    }
}