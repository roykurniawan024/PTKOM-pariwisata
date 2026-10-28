<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class ContactPageController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Contact', [
            'contact' => config('pariwisata.contact') ?? config('pariwisata'),
        ]);
    }
}
