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
        return Inertia::render('About');
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