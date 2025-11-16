<?php


namespace App\Http\Controllers;

use App\Http\Requests\ForumSubmitRequest;
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


    public function store(ForumSubmitRequest $request)
    {
        $user = $request->user();

        Review::create([
            'user_id' => $user->id,
            'title' => $request->title,
            'description' => $request->description,
            'rating' => $request->rating,
        ]);

        return redirect()
            ->route('client.forum.index')
            ->with('success', 'Your message has been posted.');
    }
}
