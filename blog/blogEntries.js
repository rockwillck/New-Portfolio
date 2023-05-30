const entries = {
    "Rendering Metaballs in Real Time in the Browser": 
    [
        "metaballs", 
        "May 29, 2023",
        `Metaballs: goopy, gloopy, sticky metaballs. Implementations exist in the likes of Blender and ZBrush, but all of these implementations have tradeoffs. Either these metaballs are incredibly low-poly, and, in many cases, finicky, or they're incredibly computationally expensive and can only run on the best hardware.

        ### The Charge Method
        Most (3d) metaball implementations use SDF, or signed-distance fields to render their namesake shapes. There are a few big issues with this:
        
        1. SDF is expensive, and usually done in compute shaders. This means that low-end hardware will struggle to keep up.
        2. SDF is a *rendering* solution, which means that triangulating a metaballs model into a mesh later on is, though possible, hard.
        
        So, our method involves the use of charge equations - as in, physics equations that calculate the charge of a given point in space.  
        
        Then, we can inch along a ray from each pixel, much like SDF, and find the collective charge of a pixel (the sum of the charges of all the points on the ray we inched along for a pixel). If that collective charge is greater than a threshold, then we draw that pixel. Otherwise, we don't. It's that simple!  
        
        There are a few advantages and disadvantages to this method.  
        
        Advantages:
        1. This method lends itself to much simpler (and less expensive) calculations.
        2. The charge method is more easily triangulated using the marching cubes algorithm, since all we need to do is find the charge of each corner of a cube.
        3. The charge method allows you to control the individual "goopiness" of objects, unlike SDF.
        
        Disadvantages:
        1. The charge method is harder to apply materials and lighting to.  
        2. The charge method requires a cutoff distance, which, while common in most SDF implementations, can generally be circumvented using that method.  

        ### Other Optimizations
        Of course, using the charge method alone doesn't make real-time metaballs possible. Instead, we need to rely on a variety of other factors to make everything come together cohesively.  
        
        #### Multi-Threading using Web Workers
        The most significant optimization used in my implementation is using JavaScript Web Workers to handle different regions of the screen in parallel. This means that different "sectors" don't need to be computed one after another, but rather can be computed all at once. Unfortunately, this does drive the cost of computation up - on lower-end devices, this can cause some heating and loud fans. The alternative, however, is an implementation that runs at 60 minutes a frame.  
        
        #### Anti-aliasing
        To run on low-specs, even with multi-threading, my implementation needed to render (at most) 128 x 128 pixels. Actually rendered this way, however, the metaballs appear incredibly pixelated and nearly unreadable. The solution is simple: fade the pixels out as you get to the edge of the sphere. In other words, we're rendering the equivalent of a colored depth map.  
        
        #### Baked Angles
        Two of the most expensive mathematical calculations needed in 3d rendering, in my experience, is square root and atan2. Thankfully, both of these operations can be pre-baked for each angle, since even with rotation, I can simply use a lookup table to find the current angle and just modify that. This means that instead of taking atan2 and then taking cos/sin, I simply take cos/sin.  
        
        ### Demo
        You can play with the current state of this project [here](https://www.rockwill.dev/RT3dMetaballs).
        `
    ]}