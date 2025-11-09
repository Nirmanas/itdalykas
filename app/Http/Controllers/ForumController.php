<?php


namespace App\Http\Controllers;

use App\Http\Resources\ReviewResource;
use App\Models\Review;
use Illuminate\Http\Request;

class ForumController extends Controller
{


    public function index(Request $request)
    {
        $reviews = Review::with('user')
            ->orderBy('created_at', 'desc')
            ->get();
        return inertia('forum', [
            'reviews' => ReviewResource::collection($reviews)->toArray($request),
        ]);
    }


    public function store(Request $request)
    {
        $user = $request->user();
        $validated = $request->validate([
            'description' => 'required|string',
            'title' => 'required|string|max:100',
            'rating' => 'required|integer|min:0|max:5',
        ]);

        Review::create([
            'user_id' => $user->id,
            'title' => $validated['title'],
            'description' => $validated['description'],
            'rating' => $validated['rating'],
        ]);

        return redirect()
            ->route('client.forum.index')
            ->with('success', 'Your message has been posted.');
    }
}
